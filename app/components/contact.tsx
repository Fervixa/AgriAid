"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { once } from 'events';
import { div } from 'framer-motion/client';


export const Contact = () => {
  return (
    <div className='bg-green-600 z-10 shadow-2xl opacity-80'>
      <div id='contact' className='text-shadow-black text-6xl font-bold text-green-900 p-4'>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Contact Us:
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className='text-medium text-2xl text-black '
          >
            <span className='text-medium text-white p-3'>Have feedback? Drop your thoughts, we love ideas!</span>
            <input
              type="text"
              placeholder='Enter Your Feedback Here!'
              className='bg-white text-black focus:placeholder-transparent rounded-2xl p-4 m-4'
            />
            <a href="mailto:fervixacom@gmail.com">Or Mail Us At: fervixacom@gmail.com</a>
          </motion.p>
        </motion.div>
      </div>
    </div>


  )
}
