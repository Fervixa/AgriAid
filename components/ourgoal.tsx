"use client"
import React from "react";
import { motion } from "framer-motion";

export const Ourgoal = () => {
  return (
    <main
      id="ourGoal"
      className="relative min-h-[calc(100vh-64px)] py-20 px-4 md:px-12 bg-gradient-to-br from-green-50 via-lime-100 to-green-100 overflow-x-hidden"
    >
      {/* Large Decorative Background Elements */}
      <div className="pointer-events-none select-none absolute left-0 top-0 opacity-20 z-0">
        <svg width="320" height="180" fill="none" viewBox="0 0 320 180">
          <ellipse
            cx="160"
            cy="100"
            rx="160"
            ry="45"
            fill="#22C55E"
            fillOpacity="0.18"
          />
        </svg>
      </div>
      <div className="pointer-events-none select-none absolute right-0 bottom-0 opacity-20 z-0">
        <svg width="340" height="180" fill="none" viewBox="0 0 340 180">
          <ellipse
            cx="180"
            cy="80"
            rx="160"
            ry="45"
            fill="#BBF7D0"
            fillOpacity="0.25"
          />
        </svg>
      </div>
      {/* Page Title */}
      <motion.header
        className="max-w-4xl mx-auto text-center z-10 relative"
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="flex justify-center gap-3 items-center text-5xl sm:text-6xl font-extrabold tracking-tight text-green-900 mb-6 drop-shadow-sm">
          <span role="img" aria-label="Seedling">
            🌱
          </span>
          Our Goal
        </h1>
        <p className="text-xl sm:text-2xl text-green-800 font-normal mb-10 mx-auto max-w-2xl">
          At AgriAid, we are dedicated to transforming agriculture through technology, accessibility, and community. Here’s what drives us forward:
        </p>
      </motion.header>

      {/* Main Content Grid */}
      <section className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-2 md:px-8">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ul className="space-y-7 text-lg sm:text-xl text-green-800 leading-8">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center mt-1 mr-0.5">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" />
                </svg>
              </span>
              <span>
                Make smart farming <strong className="text-green-950 font-semibold">simple, accessible,</strong> and impactful for every farmer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center mt-1 mr-0.5">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" />
                </svg>
              </span>
              <span>
                Digitize agriculture in <span className="font-medium text-green-800">Pakistan</span> and beyond—empowering everyday farmers with data-driven decisions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center mt-1 mr-0.5">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" />
                </svg>
              </span>
              <span>
                Bring tech to the fields
                <span className="ml-1" role="img" aria-label="Wheat">🌾</span>
                — smarter farms, stronger communities, and a greener future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center mt-1 mr-0.5">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" />
                </svg>
              </span>
              <span>
                Combine <strong className="text-green-950">AI, data</strong>, and <strong className="text-green-950">community</strong> to make farming more <span className="font-medium text-green-800">efficient, predictable,</span> and <span className="font-medium text-green-800">profitable</span>.
              </span>
            </li>
          </ul>
        </motion.div>
        <motion.div
          className="flex items-center justify-center md:items-start relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Illustration or Themed Image (optional enhancement) */}
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-200/80 via-green-100/70 to-lime-50/30 border border-green-200 p-8 flex flex-col items-center">
            <svg width="100" height="100" fill="none" viewBox="0 0 100 100" className="mb-4">
              <ellipse cx="50" cy="50" rx="48" ry="18" fill="#16A34A" fillOpacity="0.17" />
              <ellipse cx="50" cy="37" rx="20" ry="9" fill="#4ADE80" fillOpacity="0.25" />
              <path d="M50 65C60 52 70 62 76 44C82 26 54 24 50 45C46 64 18 61 24 44C29 27 40 44 50 32"
                stroke="#22C55E" strokeWidth="2" fill="none" />
              <circle cx="50" cy="28" r="6" fill="#A7F3D0" stroke="#16A34A" strokeWidth="1.5" />
            </svg>
            <span className="text-center text-green-900 text-xl font-semibold mt-2">
              Empowering Agriculture with Innovation
            </span>
            <span className="text-green-700 mt-2 text-base">
              Technology and collaboration are the seeds for a sustainable tomorrow.
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
};