"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsData: Job[] = [];
      querySnapshot.forEach((doc) =>
        jobsData.push({ id: doc.id, ...doc.data() } as Job)
      );
      setJobs(jobsData);
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>{job.company} - {job.location}</p>
            <Link href={`/jobs/${job.id}`} className="text-blue-600 underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
