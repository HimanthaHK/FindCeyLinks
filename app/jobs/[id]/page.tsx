"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  createdAt: any;
  applyLink?: string; // 🔹 Added new field
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        console.log("Fetching job details for ID:", jobId);
        
        const docRef = doc(db, "jobs", jobId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const jobData = { id: docSnap.id, ...docSnap.data() } as Job;
          setJob(jobData);
          console.log("Job details retrieved:", jobData);
        } else {
          console.error("Job not found with ID:", jobId);
          setError("Job not found");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <p className="text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-4">
        <p className="text-red-500">{error || "Job not found"}</p>
        <Link href="/jobs" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Job Listings
        </Link>
      </div>
    );
  }

  // Format the date if available
  const postedDate = job.createdAt?.toDate 
    ? job.createdAt.toDate().toLocaleDateString() 
    : "Recent";

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Link href="/jobs" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Job Listings
      </Link>
      
      <div className="border p-6 rounded shadow-sm bg-white">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-xl text-gray-700 mb-1">{job.company}</p>
        <p className="text-gray-600 mb-4">{job.location} • Posted {postedDate}</p>
        
        <div className="prose mt-6">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <p className="whitespace-pre-line">{job.description}</p>
        </div>
        
        {/* 🔹 Show Apply Now button only if link exists */}
        {job.applyLink && (
          <div className="mt-8 pt-4 border-t">
            <a 
              href={job.applyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Apply Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
