"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <nav
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] 
                 z-50 bg-white/10 backdrop-blur-lg border border-white/20 
                 rounded-2xl px-6 py-3 flex justify-between items-center 
                 shadow-lg transition-all duration-300"
    >
      {/* 🔹 Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png" // Optional: add your logo
          alt="AgriAid"
          width={36}
          height={36}
          className="rounded-lg"
        />
        <span className="text-2xl font-bold text-green-400 tracking-wide drop-shadow-sm">
          AgriAid
        </span>
      </div>

      {/* 🔹 Desktop Nav Links */}
      <div className="hidden md:flex gap-10 text-white font-medium items-center">
        {["Home", "About", "Our Goals", "Contact"].map((item, idx) => (
          <a
            key={idx}
            href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
            className="relative group"
          >
            <span className="transition text-gray-100 group-hover:text-green-400">
              {item}
            </span>
            <span
              className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 transition-all 
                         group-hover:w-full rounded-full"
            ></span>
          </a>
        ))}
      </div>

      {/* 🔹 Right Side (User + Login) */}
      <div className="hidden md:flex items-center gap-5">
        {user && (
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User"
                width={36}
                height={36}
                className="rounded-full border border-green-400 shadow-md"
              />
            )}
            <span className="text-sm font-semibold text-gray-100">
              {user.displayName || "User"}
            </span>
          </div>
        )}
        <LoginButton />
      </div>

      {/* 🔹 Mobile Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 🔹 Mobile Dropdown Menu */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-gray-900/90 backdrop-blur-xl 
                    flex flex-col items-center gap-5 py-6 text-white font-medium 
                    rounded-b-2xl shadow-lg transform transition-all duration-500 
                    ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
      >
        {["Home", "About", "Our Goals", "Contact"].map((item, idx) => (
          <a
            key={idx}
            href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
            className="hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}

        {user && (
          <div className="flex flex-col items-center gap-2">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User"
                width={40}
                height={40}
                className="rounded-full border border-green-400 shadow-sm"
              />
            )}
            <span className="text-sm font-semibold text-gray-300">
              {user.displayName || "User"}
            </span>
          </div>
        )}
        <LoginButton />
       </div>
    </nav>
  );
};

export default Navbar;
