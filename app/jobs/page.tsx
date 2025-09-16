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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold mb-4 text-[#0D1E4C]">Job Listings</h1>
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold mb-4 text-[#0D1E4C]">Job Listings</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-10 text-[#0D1E4C] text-center">
        Job Listings
      </h1>

      {jobs.length === 0 ? (
        <div className="max-w-2xl mx-auto border border-[#0D1E4C] p-6 rounded-xl text-center bg-gray-50 shadow-lg">
          <p className="text-gray-600 mb-4">No job listings available yet.</p>
          <Link
            href="/admin"
            className="bg-[#C48CB3] text-white py-2 px-6 rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            Be the first to post a job!
          </Link>
        </div>
      ) : (
        <ul className="max-w-4xl mx-auto space-y-6">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border border-[#0D1E4C] p-6 rounded-xl shadow-md bg-white 
                         hover:bg-[#0D1E4C] hover:text-white hover:font-bold 
                         hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold">{job.title}</h2>
              <p className="mt-1">
                {job.company} - {job.location}
              </p>
              <p className="mt-3 line-clamp-3">{job.description}</p>
              <Link
                href={`/jobs/${job.id}`}
                className="inline-block mt-4 text-[#C48CB3] font-medium hover:underline hover:text-pink-300"
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
