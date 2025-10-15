"use client";

import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // 🟢 If not logged in, redirect to login
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className=" mt-36 flex justify-center items-center min-h-screen text-green-700 text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  // 🟢 Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="mt-36  min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🌿 Welcome to Your Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          Logged in as:{" "}
          <span className="font-medium text-green-700">{user.email}</span>
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/new")}
            className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            + Analyze New Crop
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
