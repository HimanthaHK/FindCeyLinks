"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function PostJobPage() {
  const router = useRouter();

  // Job form states
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [category, setCategory] = useState("");
  const [field, setField] = useState("Remote");
  const [jobType, setJobType] = useState("Job");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "pending_jobs"), {
        title,
        company,
        location,
        description,
        applyLink,
        category,
        field,
        jobType,
        status: "pending", // mark as pending
        createdAt: Timestamp.now(),
      });

      // Reset form
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setApplyLink("");
      setCategory("");
      setField("Remote");
      setJobType("Job");

      setMessage("✅ Job submitted for review! An admin will approve it soon.");
      setTimeout(() => router.push("/jobs"), 2000);
    } catch (error) {
      console.error("Error posting job:", error);
      setMessage("❌ Error submitting job. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-3">
            Post a Job Opportunity
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Fill in the details below to submit your job. Our team will review it before publishing.
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`p-4 mb-8 rounded-2xl border-l-4 backdrop-blur-sm ${
              message.includes("Error")
                ? "bg-red-50/80 border-red-500 text-red-800 shadow-red-100"
                : "bg-green-50/80 border-green-500 text-green-800 shadow-green-100"
            } shadow-lg transition-all duration-300 animate-fade-in`}
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">
                {message.includes("Error") ? "❌" : "✅"}
              </span>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        {/* Form Section */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 space-y-8 transition-all duration-300 hover:shadow-2xl"
        >
          {/* Grid Layout for Better Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Job Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                Job Title *
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Senior Frontend Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-3">
                Company Name *
              </label>
              <input
                id="company"
                type="text"
                placeholder="e.g., Tech Corp Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
                Location *
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g., New York, NY or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3">
                Category *
              </label>
              <input
                id="category"
                type="text"
                placeholder="e.g., IT, Marketing, Design"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Work Field */}
            <div>
              <label htmlFor="field" className="block text-sm font-semibold text-gray-700 mb-3">
                Work Type *
              </label>
              <div className="relative">
                <select
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md appearance-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label htmlFor="jobType" className="block text-sm font-semibold text-gray-700 mb-3">
                Position Type *
              </label>
              <div className="relative">
                <select
                  id="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md appearance-none"
                >
                  <option value="Job">Full-time Job</option>
                  <option value="Intern">Internship</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Apply Link */}
            <div className="md:col-span-2">
              <label htmlFor="applyLink" className="block text-sm font-semibold text-gray-700 mb-3">
                Application Link *
              </label>
              <input
                id="applyLink"
                type="url"
                placeholder="https://company.com/apply"
                value={applyLink}
                onChange={(e) => setApplyLink(e.target.value)}
                className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                Job Description *
              </label>
              <textarea
                id="description"
                placeholder="Describe the role, requirements, and benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-200 bg-white/50 px-4 py-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md resize-vertical min-h-[140px]"
                rows={5}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200/50 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Submit Job for Review
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform group-hover:scale-105 transition-transform duration-300"></div>
          </button>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Your submission will be reviewed within 24-48 hours before being published.
          </p>
        </form>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            Need help? Contact our support team
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        /* Improved focus states for accessibility */
        input:focus, textarea:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Smooth scrolling for mobile */
        @media (max-width: 768px) {
          html {
            scroll-behavior: smooth;
          }
        }
        
        /* Enhanced placeholder styling */
        ::placeholder {
          color: #9CA3AF;
          opacity: 1;
        }
        
        :-ms-input-placeholder {
          color: #9CA3AF;
        }
        
        ::-ms-input-placeholder {
          color: #9CA3AF;
        }
      `}</style>
    </div>
  );
}