"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';
import { once } from 'events';
import Image from 'next/image';


export const About = () => {
  return (

    <div id="about" className='bg-green-600 z-10 shadow-2xl opacity-80'>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}>
        <div className='text-shadow-black text-6xl sm:text-xl font-bold text-green-900 pt-10'>
          Features/About Us:
          <div className="text-3xl md:text-4xl font-bold text-green-200 text-center mt-10 ">

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center p-6 gap-5 container">
              {/* Grid No 1 */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className=' font-medium mx-auto leading-relaxed tracking-wide max-w-3xl text-xl text-white border-2 rounded-3xl p-6 hover:ease-out duration-200 hover:translate-y-2 shadow-2xl'
              >
                AgriAid aims to revolutionize the agricultural sector by making smart farming accessible for everyone.
                Using AI and cloud technologies, it connects farmers with real-time data, expert advice, and community support.
                <Image className="w-[200px] h-[200px] rounded-4xl m-auto " src="farmer.jpg" alt="loading in a minute.." />
              </motion.p>

              {/* Grid No 2 */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className=' font-medium mx-auto leading-relaxed tracking-wide max-w-3xl text-xl text-white border-2 rounded-3xl p-6  hover:ease-out duration-200 hover:translate-y-2  shadow-2xl'
              >
                Tech Stack: Next.js 14, TypeScript, Firebase, Tailwind CSS
                Features: Authentication, Real-time database, Modern UI
                AgriAid is built to simplify access to agricultural insights and digital tools for farmers.
                <Image className="w-[200px] h-[200px] rounded-4xl m-auto " src="farmer2.jpg" alt="Image will loading in a minute.." />
              </motion.p>

              {/* Grid No 3 */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className=' font-medium mx-auto leading-relaxed tracking-wide max-w-3xl text-xl text-white border-2 rounded-3xl p-6  hover:ease-out duration-200 hover:translate-y-2  shadow-2xl'>
                From small-scale growers to large farms, AgriAid helps users track soil conditions, predict weather changes, and manage resources efficiently.
                It is more than an app — it is a step toward sustainable farming.
                <Image className="w-[200px] h-[200px] rounded-4xl m-auto " src="farmer3.jpg" alt="Image will loading in a minute.." />
              </motion.p>
            </div>
          </div>
        </div>
        </motion.div>
    </div>
  )
}
