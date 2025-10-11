"use client"
import React from 'react'
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <div id="home" className="relative text-black bg-white  overflow-hidden">
      {/* 🔹 Background Video Section */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden rounded-xl shadow-2xl">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full h-full"
        >
          <video
            src="/vdeo1.mp4"
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* 🔹 Dark overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-serif font-semibold drop-shadow-lg leading-tight text-center">
            AgriAid
            <span className="block text-lg sm:text-xl md:text-2xl text-gray-300 ">
              Smart Farming, Smart Future 🌾
            </span>
          </h1>
          <motion.div />
        </div>
      </div>
    </div>
  );
}