"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-16 px-6 overflow-hidden"
    >
      {/* Header */}
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-green-50 drop-shadow-lg"
      >
        🌿 About Us
      </motion.h2>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          <p className="text-lg leading-relaxed mb-4">
            <span className="font-semibold text-green-100">
              AgriAid aims to revolutionize agriculture
            </span>{" "}
            by making smart farming accessible for everyone. Using AI and cloud
            technologies, it connects farmers with real-time data, expert
            advice, and a supportive community.
          </p>
          <div className="flex justify-center">
            <Image
              className="rounded-lg shadow-md"
              src="/farmer.jpg"
              alt="Farmer"
              width={220}
              height={220}
            />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          <p className="text-lg leading-relaxed mb-4">
            <span className="font-semibold text-green-100">Tech Stack:</span>{" "}
            Next.js 14, TypeScript, Firebase, Tailwind CSS. <br />
            <span className="font-semibold text-green-100">Features:</span>{" "}
            Authentication, Real-time Database, and a modern UI that simplifies
            access to agricultural insights for farmers.
          </p>
          <div className="flex justify-center">
            <Image
              className="rounded-lg shadow-md"
              src="/farmer2.jpg"
              alt="Farming Technology"
              width={220}
              height={220}
            />
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          <p className="text-lg leading-relaxed mb-4">
            From small-scale growers to large farms, AgriAid helps users track
            soil conditions, predict weather changes, and manage resources
            efficiently. It’s more than an app —{" "}
            <span className="font-semibold text-green-100">
              it’s a step toward sustainable farming.
            </span>
          </p>
          <div className="flex justify-center">
            <Image
              className="rounded-lg shadow-md"
              src="/farmer3.jpg"
              alt="Sustainable Farming"
              width={220}
              height={220}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
