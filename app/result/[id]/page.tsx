"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

interface ResultData {
  disease: string;
  remedy: string;
  actions: string[];
  healthScore: number;
}

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const docRef = doc(db, "results", id as string); // collection name must match backend
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResult(docSnap.data() as ResultData);
        } else {
          console.error("❌ No such document!");
        }
      } catch (err) {
        console.error("❌ Error fetching Firestore result:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResult();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-green-700 text-xl font-semibold">
        Loading result...
      </div>
    );

  if (!result)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg font-semibold">
        Result not found 😔
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-6">
      <div className="max-w-6xl mt-36 mx-auto">
        {/* Top Section with Image and Health Score */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Image Section */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex items-center justify-center">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Plant Image Placeholder</span>
            </div>
          </div>

          {/* Health Score Gauge Section */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Plant Health Score</h2>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Health Status
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {result.healthScore ? `${result.healthScore}%` : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-green-200">
                <div
                  style={{ width: `${result.healthScore || 0}%` }}
                  className="transition-all duration-1000 ease-out shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                >
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Diagnosis Details */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
            🌾 Diagnosis Result
          </h1>

          <div className="grid gap-6">
            <div className="bg-red-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">Disease Detected:</h2>
              <p className="text-xl font-bold text-red-600 mt-1">{result.disease || 'No disease detected'}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700">Recommended Remedy:</h2>
              <p className="text-base text-gray-800 mt-1 whitespace-pre-line">{result.remedy || 'No remedy needed'}</p>
            </div>

            {result.actions?.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-700">Action Steps:</h2>
                <ul className="list-disc ml-5 text-gray-800 mt-2 space-y-1">
                  {result.actions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
