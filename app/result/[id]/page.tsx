"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaRegSadCry,
  FaRegSmileBeam,
  FaRegMeh,
  FaRegTimesCircle,
  FaClipboardList,
  FaHeartbeat,
} from "react-icons/fa";
import { GiHealthNormal, GiMedicinePills, GiVirus } from "react-icons/gi";
import { BsCheck2Circle } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiLoader3Line } from "react-icons/ri";

interface ResultData {
  disease: string;
  remedy: string;
  actions: string[];
  healthScore: number;
}

// Health status variants for animation and icon selection
const healthStatus = [
  {
    min: 75,
    color: "#22c55e",
    text: "text-green-600",
    bg: "bg-green-50",
    label: "Excellent Health",
    icon: <FaRegSmileBeam className="text-green-500 text-4xl animate-bounce" />,
  },
  {
    min: 50,
    color: "#eab308",
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    label: "Good Health",
    icon: <GiHealthNormal className="text-yellow-500 text-4xl animate-pulse" />,
  },
  {
    min: 25,
    color: "#f97316",
    text: "text-orange-600",
    bg: "bg-orange-50",
    label: "Fair Health",
    icon: <FaRegMeh className="text-orange-500 text-4xl animate-spin-slow" />,
  },
  {
    min: 0,
    color: "#ef4444",
    text: "text-red-600",
    bg: "bg-red-50",
    label: "Poor Health",
    icon: (
      <FaRegSadCry className="text-red-500 text-4xl animate-bounce-slow" />
    ),
  },
];

// Helper for slow spin and bounce animations
// (You may define these in your global CSS if needed)
const customAnimations = `
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg);} }
.animate-spin-slow { animation: spin-slow 3s linear infinite;}
@keyframes bounce-slow { 0%, 100% { transform: translateY(0);} 50% {transform: translateY(-8px);} }
.animate-bounce-slow { animation: bounce-slow 2.2s infinite; }
`;

function HealthGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 150);
    return () => clearTimeout(timer);
  }, [score]);

  // Determine health status segment
  const getStatus = () => {
    for (let h of healthStatus) if (animatedScore >= h.min) return h;
    return healthStatus[3];
  };
  const status = getStatus();

  // SVG arc setup
  const radius = 120;
  const strokeWidth = 26;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = Math.PI * normalizedRadius;
  const arcLength = (animatedScore / 100) * circumference;
  const path =
    `M ${strokeWidth / 2},${radius + strokeWidth / 2} ` +
    `A ${normalizedRadius},${normalizedRadius} 0 0,1 ${radius * 2 + strokeWidth / 2},${radius + strokeWidth / 2}`;
  const pathEndOffset = circumference - arcLength;

  return (
    <>
      {/* Add custom animation classes in a <style> tag */}
      <style>{customAnimations}</style>
      <div className="flex flex-col items-center">
        <div className="relative">
          <motion.svg
            width={radius * 2 + strokeWidth}
            height={radius + strokeWidth * 1.5}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            {/* Background Arc */}
            <path
              d={path}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
            />

            {/* Progress Arc with animation */}
            <motion.path
              d={path}
              fill="none"
              stroke={status.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              animate={{ strokeDashoffset: pathEndOffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 2px 8px ${status.color}40)`,
              }}
            />
          </motion.svg>

          {/* Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <motion.div
              className={`text-6xl font-extrabold ${status.text} drop-shadow-sm`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 180,
                delay: 0.25,
              }}
            >
              {animatedScore}
            </motion.div>
            <div className="text-gray-500 text-base font-medium">out of 100</div>
          </div>
        </div>

        {/* Health Status Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 110 }}
          className={`mt-5 px-6 py-2.5 rounded-full ${status.bg} ${status.text} text-base font-bold flex items-center gap-3 shadow-md`}
        >
          {status.icon}
          <span>{status.label}</span>
        </motion.div>
      </div>
    </>
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
        <motion.div
          className="text-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <motion.div
            className="mx-auto mb-4 flex justify-center items-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          >
            <RiLoader3Line className="w-16 h-16 text-green-600" />
          </motion.div>
          <p className="text-green-700 text-lg font-medium">
            Loading your results...
          </p>
        </motion.div>
      </div>
    );

  if (!result)
    return (
      <div className="flex pt-36 justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md mx-4"
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.7 }}
        >
          <FaRegTimesCircle className="text-rose-400 text-6xl mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Result Not Found
          </h2>
          <p className="text-gray-600">
            We could not find the diagnosis you are looking for.
          </p>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen pt-36 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-9"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.13 }}
          >
            <motion.div
              initial={{ rotate: -5, opacity: 0.7 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex justify-center mb-1"
            >
              <FaLeaf className="text-5xl text-green-600 drop-shadow-md animate-bounce" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2 tracking-tight">
              Diagnosis Results
            </h1>
            <p className="text-gray-600 text-lg">
              Complete analysis of your plant condition
            </p>
          </motion.div>

          {/* Health Score */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-10"
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ x: -10, opacity: 0.7 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.22 }}
            >
              <FaHeartbeat className="text-pink-500 text-3xl animate-pulse" />
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                Plant Health Score
              </h2>
            </motion.div>
            <HealthGauge score={result.healthScore || 0} />
          </motion.div>

          {/* Disease & Remedy */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09 } },
            }}
          >
            {/* Disease Detection */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all border-l-8 border-rose-200"
              variants={{
                hidden: { x: -30, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl flex-shrink-0 flex items-center justify-center p-2 bg-rose-100 rounded-full shadow-inner">
                  <GiVirus className="text-rose-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-1">
                    Disease Detected
                  </h3>
                  <div className="rounded-xl p-4 bg-gradient-to-r from-rose-50 to-rose-100 shadow-inner flex items-center gap-3">
                    {result.disease ? (
                      <BsCheck2Circle className="text-2xl text-red-400" />
                    ) : (
                      <FaRegSmileBeam className="text-2xl text-green-400" />
                    )}
                    <p className="text-2xl font-bold text-red-600">
                      {result.disease || "No disease detected"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Remedy */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all border-l-8 border-green-200"
              variants={{
                hidden: { x: 30, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl flex-shrink-0 flex items-center justify-center p-2 bg-green-100 rounded-full shadow-inner">
                  <GiMedicinePills className="text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-1">
                    Recommended Treatment
                  </h3>
                  <div className="bg-green-50 rounded-xl p-4 shadow-inner flex items-center gap-3">
                    <FaClipboardList className="text-2xl text-green-400" />
                    <p className="text-gray-800 leading-relaxed text-base">
                      {result.remedy || "No remedy needed"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Action Steps */}
          <AnimatePresence>
            {result.actions?.length > 0 && (
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all border-l-8 border-blue-200"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: "spring", delay: 0.18 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <FaClipboardList className="text-4xl flex-shrink-0 text-blue-400 drop-shadow-md" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Step-by-Step Action Plan
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Follow these steps to treat your plant
                    </p>
                  </div>
                </div>
                <ol className="space-y-4">
                  {result.actions.map((action, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition-shadow relative"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.07 * i }}
                    >
                      <motion.span
                        className="flex-shrink-0 w-10 h-10 
                          bg-gradient-to-br from-blue-500 to-cyan-400 
                          text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md border-2 border-white z-10"
                        whileHover={{ scale: 1.13, rotate: [0, 8, -8, 0] }}
                        transition={{ type: "spring", stiffness: 220 }}
                      >
                        {i + 1}
                      </motion.span>
                      <p className="text-gray-800 flex-1 pt-0.5 text-base leading-relaxed">
                        {action}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back Button */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
          >
            <motion.button
              onClick={() => window.history.back()}
              className="bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all focus:outline-none ring-2 ring-green-300 ring-offset-2 flex items-center gap-2 justify-center mx-auto"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.06, boxShadow: "0px 10px 24px #22c55e20" }}
            >
              <MdArrowBackIosNew className="text-lg" />
              Analyze Another Plant
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}