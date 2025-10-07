"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ResultData {
  disease: string;
  remedy: string;
  actions: string[];
  healthScore: number | null;
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    // Extract data from URL query params
    const disease = searchParams.get("disease");
    const remedy = searchParams.get("remedy");
    const actions = searchParams.get("actions");
    const healthScore = searchParams.get("healthScore");

    if (disease && remedy && actions !== null) {
      setResult({
        disease,
        remedy,
        actions: JSON.parse(actions),
        healthScore: healthScore ? Number(healthScore) : null,
      });
    }
  }, [searchParams]);

  if (!result) {
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 text-xl font-semibold">
        Loading result...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
          🌾 Diagnosis Result
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Disease:</h2>
            <p className="text-xl font-bold text-red-600 mt-1">{result.disease}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-600">Remedy:</h2>
            <p className="text-base text-gray-800 mt-1 whitespace-pre-line">
              {result.remedy}
            </p>
          </div>

          {result.actions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                Suggested Actions:
              </h2>
              <ul className="list-disc ml-5 text-gray-800 mt-1">
                {result.actions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {result.healthScore !== null && (
            <div className="text-center mt-6">
              <p className="text-gray-700 font-semibold">
                🌱 Health Score:{" "}
                <span className="text-green-700 font-bold">
                  {result.healthScore}/100
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
