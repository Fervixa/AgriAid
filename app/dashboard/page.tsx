"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseClient";
export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else router.push("/");
    });
    return () => unsub();
  }, [router]);

  return (
    <div className="p-6">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
          <p className="mt-2 text-gray-600">
            You are logged in as {user.email}
          </p>
          <div className="mt-6">
            <a
              href="/test"
              className="text-green-700 underline font-semibold hover:text-green-900"
            >
              ➜ Go to Test Page
            </a>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
