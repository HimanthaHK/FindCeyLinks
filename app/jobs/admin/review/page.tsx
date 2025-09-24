"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";

// ✅ Define a proper TypeScript type for Job
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  applyLink: string;
  category: string;
  field: string;
  jobType: string;
  createdAt?: Timestamp;
}

export default function ReviewJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch pending jobs from Firestore
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "pending_jobs"));
      const jobList: Job[] = querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          company: data.company,
          location: data.location,
          description: data.description,
          applyLink: data.applyLink,
          category: data.category || "Uncategorized",
          field: data.field || "Remote",
          jobType: data.jobType || "Job",
          createdAt: data.createdAt,
        };
      });
      setJobs(jobList);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Approve job → move to jobs collection
  const approveJob = async (job: Job) => {
    try {
      await addDoc(collection(db, "jobs"), {
        ...job,
        status: "approved",
        approvedAt: Timestamp.now(),
      });
      await deleteDoc(doc(db, "pending_jobs", job.id));
      setMessage("✅ Job approved successfully!");
      setTimeout(() => setMessage(""), 3000);
      fetchJobs();
    } catch (err) {
      console.error("Error approving job:", err);
      setMessage("❌ Failed to approve job.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Reject job → just delete
  const rejectJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to reject this job? This action cannot be undone.")) return;

    try {
      await deleteDoc(doc(db, "pending_jobs", jobId));
      setMessage("🗑️ Job rejected and deleted.");
      setTimeout(() => setMessage(""), 3000);
      fetchJobs();
    } catch (err) {
      console.error("Error rejecting job:", err);
      setMessage("⚠️ Failed to reject job.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Review Pending Jobs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Approve or reject job submissions before they go live on the platform
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`p-4 mb-6 rounded-xl border-l-4 shadow-sm transition-all duration-300 ${
            message.includes("✅") ? "bg-green-50 border-green-500 text-green-700" :
            message.includes("❌") ? "bg-red-50 border-red-500 text-red-700" :
            "bg-blue-50 border-blue-500 text-blue-700"
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{message}</span>
              <button onClick={() => setMessage("")} className="text-gray-500 hover:text-gray-700 ml-4">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 text-lg">Loading pending jobs...</p>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Pending Jobs!</h3>
              <p className="text-gray-600 mb-6">
                All caught up! There are no jobs waiting for review at the moment.
              </p>
              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                New job submissions will appear here for admin approval
              </div>
            </div>
          </div>
        ) : (
          /* Jobs Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Job Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.jobType}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {job.field}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">{job.title}</h2>
                  <div className="flex items-center text-gray-600 mb-1">
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">📍 {job.location}</div>
                </div>

                {/* Job Content */}
                <div className="p-6">
                  <p className="text-gray-700 line-clamp-3 mb-4 leading-relaxed">{job.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100">🏷️ {job.category}</span>
                    <span className="text-xs text-gray-500">{job.createdAt ? job.createdAt.toDate().toLocaleDateString() : "Recent"}</span>
                  </div>

                  {/* Apply Link */}
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 mb-4 font-medium"
                  >
                    🔗 View Apply Link
                  </a>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => approveJob(job)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => rejectJob(job.id)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!loading && jobs.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow border border-gray-100">
              <span className="text-sm text-gray-600">
                <span className="font-bold text-blue-600">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''} pending review
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
