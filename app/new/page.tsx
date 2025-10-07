"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

export default function AnalyzePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [symptomText, setSymptomText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          symptomText,
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to analyze");

      const data = await res.json();

      // 👇 Instead of refetching later, pass full data in navigation state
router.push(
  `/result/${data.resultId}?disease=${encodeURIComponent(data.result.disease)}&remedy=${encodeURIComponent(data.result.remedy)}&actions=${encodeURIComponent(JSON.stringify(data.result.actions))}&healthScore=${data.result.healthScore || 0}`
);

    } catch (err) {
      console.error("Error analyzing:", err);
      alert("Something went wrong during analysis!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Analyze Plant</h1>
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Describe your plant symptoms..."
        value={symptomText}
        onChange={(e) => setSymptomText(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={handleAnalyze}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
