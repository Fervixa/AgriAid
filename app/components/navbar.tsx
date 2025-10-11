"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react";
import { Analyzecrop } from "./analyzecrop";

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔐 Watch for auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-700/30 backdrop-blur-md px-6 py-4 flex justify-between items-center rounded-3xl">
      {/* 🔹 Logo */}
      <div className="text-2xl font-bold text-green-500">AgriAid</div>

      {/* 🔹 Desktop Nav Links */}
      <div className="hidden md:flex gap-18 text-white font-medium">
        <a
          href="#home"
          className="hover:text-green-400 transition hover:underline hover:cursor-pointer underline-offset-4"
        >
          Home
        </a>
        <a
          href="#about"
          className="hover:text-green-400 transition hover:underline hover:cursor-pointer underline-offset-4"
        >
          About
        </a>
        <a
          href="#ourGoal"
          className="hover:text-green-400 transition hover:underline hover:cursor-pointer underline-offset-4"
        >
          Our-Goal
        </a>
        <a
          href="#contact"
          className="hover:text-green-400 transition hover:underline hover:cursor-pointer underline-offset-4"
        >
          Contact
        </a>
      </div>

      {/* 🔹 Right Side (User + Login) */}
      <div className="hidden md:flex items-center gap-4">
        {user && (
          <>
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User"
                width={36}
                height={36}
                className="rounded-full border border-gray-400"
              />
            )}
            <span className="text-sm font-semibold text-gray-200">
              {user.displayName || "User"}
            </span>
          </>
        )}
        <Analyzecrop />
        <LoginButton />
      </div>
      {/* 🔹 Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 🔹 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800/90 backdrop-blur-md flex flex-col items-center gap-4 py-5 text-white font-medium rounded-b-2xl shadow-lg md:hidden">
          <a
            href="#home"
            className="hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>

          {/* User + Login inside dropdown */}
          {user && (
            <div className="flex flex-col items-center gap-2">
              {user.photoURL && (
                <Image
                  src={user.photoURL}
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-400"
                />
              )}
              <span className="text-sm font-semibold text-gray-300">
                {user.displayName || "User"}
              </span>
            </div>
          )}
          <LoginButton />
          <Analyzecrop />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
