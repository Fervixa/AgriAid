"use client";

import { useAuth } from "@/context/Authcontext";
import { useState } from "react";

export default function TestPage() {
  const { user, loading } = useAuth();
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState<any>(null);
  const [fetching, setFetching] = useState(false);

  const handleAnalyze = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const token = await user.getIdToken();

    setFetching(true);
    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ symptomText: symptom }),
    });
    const data = await res.json();
    setResult(data);
    setFetching(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">AgriAid Analyzer 🌾</h1>
      <p className="text-gray-600">
        {user ? `Logged in as ${user.email}` : "Not logged in"}
      </p>

      <input
        type="text"
        placeholder="Describe your crop issue..."
        className="border p-2 rounded w-full"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        disabled={!user || fetching}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {fetching ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
