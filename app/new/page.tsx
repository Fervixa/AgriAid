"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import { uploadToCloudinary } from "@/lib/Cloudinary";

export default function AnalyzePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [symptom, setSymptom] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image to Cloudinary if available
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadToCloudinary(image);
        console.log("Image uploaded to Cloudinary:", imageUrl);
      }

      // 2️⃣ Get Firebase Auth token
      const token = await user.getIdToken();

      // 3️⃣ Send request to FastAPI backend
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to analyze crop issue");
      }

      console.log("Response:", data);

      // 4️⃣ Redirect user to the result page with dynamic ID
      router.push(`/result/${data.resultId}`);

    } catch (err: any) {
      console.error("Error:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-100 to-green-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-green-700 text-center">
          AgriAid 🌾
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Upload a crop image or describe the issue below
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full mb-3 border p-2 rounded"
          />

          <textarea
            placeholder="Describe your crop symptoms..."
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full border p-3 rounded mb-4 resize-none"
            rows={3}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white w-full py-3 rounded-xl hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Crop"}
          </button>
        </form>
      </div>
    </div>
  );
}
