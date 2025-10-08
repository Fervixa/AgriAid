import Image from "next/image";
import React from "react";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="relative text-black bg-white min-h-screen overflow-hidden">
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Background Video Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          src="/vdeo1.mp4"
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* 🔹 Dark overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-serif font-semibold drop-shadow-lg leading-tight text-center">
            AgriAid
            <span className="block text-lg sm:text-xl md:text-2xl text-gray-300 mt-2">
              AI-powered crop doctor for farmers
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
