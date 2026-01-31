"use client";

import GoogleLogin from "@/component/GoogleLogin";
import { useAlert } from "@/context/AlertContext";
import api from "@/lib/Api";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { loginWithEmail, loginWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const router=useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {showAlert}=useAlert()

  const handleLogin = async () => {
    try {
      setLoading(true);
      // await loginWithEmail(email, password);
      const res=await api.post("/auth/login",{
        email:email,
        password:password
      })
      if(res?.data?.code===20){
        showAlert("Successfuly logined ","success")
        router.push("/user/dashboard")
      }
      showAlert(res?.data?.message,"error")
    } catch (error) {
       const msg =
      error?.response?.data?.message ||
      "Server error. Try again.";
    showAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-2 ">
      <div className="w-full max-w-sm rounded-2xl bg-box p-8 shadow-xl">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white text-center">
          Login
        </h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Sign in to your account
        </p>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm text-white outline-none border border-slate-700 focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm text-white outline-none border border-slate-700 focus:border-blue-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        {/* Google Login */}
        <GoogleLogin/>

      </div>
    </div>
  );
}
