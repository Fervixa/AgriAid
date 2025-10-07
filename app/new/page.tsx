"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import { uploadToCloudinary } from "@/lib/Cloudinary";

export default function AnalyzePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [symptom, setSymptom] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAuthLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      setLoading(true);
      let imageUrl: string | null = null;

      // ✅ Upload image to Cloudinary
      if (image) {
        imageUrl = await uploadToCloudinary(image);
        if (!imageUrl) throw new Error("Upload failed");
        console.log("✅ Image uploaded:", imageUrl);
      }

      const token = await user.getIdToken();

      // ✅ Send request to FastAPI
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symptomText: symptom,
          imageUrl,
        }),
      });

      console.log("Sending to backend:", { symptom, imageUrl });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to analyze crop issue");
      console.log("✅ Backend response:", data);

      // ✅ Redirect to result page by id. The result page should fetch the
      // result using the resultId (or use shared state / storage if you prefer
      // to avoid a refetch).
      router.push(`/result/${data.resultId}`);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("❌ Error:", errorMessage);
      alert("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!authLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 text-xl font-semibold">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-100 to-green-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-green-700 text-center">🌾 AgriAid</h1>
        <p className="text-gray-500 text-center mb-6">
          Upload a crop image or describe your issue below
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            disabled={loading}
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full mb-3 border p-2 rounded"
          />

          <textarea
            placeholder="Describe your crop symptoms..."
            value={symptom}
            disabled={loading}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full border p-3 rounded mb-4 resize-none"
            rows={3}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze Crop"}
          </button>
        </form>
      </div>
    </div>
  );
}
