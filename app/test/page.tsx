"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";

export default function TestPage() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser as firebase.User | null);
    });
    return () => unsubscribe();
  }, []);

  const handleAnalyze = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    const token = await user.getIdToken();

    const response = await fetch("https://agriaid-backend.onrender.com/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ symptomText: symptom }),
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">AgriAid Analyzer 🌾</h1>

      <p className="text-sm text-gray-500">
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
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
