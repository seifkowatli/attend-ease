"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      redirect("/profile");
    }
  }
  , []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors(false);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password }),
    });

    if (!response.ok) {
      setErrors(true);
      console.error("Failed to login");
    } else {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      redirect("/profile");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#000000] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Sign In
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              className="w-full px-4 py-2 border border-[#B2B2B2] rounded-lg focus:ring-2 focus:ring-[#0097b9] focus:border-[#0097b9] outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              className="w-full px-4 py-2 border border-[#B2B2B2] rounded-lg focus:ring-2 focus:ring-[#0097b9] focus:border-[#0097b9] outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#0097b9] hover:bg-[#096274] text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

     { errors &&   <div
          role="alert"
          className="rounded-sm mt-3.5 border-s-4 border-red-500 bg-red-50 p-4"
        >
          <div className="flex items-center gap-2 text-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              />
            </svg>

            <strong className="block font-medium">
              User and password combination is not valid{" "}
            </strong>
          </div>
        </div>}

      </div>
    </div>
  );
}
