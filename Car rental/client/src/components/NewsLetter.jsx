import React from 'react'
import {motion} from 'motion/react'

const NewsLetter = () => {
  return (
    <motion.div
    initial={{opacity:0, y:30}}
    whileInView={{opacity:1, y:0}}
    transition={{duration:0.6, ease:'easeOut'}}
    viewport={{once:true, amount:0.3}}

    className='pt-28 pb-10 px-6'>
        <section className="relative flex flex-col items-center py-20 px-6 rounded-3xl
          bg-gradient-to-br from-dark via-[#1a1f4e] to-primary max-w-4xl mx-auto
          overflow-hidden shadow-2xl shadow-primary/20">

            {/* Decorative bg */}
            <div className='absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px]'></div>
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]'></div>

            <div className="flex flex-col items-center relative z-10">
                <motion.span
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:0.1,duration:0.5}}
                className='inline-block px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10'>
                  Stay Updated
                </motion.span>
                <motion.h2
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:0.2,duration:0.5}}
                className="text-center text-white text-4xl font-bold max-w-lg">Never Miss a <span className='text-accent'>Deal!</span></motion.h2>
                <motion.p
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:0.3,duration:0.5}}
                className="text-center text-white/50 max-w-md mt-4 leading-relaxed">Subscribe to get the latest offers, new vehicles, and exclusive discounts delivered to your inbox.</motion.p>
            </div>
            <motion.div
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            transition={{delay:0.4,duration:0.5}}
            className="relative z-10 flex items-center justify-center mt-10 bg-white/[0.07] backdrop-blur-sm border border-white/10 text-sm rounded-full h-14 max-w-lg w-full">
                <input className="bg-transparent outline-none rounded-full px-5 h-full flex-1 text-white placeholder:text-white/30" placeholder="Enter your email address" type="text" />
                <button className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-full h-11 mr-1.5 px-8 flex items-center justify-center
                hover:from-primary-dull hover:to-purple-700 active:scale-95 transition font-semibold text-sm
                shadow-lg shadow-primary/30">Subscribe</button>
            </motion.div>
        </section>
    </motion.div>
  )
}

export default NewsLetter
