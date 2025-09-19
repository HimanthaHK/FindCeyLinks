"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, DocumentData, Timestamp } from "firebase/firestore";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  createdAt: Timestamp | null;
  applyLink?: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  useEffect(() => {
    // Check if job is in favorites
    const favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
    setIsFavorite(favorites.includes(jobId));
  }, [jobId]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, "jobs", jobId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;

          const jobData: Job = {
            id: docSnap.id,
            title: data.title ?? "",
            company: data.company ?? "",
            location: data.location ?? "",
            description: data.description ?? "",
            createdAt: data.createdAt ?? null,
            applyLink: data.applyLink ?? undefined,
          };

          setJob(jobData);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((id: string) => id !== jobId);
      localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(jobId);
      localStorage.setItem('favoriteJobs', JSON.stringify(favorites));
      // Trigger animation only when adding to favorites
      setIsHeartAnimating(true);
      setTimeout(() => setIsHeartAnimating(false), 600);
    }
    
    setIsFavorite(!isFavorite);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-8"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-2 w-2/3"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-8 w-1/2"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-2"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-2"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-2 w-5/6"></div>
          </div>
        </div>
      </div>
    );

  if (error || !job)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-[1.01] transition-transform duration-200">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{error || "Job not found"}</h3>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            ← Back to Job Listings
          </Link>
        </div>
      </div>
    );

  const postedDate = job.createdAt
    ? job.createdAt.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-all duration-200 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Job Listings
        </Link>

        {/* Job Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform hover:shadow-2xl transition-all duration-300">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold mb-1">{job.company}</p>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{job.location}</span>
                </div>
              </div>
              
              {/* Enhanced Favorite Heart Button */}
              <button
                onClick={toggleFavorite}
                className="ml-4 p-2 rounded-full hover:bg-pink-50 transition-all duration-300 group relative"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <div className={`absolute inset-0 rounded-full bg-pink-100 scale-0 group-hover:scale-100 transition-transform duration-300 ${isFavorite ? 'scale-100' : ''}`}></div>
                <svg
                  className={`w-8 h-8 relative z-10 ${isFavorite 
                    ? 'text-pink-500 fill-current' 
                    : 'text-gray-400 group-hover:text-pink-400'} 
                    ${isHeartAnimating ? 'animate-ping-once' : ''}`}
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500 mb-4 md:mb-0">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Posted {postedDate}</span>
              </div>
              
              {job.applyLink && (
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 w-full md:w-auto"
                >
                  Apply Now
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Job Description
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="whitespace-pre-line leading-relaxed">{job.description}</p>
            </div>

            {job.applyLink && (
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 mb-4">Ready to apply?</p>
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  Apply Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Job Listings
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes ping-once {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-ping-once {
          animation: ping-once 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}