"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';
export const Ourgoal = () => {
    return (
        <div id='ourGoal'>
            <div className='bg-green-600 z-10 shadow-2xl opacity-80 text-shadow-black text-6xl p-2 font-bold text-green-900 '>
                Our-Goal:
                <motion.p initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="font-medium flex flex-col p-5 text-xl leading-relaxed tracking-wide text-green-200 space-y-4 " >
                    -Make smart farming simple, accessible, and impactful for every farmer. <br />
                    -Digitize agriculture in Pakistan and beyond — turning everyday farmers into data-driven <br />
                    -Bring tech to the fields 🌾 Smarter farms, stronger communities, and a greener future.<br />
                    -Combine AI, data, and community to make farming more efficient, predictable, and profitable.<br />

                </motion.p>
            </div>
        </div>
    )
}