"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebaseClient";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default function HistoryPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not logged in (wait for user to be checked)
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchCases = async () => {
      if (!user) {
        setCases([]); // ensure cases are empty if no user
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "cases"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const items = snap.docs.map((doc) => {
          const data = doc.data();
          let createdAt;
          // Handle Firestore timestamps and plain strings/dates
          if (data.createdAt && typeof data.createdAt.toDate === "function") {
            createdAt = data.createdAt.toDate();
          } else if (data.createdAt) {
            createdAt = new Date(data.createdAt);
          } else {
            createdAt = null;
          }
          return {
            id: doc.id,
            createdAt,
            symptomText: data.symptomText || "Unknown symptom",
            status: data.status || "Unknown status",
            resultId: data.resultId || "Unknown resultId"
          };
        });
        setCases(items);
      } catch (e) {
        setCases([]);
      } finally {
        setLoading(false);
      }
    };
    // Only fetch if user exists and is loaded (not undefined)
    if (user) fetchCases();
  }, [user]);

  if (!user) {
    // Wait for user to be loaded or redirected
    return (
      <div className="mt-36 flex justify-center items-center min-h-screen text-green-700 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-36 flex justify-center items-center min-h-screen text-green-700 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center p-8 pt-32">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
          <span role="img" aria-label="history">🕒</span>
          Your Analysis History
        </h1>
        {cases.length === 0 ? (
          <div className="text-gray-500">No previous analyses yet.</div>
        ) : (
          <div className="space-y-3">
            {cases.map((c) => (
              <div key={c.id} className="border rounded-xl p-3 bg-gray-50 shadow-sm">
                <p className="text-xs text-gray-600 mb-1">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Unknown Date"}
                </p>
                <p className="font-semibold text-green-800">
                  Symptoms: <span className="font-normal text-gray-900">{c.symptomText}</span>
                </p>
                <p>
                  <span className="font-semibold text-green-700">Status:</span>{" "}
                  <span>{c.status}</span>
                </p>
                <p>
                  <span className="font-semibold text-green-700">Result ID:</span>{" "}
                  <span className="break-all">{c.resultId}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
