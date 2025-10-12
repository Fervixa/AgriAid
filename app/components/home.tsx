"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { Analyzecrop } from './analyzecrop';
import LoginButton from './LoginButton';


export const Home = () => {
  return (
    <div id="home" className="relative text-black bg-green-200 h-screen overflow-hidden">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full"
      >
        <div className="absolute inset-0  flex flex-col items-center justify-center px-4">
          <h1 className="text-green-600 text-5xl sm:text-4xl md:text-6xl font-serif font-semibold drop-shadow-lg leading-tight text-center">
            AgriAid
            <span className="block text-lg sm:text-xl md:text-2xl text-green-600 ">
              Smart Farming, Smart Future 🌾
            </span>

          </h1 >
          <div className='gap-5 mt-5 flex'>
            <Analyzecrop />
            <LoginButton />
            <motion.div />
          </div>
        </div>
      </motion.div>
    </div>
  )
}