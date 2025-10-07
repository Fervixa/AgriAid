"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Authcontext";
import { db } from "@/lib/firebaseClient";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default function HistoryPage() {
  const { user } = useAuth();
  interface Case {
    id: string;
    createdAt?: { toDate: () => Date };
    symptomText: string;
    status: string;
    resultId: string;
  }

  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      if (!user) return;
      const q = query(
        collection(db, "cases"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const items = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          createdAt: data.createdAt,
          symptomText: data.symptomText || "Unknown symptom",
          status: data.status || "Unknown status",
          resultId: data.resultId || "Unknown resultId",
        };
      });
      setCases(items);
      setLoading(false);
    };
    fetchCases();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Analysis History 🌾</h1>
      {cases.length === 0 ? (
        <p>No previous analyses yet.</p>
      ) : (
        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="border rounded p-3 bg-gray-50">
              <p className="text-sm text-gray-500">{c.createdAt?.toDate?.().toLocaleString()}</p>
              <p className="font-semibold">Symptoms: {c.symptomText}</p>
              <p>Status: {c.status}</p>
              <p>Result ID: {c.resultId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
