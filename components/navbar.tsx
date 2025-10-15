"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged, type User } from "firebase/auth";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Goals", href: "/goals" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] z-50
                 bg-black/10 backdrop-blur-lg border border-white/10 rounded-2xl
                 px-4 py-3 flex items-center justify-between shadow-lg"
      aria-label="Primary"
    >
      {/* Logo + title */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
        role="button"
        aria-label="Go to home"
      >
        <div className="w-10 h-10 relative rounded-lg overflow-hidden flex-shrink-0">
          <Image src="/logo/05.jpg" alt="AgriAid" fill sizes="40px" className="object-cover" />
        </div>
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-sm font-bold text-white">AgriAid</span>
          <span className="text-xs text-green-200 -mt-0.5">AI crop doctor</span>
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigate(item.href)}
            className="text-sm text-gray-100 hover:text-green-300 transition px-2 py-1 rounded-md"
            aria-label={`Go to ${item.label}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-white p-2 rounded-md focus:ring-2 focus:ring-green-300"
        onClick={() => setMenuOpen((s) => !s)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      <div
        className={`fixed inset-x-3 top-20 z-40 bg-gray-900/95 backdrop-blur-xl rounded-2xl
                    p-6 flex flex-col gap-4 transition-transform duration-200
                    ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-[-8%] opacity-0 pointer-events-none"}`}
      >
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigate(item.href)}
            className="text-left text-lg text-gray-100 hover:text-green-300 px-2 py-2 rounded-md"
          >
            {item.label}
          </button>
        ))}

        <div className="border-t border-white/10 mt-2 pt-3 flex items-center gap-3">
          {user && user.photoURL && (
            <Image src={user.photoURL} alt="User" width={40} height={40} className="rounded-full" />
          )}
          <div className="flex-1">
            <div className="text-sm text-gray-100">{user?.displayName || "Guest"}</div>
          </div>
          <LoginButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
