
import React, { useEffect, createContext, useContext, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../lib/firebaseClient";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        // Create or update users/{uid} document
        await setDoc(doc(db, "users", u.uid), {
          name: u.displayName || null,
          phone: u.phoneNumber || null,
          language: "en",
          lastSeen: serverTimestamp(),
        }, { merge: true });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
