"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, Timestamp, QueryConstraint } from "firebase/firestore";
import Link from "next/link";
import { Search, MapPin, Briefcase } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  jobType: string;
  createdAt: Timestamp | null;
}

const JobSearchHero = () => {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [results, setResults] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    // Don't search if both fields are empty
    if (!jobQuery.trim() && !locationQuery.trim()) {
      setResults([]);
      setHasSearched(true);
      return;
    }

    setIsSearching(true);
    try {
      const qRef = collection(db, "jobs");
      const filters: QueryConstraint[] = [];

      if (jobQuery.trim()) filters.push(where("category", "==", jobQuery.trim()));
      if (locationQuery.trim()) filters.push(where("location", "==", locationQuery.trim()));

      const searchQuery = filters.length ? query(qRef, ...filters) : null;
      
      // If no valid filters, return empty results
      if (!searchQuery) {
        setResults([]);
        setHasSearched(true);
        return;
      }

      const querySnapshot = await getDocs(searchQuery);

      const jobs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title ?? "",
          company: data.company ?? "",
          location: data.location ?? "",
          description: data.description ?? "",
          jobType: data.jobType ?? "Onsite",
          createdAt: data.createdAt ?? null,
        } as Job;
      });

      setResults(jobs);
      setHasSearched(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const getJobTypeBadge = (type: string) => {
    switch (type) {
      case "Remote":
        return "bg-green-100 text-green-800";
      case "Hybrid":
        return "bg-blue-100 text-blue-800";
      case "Onsite":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1A2F5F] via-[#2A4B8C] to-[#1A2F5F] text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Discover Your Next Career Move
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Explore thousands of opportunities across Sri Lanka - find the perfect role for your skills and ambitions
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-8 md:-mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 border border-gray-200">
          <div className="flex-1 relative flex items-center">
            <Briefcase className="absolute left-3 w-5 h-5 text-[#1A2F5F]" />
            <input
              type="text"
              placeholder='Job title or category (e.g. "Developer", "Marketing")'
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] transition"
            />
          </div>

          <div className="flex-1 relative flex items-center">
            <MapPin className="absolute left-3 w-5 h-5 text-[#1A2F5F]" />
            <input
              type="text"
              placeholder="Location (e.g. Colombo, Kandy)"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] transition"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-[#4A72D0] to-[#3A5BB0] hover:from-[#3A5BB0] hover:to-[#2A4B8C] text-white font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center disabled:opacity-70"
          >
            {isSearching ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <Search className="mr-2 w-4 h-4" />
                Search Jobs
              </>
            )}
          </button>
        </div>
      </div>

      {/* Job Results */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {hasSearched && results.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-[#4A72D0]" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                {!jobQuery.trim() && !locationQuery.trim() 
                  ? "Please enter a job title or location to search" 
                  : "No jobs found matching your criteria"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                Try different keywords or browse all available jobs
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              {results.map((job) => (
                <div
                  key={job.id}
                  className="border border-[#0D1E4C] p-6 rounded-xl shadow-md bg-white
                             md:hover:bg-[#0D1E4C] md:hover:text-white md:hover:font-bold
                             md:hover:shadow-lg md:hover:scale-[1.02] transform transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold">{job.title}</h2>
                      <p className="mt-1">{job.company} - {job.location}</p>
                      <p className="mt-3 line-clamp-3">{job.description}</p>
                    </div>
                    <div className={`text-xs font-semibold px-3 py-1 rounded-full ${getJobTypeBadge(job.jobType)}`}>
                      {job.jobType}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm">
                      {job.createdAt ? new Date(job.createdAt.toDate()).toLocaleDateString() : 'Recent'}
                    </span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="inline-block text-[#C48CB3] font-medium md:hover:underline md:hover:text-pink-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-[#4A72D0]" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Find your perfect job match</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                Search by job title, category, or location to discover opportunities that fit your career goals
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearchHero;