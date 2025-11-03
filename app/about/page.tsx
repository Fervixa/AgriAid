"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CARD_DATA = [
  {
    title: "Our Mission",
    text: (
      <>
        <span className="font-semibold text-green-700 dark:text-green-50">
          AgriAid aims to revolutionize agriculture
        </span>{" "}
        by making smart farming accessible for everyone. Using AI and cloud
        technologies, it connects farmers with real-time data, expert advice,
        and a supportive community.
      </>
    ),
    image: {
      src: "/farmer.jpg",
      alt: "Farmer"
    }
  },
  {
    title: "Technology & Features",
    text: (
      <>
        <span className="font-semibold text-green-700 dark:text-green-50">Tech Stack:</span>{" "}
        Next.js 14, TypeScript, Firebase, Tailwind CSS.<br />
        <span className="font-semibold text-green-700 dark:text-green-50">Features:</span>{" "}
        Authentication, Real-time Database, and a modern UI that simplifies
        access to agricultural insights for farmers.
      </>
    ),
    image: {
      src: "/farmer2.jpg",
      alt: "Farming Technology"
    }
  },
  {
    title: "Sustainable Impact",
    text: (
      <>
        From small-scale growers to large farms, AgriAid helps users track
        soil conditions, predict weather changes, and manage resources
        efficiently. It’s more than an app —{" "}
        <span className="font-semibold text-green-700 dark:text-green-50">
          it’s a step toward sustainable farming.
        </span>
      </>
    ),
    image: {
      src: "/farmer3.jpg",
      alt: "Sustainable Farming"
    }
  }
];

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-20 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute -top-16 left-2/3 w-72 h-72 bg-green-500/20 rounded-full blur-3xl z-0"></div>
      <div className="pointer-events-none absolute bottom-2 left-1/5 w-52 h-52 bg-green-400/10 rounded-full blur-2xl z-0"></div>
      <div className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 bg-green-800/20 rounded-full blur-[100px] z-0"></div>

      {/* Header */}
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center text-5xl md:text-6xl font-black tracking-tight mb-14 text-green-50 drop-shadow-2xl"
      >
        <span className="inline-flex items-center">
          <span className="mr-2 text-4xl md:text-5xl">🌱</span> About Us
        </span>
      </motion.h2>

      {/* Card Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {CARD_DATA.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group bg-green-50/10 hover:bg-white dark:hover:bg-green-950/70 border border-green-200/10 dark:border-green-700/20 hover:border-green-400/50 transition-all duration-400 shadow-xl hover:shadow-green-400/40 dark:hover:shadow-green-700/80 rounded-2xl p-8 flex flex-col items-center min-h-[420px]"
          >
            <div className="w-[180px] h-[180px] mb-7 relative grid place-content-center rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 bg-white/80 dark:bg-green-800/80">
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={180}
                height={180}
                className="object-cover w-full h-full"
                priority={idx === 0}
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-green-100 dark:text-green-300 mb-4 text-center drop-shadow-sm">
              {card.title}
            </h3>
            <p className="text-md md:text-lg leading-relaxed text-green-50 dark:text-green-100 text-center">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
