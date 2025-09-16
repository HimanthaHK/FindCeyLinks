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

  if (loadingPage) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      {/* Logged-in user + Logout */}
      <div className="mb-6 flex justify-between items-center">
        <p>Logged in as: <span className="font-bold">{username}</span></p>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("loggedInUser");
            router.push("/login");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Job Title *</label>
          <input type="text" id="title" placeholder="Software Engineer"
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full" required disabled={loading} />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block mb-1 font-medium">Company *</label>
          <input type="text" id="company" placeholder="Company Name"
            value={company} onChange={(e) => setCompany(e.target.value)}
            className="border p-2 rounded w-full" required disabled={loading} />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block mb-1 font-medium">Location *</label>
          <input type="text" id="location" placeholder="Colombo or Remote"
            value={location} onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded w-full" required disabled={loading} />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Job Description *</label>
          <textarea id="description" placeholder="Job responsibilities..."
            value={description} onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full" rows={5} required disabled={loading} />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-1 font-medium">Category *</label>
          <input type="text" id="category" placeholder="Network, IT..."
            value={category} onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full" required disabled={loading} />
        </div>

        {/* Field */}
        <div>
          <label htmlFor="field" className="block mb-1 font-medium">Field *</label>
          <select id="field" value={field} onChange={(e) => setField(e.target.value)}
            className="border p-2 rounded w-full" disabled={loading}>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Job Type */}
        <div>
          <label htmlFor="jobType" className="block mb-1 font-medium">Type *</label>
          <select id="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)}
            className="border p-2 rounded w-full" disabled={loading}>
            <option value="Job">Job</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        {/* Apply Link */}
        <div>
          <label htmlFor="applyLink" className="block mb-1 font-medium">Apply Link (URL) *</label>
          <input type="url" id="applyLink" placeholder="https://company.com/apply"
            value={applyLink} onChange={(e) => setApplyLink(e.target.value)}
            className="border p-2 rounded w-full" required disabled={loading} />
        </div>

        {/* Auto Delete */}
        <div>
          <label htmlFor="deleteAfter" className="block mb-1 font-medium">Auto Delete After</label>
          <select id="deleteAfter" value={deleteAfter} onChange={(e) => setDeleteAfter(e.target.value)}
            className="border p-2 rounded w-full" disabled={loading}>
            <option value="Never">Never</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>
        </div>

        <button type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}>
          {loading ? "Posting Job..." : "Post Job"}
        </button>
      </form>

      <div className="mt-6">
        <button onClick={() => router.push("/jobs")} className="text-blue-600 hover:underline">
          ← Back to Job Listings
        </button>
      </div>

      <div className="mt-8"><FirebaseTest /></div>
    </div>
  );
}
