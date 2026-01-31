"use client";

import { useEffect } from "react";

export default function GoogleLogin() {
   useEffect(() => {
    const interval = setInterval(() => {
      if (!window.google) return;

      clearInterval(interval);

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
        }
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);


  async function handleGoogleLogin(response) {
    // Google ID token (JWT)
    const idToken = response.credential;

    // Send to your Express backend
    // await fetch("http://localhost:5000/auth/google", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   credentials: "include",
    //   body: JSON.stringify({ token: idToken }),
    // });
    console.log(idToken)
  }

  return <div id="googleBtn" />;
}
