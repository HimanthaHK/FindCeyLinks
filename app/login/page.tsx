"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Hardcoded credentials (2 users)
    const validCredentials = [
      { username: "HimanthaKa", password: "ceylinksadmn" },
      { username: "SachithaHi", password: "ceylinks123" },
    ];

    const isValid = validCredentials.some(
      (user) => user.username === username && user.password === password
    );

    if (isValid) {
      localStorage.setItem("isLoggedIn", "true");       // for session check
      localStorage.setItem("loggedInUser", username);   // save username
      router.push("/jobs/admin");                             // redirect to admin
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-50 p-8 rounded-xl shadow-lg w-full max-w-sm border border-[#0D1E4C]"
      >
        <h1 className="text-2xl font-bold text-[#0D1E4C] mb-6 text-center">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#C48CB3] text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
