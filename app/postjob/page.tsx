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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Post a Job Opportunity
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Fill in the details below to submit your job. Our team will review it before publishing.
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-xl border-l-4 ${
              message.includes("Error")
                ? "bg-red-50 border-red-500 text-red-700"
                : "bg-green-50 border-green-500 text-green-700"
            } shadow-sm transition-all duration-300`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {message.includes("Error") ? "❌" : "✅"}
              </span>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        {/* Form Section */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6 transition-all duration-200"
        >
          {/* Grid Layout for Better Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Senior Frontend Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                id="company"
                type="text"
                placeholder="e.g., Tech Corp Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                id="location"
                type="text"
                placeholder="e.g., New York, NY or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                id="category"
                type="text"
                placeholder="e.g., IT, Marketing, Design"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Work Field */}
            <div>
              <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-2">
                Work Type *
              </label>
              <select
                id="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                Position Type *
              </label>
              <select
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
              >
                <option value="Job">Full-time Job</option>
                <option value="Intern">Internship</option>
              </select>
            </div>

            {/* Apply Link */}
            <div className="md:col-span-2">
              <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700 mb-2">
                Application Link *
              </label>
              <input
                id="applyLink"
                type="url"
                placeholder="https://company.com/apply"
                value={applyLink}
                onChange={(e) => setApplyLink(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                placeholder="Describe the role, requirements, and benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical min-h-[120px]"
                rows={5}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.99] shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Job for Review"
            )}
          </button>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Your submission will be reviewed within 24-48 hours before being published.
          </p>
        </form>
      </div>
    </div>
  );
}