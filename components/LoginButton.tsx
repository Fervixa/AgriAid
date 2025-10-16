"use client";

import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, provider } from "@/lib/firebaseClient";
import Router from "next/router";

export default function LoginButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {user ? (
        <button
          onClick={handleLogout}
          className="text-sm cursor-pointer text-black  bg-red-600/45 hover:bg-red-700 px-4 py-2  rounded-lg transition"
        >
          {user == null && 
                        <span className='text-xs text-zinc-800'>Please Login to Continue</span>
                      }
          ^
          Logout
        </button>
      ) : (
        <button
          onClick={()=>{Router.push("/login")}}
          className="text-medium w-[100px] hover:-translate-y-2 duration-150 hover:cursor-pointer text-black bg-green-600 hover:bg-green-700 px-4 py-2  rounded-lg transition"
        >
          Login
        </button>
      )}
    </>
  );
}
