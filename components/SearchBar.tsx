"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  Timestamp,
  QueryConstraint,
} from "firebase/firestore";
import Link from "next/link";
import { Search, MapPin, Briefcase } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  jobType: string; // Remote | Onsite | Hybrid
  createdAt: Timestamp | null;
}

const JobSearchHero = () => {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [results, setResults] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!jobQuery.trim() && !locationQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    try {
      const qRef = collection(db, "jobs");
      const filters: QueryConstraint[] = [];
      const searchQuery = query(qRef, ...filters);
      const querySnapshot = await getDocs(searchQuery);

      const jobs = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title ?? "",
            company: data.company ?? "",
            location: data.location ?? "",
            category: data.category ?? "",
            description: data.description ?? "",
            jobType: data.field ?? "Onsite",
            createdAt: data.createdAt ?? null,
          } as Job;
        })
        .filter((job) => {
          const textMatch =
            job.title.toLowerCase().includes(jobQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(jobQuery.toLowerCase()) ||
            job.category.toLowerCase().includes(jobQuery.toLowerCase());
          const locationMatch = job.location
            .toLowerCase()
            .includes(locationQuery.toLowerCase());
          return textMatch && locationMatch;
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
    switch (type.toLowerCase()) {
      case "remote":
        return "bg-green-100 text-green-800";
      case "hybrid":
        return "bg-blue-100 text-blue-800";
      case "onsite":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1A2F5F] via-[#2A4B8C] to-[#1A2F5F] text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Discover Your Next Career Move
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Explore thousands of opportunities across The World  - find the
            perfect role for your skills and ambitions
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 border border-gray-200">
          <div className="flex-1 relative flex items-center">
            <Briefcase className="absolute left-3 w-5 h-5 text-[#1A2F5F]" />
            <input
              type="text"
              placeholder="Job title, company or category"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoComplete="off"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none
                         focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] transition
                         placeholder-gray-500"
            />
          </div>

          <div className="flex-1 relative flex items-center">
            <MapPin className="absolute left-3 w-5 h-5 text-[#1A2F5F]" />
            <input
              type="text"
              placeholder="Location"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoComplete="off"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none
                         focus:ring-2 focus:ring-[#4A72D0] focus:border-[#4A72D0] transition
                         placeholder-gray-500"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-[#4A72D0] to-[#3A5BB0] hover:from-[#3A5BB0] hover:to-[#2A4B8C] text-white font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center disabled:opacity-70"
          >
            {isSearching ? (
              "Searching..."
            ) : (
              <>
                <Search className="mr-2 w-4 h-4" /> Search Jobs
              </>
            )}
          </button>
        </div>
      </div>

      {/* Job Results */}
      {hasSearched && (
        <div className="container mx-auto px-4 py-8">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                {!jobQuery.trim() && !locationQuery.trim()
                  ? "Please enter a job title or location to start searching."
                  : "No jobs found matching your criteria."}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your keywords or browse trending categories above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((job) => (
                <div
                  key={job.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-200/50 hover:border-blue-200/70 hover:-translate-y-1 group relative"
                >
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeBadge(
                      job.jobType
                    )}`}
                  >
                    {job.jobType || "Unknown"}
                  </div>

                  <div className="flex flex-col mb-4 pr-12">
                    <div className="mb-3">
                      <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h2>
                      <p className="text-gray-700 font-medium">{job.company}</p>
                    </div>
                    {job.createdAt && (
                      <span className="text-sm text-gray-500 mt-2">
                        Posted:{" "}
                        {new Date(job.createdAt.toDate()).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">{job.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {job.description}
                  </p>

                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline transition-all"
                  >
                    View details
                    <svg
                      className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobSearchHero;
