"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, DocumentData, Timestamp } from "firebase/firestore";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  createdAt: Timestamp | null;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData: Job[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;

          const jobData: Job = {
            id: doc.id,
            title: data.title ?? "",
            company: data.company ?? "",
            location: data.location ?? "",
            description: data.description ?? "",
            createdAt: data.createdAt ?? null,
          };

          jobsData.push(jobData);
        });

        setJobs(jobsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#0D1E4C] text-center">Job Listings</h1>
        <div className="w-12 h-12 border-4 border-t-[#C48CB3] border-r-[#0D1E4C] border-b-[#C48CB3] border-l-[#0D1E4C] rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-4">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#0D1E4C] text-center">Job Listings</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <p className="text-sm">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#0D1E4C] text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-[#0D1E4C] text-center">
        Job Listings
      </h1>

      {jobs.length === 0 ? (
        <div className="max-w-2xl mx-auto border border-[#0D1E4C] p-6 rounded-xl text-center bg-gray-50 shadow-lg">
          <p className="text-gray-600 mb-4">No job listings available yet.</p>
          <Link
            href="/admin"
            className="bg-[#C48CB3] text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-600 transition-colors inline-block"
          >
            Be the first to post a job!
          </Link>
        </div>
      ) : (
        <ul className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border border-[#0D1E4C] p-4 sm:p-6 rounded-xl shadow-md bg-white 
                         hover:bg-[#0D1E4C] hover:text-white hover:font-bold 
                         hover:shadow-lg sm:hover:scale-[1.02] transform transition-all duration-300"
            >
              <h2 className="text-xl sm:text-2xl font-semibold">{job.title}</h2>
              <p className="mt-1 text-sm sm:text-base">
                {job.company} - {job.location}
              </p>
              <p className="mt-3 text-sm sm:text-base line-clamp-3">{job.description}</p>
              <Link
                href={`/jobs/${job.id}`}
                className="inline-block mt-4 text-[#C48CB3] font-medium hover:underline hover:text-pink-300 text-sm sm:text-base"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}