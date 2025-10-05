"use client";

import { useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "../../lib/firebaseClient";
export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-6">🌾 AgriAid</h1>
      <p className="mb-4 text-gray-600">Your AI-powered crop doctor</p>

      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
      >
        Sign in with Google
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
