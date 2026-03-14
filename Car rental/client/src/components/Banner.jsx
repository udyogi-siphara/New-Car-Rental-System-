import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'

const Banner = () => {
  return (
    <div className='relative flex flex-col md:flex-row md:items-center items-center
    justify-between px-8 md:pl-16 pt-12 pb-0 bg-gradient-to-br from-dark via-[#1a1f4e] to-primary
    max-w-6xl mx-4 md:mx-auto rounded-3xl overflow-hidden
    shadow-2xl shadow-primary/20'>

        {/* Background decorative elements */}
        <div className='absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]'></div>
        <div className='absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-[60px]'></div>
        <div className='absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-[40px]'></div>

        <motion.div
        initial={{opacity:0, y:50}}
        whileInView={{opacity:1, y:0}}
        transition={{duration:0.6}}
        className='text-white relative z-10 max-w-lg'>
            <span className='inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-semibold uppercase tracking-wider mb-4'>
              Earn with us
            </span>
            <h2 className='text-3xl md:text-4xl font-bold leading-tight'>Do You Own a <span className='text-accent'>Luxury Car?</span></h2>
            <p className='mt-4 text-white/60 leading-relaxed'>Monetize your vehicle effortlessly by listing it on CarRental.
            We handle insurance, driver verification, and secure payments.</p>
            <motion.button
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            className='shimmer-btn px-8 py-3 bg-white hover:bg-gray-50 transition-all
            text-dark rounded-full font-semibold mt-6 cursor-pointer
            shadow-lg shadow-white/20'>
                List Your Car
            </motion.button>

        </motion.div>

        <motion.img
        initial={{opacity:0, x:50}}
        whileInView={{opacity:1, x:0}}
        transition={{duration:0.6, delay:0.4}}
        src={assets.banner_car_image} alt="car" className='relative z-10 max-h-52 mt-8 md:mt-0
        drop-shadow-2xl' />

    </div>
  )
}

export default Banner
