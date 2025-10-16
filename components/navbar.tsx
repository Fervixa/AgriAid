"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
    { label: "Home", href: "/dashboard" },
    { label: "About", href: "/about" },
    { label: "Our Goals", href: "/goals" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg">
      
      {/* Title - AgriAid */}
      <div 
        className="flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => router.push("/")}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          AgriAid
        </h1>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigate(item.href)}
            className="text-gray-700 hover:text-green-600 hover:scale-110 cursor-pointer font-medium px-3 py-2 rounded-lg  duration-300 hover:bg-gray-400/10"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right side - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User profile"
                width={36}
                height={36}
                className="rounded-full border-2 border-green-400"
              />
            )}
            <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
              {user.displayName || "User"}
            </span>
          </div>
        ) : (
          <div className="w-28 h-10"></div> 
        )}
      </div>

      <button
        className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-x-4 top-20 md:top-24 z-40 bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                className="w-full text-left text-gray-700 hover:text-green-600 px-3 py-2 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile user section */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            {user ? (
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                {user.photoURL && (
                  <Image 
                    src={user.photoURL} 
                    alt="User" 
                    width={40} 
                    height={40} 
                    className="rounded-full border-2 border-green-400" 
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {user.displayName || "Guest"}
                  </div>
                  <div className="text-xs text-gray-500">Logged in</div>
                </div>
              </div>
            ) : (
              <div className="p-2 text-center text-gray-500 text-sm">
                Sign in to continue
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
 
export default Navbar;