"use client";

import { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, createGoogleProvider } from "@/lib/firebaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [authInProgress, setAuthInProgress] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async () => {
    if (authInProgress) return;
    setAuthInProgress(true);
    try {
      const provider = createGoogleProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      if (err?.code === "auth/cancelled-popup-request" || err?.code === "auth/popup-closed-by-user") {
        console.warn("Popup cancelled by user", err?.code);
      } else {
        console.error("Login failed", err);
        alert(err?.message || "Login failed. Please try again.");
      }
    } finally {
      setAuthInProgress(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold mb-6">🌾 AgriAid</h1>
      <p className="mb-4 text-gray-600">Your AI-powered crop doctor</p>

      <button
        onClick={handleLogin}
        disabled={authInProgress}
        className="bg-green-600 disabled:opacity-60 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
      >
        {authInProgress ? "Opening…" : "Sign in with Google"}
      </button>

      <button
        onClick={handleLogout}
        className="text-sm text-gray-500 mt-4 underline"
      >
        Logout (for testing)
      </button>
    </div>
  );
}