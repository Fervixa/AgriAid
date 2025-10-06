"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

interface ResultData {
  disease: string;
  remedy: string;
  actions?: string[];
  healthScore?: number;
}

export default function ResultPage() {
  const params = useParams();
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      const resultRef = doc(db, "results", params.id as string);
      const snapshot = await getDoc(resultRef);

      if (snapshot.exists()) {
        setResult(snapshot.data() as ResultData);
      } else {
        console.error("Result not found");
      }
      setLoading(false);
    };

    fetchResult();
  }, [params.id]);

  if (loading) return <p className="p-6 text-center">Loading results...</p>;

  if (!result)
    return (
      <div className="text-center p-6">
        <p className="text-red-600">No result found for this ID.</p>
        <Link href="/analyze" className="text-green-700 underline">
          Go back
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
          Diagnosis Result 🌱
        </h1>

        {result.healthScore && (
  <div className="mt-4">
    <p className="text-sm text-gray-500 mb-1">Health Score</p>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-green-600 h-3 rounded-full"
        style={{ width: `${result.healthScore}%` }}
      />
    </div>
  </div>
)}

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Disease:</h2>
            <p className="text-xl text-green-800 font-bold">
              {result.disease || "Healthy"}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Remedy:</h2>
            <p className="text-gray-700">{result.remedy}</p>
          </div>

          {result.actions && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Next Actions:</h2>
              <ul className="list-disc list-inside text-gray-600">
                {result.actions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center mt-6">
            <Link
              href="/analyze"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Analyze Another Crop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
