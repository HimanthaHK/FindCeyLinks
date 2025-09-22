"use client";

import FirebaseTest from '@/components/FirebaseTest';
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  // Job form states
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [category, setCategory] = useState("");
  const [field, setField] = useState("Remote");
  const [jobType, setJobType] = useState("Job");
  const [deleteAfter, setDeleteAfter] = useState("Never");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      router.push("/login");
    } else {
      setUsername(loggedInUser);
      setLoadingPage(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Calculate expiresAt
      let expiresAt = null;
      if (deleteAfter !== "Never") {
        const days = parseInt(deleteAfter);
        expiresAt = Timestamp.fromDate(new Date(Date.now() + days * 24 * 60 * 60 * 1000));
      }

      await addDoc(collection(db, "jobs"), {
        title,
        company,
        location,
        description,
        applyLink,
        category,
        field,
        jobType,
        deleteAfter,
        expiresAt,
        createdAt: Timestamp.now(),
      });

      // Clear form
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setApplyLink("");
      setCategory("");
      setField("Remote");
      setJobType("Job");
      setDeleteAfter("Never");

      setMessage("Job posted successfully! 🚀 Redirecting...");
      setTimeout(() => {
        router.push("/jobs");
      }, 2000);
    } catch (error) {
      console.error("Error adding job:", error);
      setMessage("Error posting job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) return <p className="p-4 text-gray-800">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <p className="text-gray-600">Logged in as: <span className="font-bold text-gray-800">{username}</span></p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => router.push("/jobs")}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium w-full sm:w-auto"
              >
                View Jobs
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("loggedInUser");
                  router.push("/login");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium w-full sm:w-auto"
              >
                Logout
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">Fill in the details below to post a new job listing</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              message.includes("Error")
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-green-50 border border-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Job Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input 
                type="text" 
                id="title" 
                placeholder="Software Engineer"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required 
                disabled={loading} 
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
              <input 
                type="text" 
                id="company" 
                placeholder="Company Name"
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required 
                disabled={loading} 
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input 
                type="text" 
                id="location" 
                placeholder="Colombo or Remote"
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required 
                disabled={loading} 
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
              <textarea 
                id="description" 
                placeholder="Job responsibilities, requirements, and benefits..."
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                rows={5} 
                required 
                disabled={loading} 
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <input 
                type="text" 
                id="category" 
                placeholder="Network, IT, Software Development..."
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required 
                disabled={loading} 
              />
            </div>

            {/* Field and Job Type - Side by Side on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field */}
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-2">Field *</label>
                <select 
                  id="field" 
                  value={field} 
                  onChange={(e) => setField(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={loading}
                >
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Job Type */}
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select 
                  id="jobType" 
                  value={jobType} 
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={loading}
                >
                  <option value="Job">Job</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
            </div>

            {/* Apply Link */}
            <div>
              <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700 mb-2">Apply Link (URL) *</label>
              <input 
                type="url" 
                id="applyLink" 
                placeholder="https://company.com/apply"
                value={applyLink} 
                onChange={(e) => setApplyLink(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required 
                disabled={loading} 
              />
            </div>

            {/* Auto Delete */}
            <div>
              <label htmlFor="deleteAfter" className="block text-sm font-medium text-gray-700 mb-2">Auto Delete After</label>
              <select 
                id="deleteAfter" 
                value={deleteAfter} 
                onChange={(e) => setDeleteAfter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={loading}
              >
                <option value="Never">Never</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
              </select>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium text-sm"
              disabled={loading}
            >
              {loading ? "Posting Job..." : "Post Job"}
            </button>
          </div>
        </form>

        {/* Firebase Test Component */}
        <div className="mt-8">
          <FirebaseTest />
        </div>
      </div>
    </div>
  );
}