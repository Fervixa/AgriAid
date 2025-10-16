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
// ✅ Cleaned-up and fixed HealthGauge
function HealthGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (value: number) => {
    if (value >= 75)
      return {
        stroke: "#22c55e",
        text: "text-green-600",
        bg: "bg-green-50",
        label: "Excellent Health",
        emoji: "🌟",
      };
    if (value >= 50)
      return {
        stroke: "#eab308",
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        label: "Good Health",
        emoji: "👍",
      };
    if (value >= 25)
      return {
        stroke: "#f97316",
        text: "text-orange-600",
        bg: "bg-orange-50",
        label: "Fair Health",
        emoji: "⚠️",
      };
    return {
      stroke: "#ef4444",
      text: "text-red-600",
      bg: "bg-red-50",
      label: "Poor Health",
      emoji: "❌",
    };
  };

  const colors = getColor(animatedScore);
  const radius = 120;
  const strokeWidth = 26;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={radius * 2 + strokeWidth}
          height={radius + strokeWidth * 1.5}
          className="transform"
        >
          {/* Background Arc */}
          <path
            d={`M ${strokeWidth / 2},${radius + strokeWidth / 2} 
                A ${normalizedRadius},${normalizedRadius} 0 0,1 
                ${radius * 2 + strokeWidth / 2},${radius + strokeWidth / 2}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />

          {/* Progress Arc */}
          <path
            d={`M ${strokeWidth / 2},${radius + strokeWidth / 2} 
                A ${normalizedRadius},${normalizedRadius} 0 0,1 
                ${radius * 2 + strokeWidth / 2},${radius + strokeWidth / 2}`}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <div className={`text-6xl font-bold ${colors.text}`}>
            {animatedScore}
          </div>
          <div className="text-gray-500 text-sm font-medium">out of 100</div>
        </div>
      </div>

      {/* Label */}
      <div
        className={`mt-5 px-6 py-2.5 rounded-full ${colors.bg} ${colors.text} text-base font-semibold flex items-center gap-2 shadow-sm`}
      >
        <span>{colors.emoji}</span>
        <span>{colors.label}</span>
      </div>
    </div>
  );
}


export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const docRef = doc(db, "results", id as string);
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700 text-lg font-medium">Loading your results...</p>
        </div>
      </div>
    );

  if (!result)
    return (
      <div className="flex pt-36 justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Result Not Found</h2>
          <p className="text-gray-600">We couldn't find the diagnosis you're looking for.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pt-36 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">🌿 Diagnosis Results</h1>
          <p className="text-gray-600 text-lg">Complete analysis of your plant's condition</p>
        </div>

        {/* Health Score Card - Full Width */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Plant Health Score</h2>
          <HealthGauge score={result.healthScore || 0} />
        </div>

        {/* Disease and Remedy Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Disease Detection */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">🦠</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Disease Detected</h3>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-red-600">
                    {result.disease || 'No disease detected'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Remedy */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">💊</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Recommended Treatment</h3>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-gray-800 leading-relaxed text-base">
                    {result.remedy || 'No remedy needed'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Steps - Full Width */}
        {result.actions?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl flex-shrink-0">📋</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800">Step-by-Step Action Plan</h3>
                <p className="text-gray-600 mt-1">Follow these steps to treat your plant</p>
              </div>
            </div>
            <div className="space-y-4">
              {result.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-base font-bold shadow-md">
                    {i + 1}
                  </span>
                  <p className="text-gray-800 flex-1 pt-0.5 text-base leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            ← Analyze Another Plant
          </button>
        </div>
      </div>
    </div>
  );
}