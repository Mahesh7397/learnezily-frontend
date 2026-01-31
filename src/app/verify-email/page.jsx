"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [email, setEmail] = useState("maheshwaranm@gmail.com");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verifyEmail");

    if (!storedEmail) {
    //   router.push("/signup");
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

        <button className="mt-4 w-full bg-blue-600 text-white rounded-lg py-2">
          Verify Email
        </button>
      </div>
    </div>
  );
}
