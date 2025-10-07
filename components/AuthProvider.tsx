"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🟢 Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      alert("Google login failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✉️ Email login/signup
  const handleEmailAuth = async () => {
    try {
      setLoading(true);
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Authentication failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-4">🌾 AgriAid</h1>
      <p className="text-gray-600 mb-6">
        {isSignup ? "Create your account" : "Welcome back!"}
      </p>

      <div className="w-80 bg-white p-6 rounded-2xl shadow">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 mb-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 mb-4 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleEmailAuth}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Sign Up"
            : "Login with Email"}
        </button>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border mt-3 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          className="text-sm text-center mt-4 text-green-700 cursor-pointer underline"
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
}
