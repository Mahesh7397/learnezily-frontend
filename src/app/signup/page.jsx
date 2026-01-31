"use client";

import { useState } from "react";
import Link from "next/link";

import GoogleLogin from "@/component/GoogleLogin";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Signup data:", form);
    // TODO: connect backend
    // after backend says OTP sent successfully
    sessionStorage.setItem("verifyEmail", form.email);
    router.push("/verify-email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-box border border-border rounded-2xl p-6 shadow-xl">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">Create Account</h1>
          <p className="text-neutral-400 text-sm mt-1">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-neutral-300">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-bg-slate-800 border border-border px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="you@example.com"
            />
          </div>

          {/* Create Password */}
          <div>
            <label className="text-sm text-neutral-300">Create Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-bg-slate-800 border border-border px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-neutral-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg bg-bg-slate-800 border border-border px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-bg-slate-800" />
          <span className="text-xs text-neutral-500">OR</span>
          <div className="flex-1 h-px bg-bg-slate-800" />
        </div>

        {/* Google Signup placeholder */}
          <GoogleLogin/>
        {/* Footer */}
        <p className="text-sm text-neutral-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
