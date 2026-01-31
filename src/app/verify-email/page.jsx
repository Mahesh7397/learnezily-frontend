"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/Api";
import { useAlert } from "@/context/AlertContext";

function maskEmail(email) {
  if (!email) return "";

  const [name, domain] = email.split("@");

  if (name.length <= 2) {
    return `${name[0]}***@${domain}`;
  }

  return `${name.slice(0, 2)}****@${domain}`;
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const {showAlert}=useAlert()

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    try {
      setLoading(true);
      // 🔗 connect backend here
      // await fetch("/api/auth/verify-otp", { ... })
      const res=await api.post("/auth/verify-otp",{
        email:email,
        otp:otp
      })
      if(res?.data?.code===20){
        showAlert(res?.data?.message,"success")
        router.push("/login"); // or dashboard
      }else {
        showAlert(res?.data?.message,"error")
      } 
    } catch (err) {
      setError("Invalid or expired OTP");
      showAlert(error,"error")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verifyEmail");

    if (!storedEmail) {
      router.push("/signup");
      return;
    }

    setEmail(storedEmail);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6">

        <h1 className="text-2xl font-semibold text-white text-center">
          Verify Your Email
        </h1>

        <p className="text-sm text-neutral-400 text-center mt-2">
          We sent a 6-digit code to
        </p>

        {/* ✅ Masked email */}
        <p className="text-sm text-blue-400 text-center font-medium">
          {maskEmail(email)}
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="mt-6 w-full text-center tracking-widest text-xl rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-3 text-white"
          placeholder="Enter OTP"
        />
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

        <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg py-2 font-medium transition"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
      </div>
    </div>
  );
}
