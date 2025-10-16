"use client"
import React from 'react'
import {auth} from "@/lib/firebaseClient"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import LoginButton from '@/components/LoginButton';
import { Button } from '@/components/ui/button';
export const Home = () => {
  const router = useRouter();
   const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <div id="home" className="relative text-black bg-gradient-to-b from-green-50 via-green-100 to-green-200 min-h-screen overflow-hidden">
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="relative mt-36
         max-w-4xl w-full mx-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-2xl p-10 flex flex-col items-center text-center">
          <h1 className="text-green-700 text-5xl sm:text-4xl md:text-6xl font-serif font-extrabold drop-shadow-md leading-tight">
            AgriAid
            <span className="block text-base sm:text-lg md:text-xl text-green-600 mt-2 font-medium">
              AI crop diagnosis & actionable advice 🌾
            </span>
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl">
            Snap a photo or describe the symptom and get instant guidance to keep your crops healthy.
          </p>
          
        {user == null && 
                      <span className='text-xs text-zinc-800'>Please Login to Continue</span>
                    }
       

        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Analyze
          </Button>

    {user ? (
      <Button
      variant={'destructive'}
        onClick={handleLogout}
        className="px-3 py-4"
      > 
        Logout
      </Button>
    ) : (
      <Button
        onClick={()=>{router.push("/login")}}
        
        className=""
      >
        Login
      </Button>
    )}
        </div>

          <div className="mt-6 text-sm text-gray-500">
            <span>Trusted recommendations · Private by design</span>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-20 -top-20 w-64 h-64 bg-green-100 rounded-full opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 -bottom-28 w-72 h-72 bg-green-200 rounded-full opacity-50 blur-3xl" />
      </motion.div>
    </div>
  )
}