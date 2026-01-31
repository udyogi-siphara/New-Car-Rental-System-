import React from 'react'
import {motion} from 'motion/react'

const NewsLetter = () => {
  return (
    <motion.div 
    initial={{opacity:0, y:30}}
    whileInView={{opacity:1, y:0}}
    transition={{duration:0.6, ease:'easeOut'}}
    viewport={{once:true, amount:0.3}}  
    
    className='pt-25'>
        <section className="flex flex-col items-center text-white">
            <div className="flex flex-col items-center">
                <motion.h2 
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:0.2,duration:0.5}}
                className="text-center text-black text-4xl font-semibold max-w-2xl">Never Miss a Deal!</motion.h2>
                <motion.p 
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:0.3,duration:0.5}}
                className="text-center text-slate-400 max-w-lg mt-3">Subscribe to get the latest offers, new collections, and exclusive discounts.</motion.p>
            </div>
            <motion.div 
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            transition={{delay:0.4,duration:0.5}}
            className="flex items-center justify-center mt-10 border border-slate-700 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-xl w-full">
                <input className="bg-transparent outline-none rounded-full px-4 h-full flex-1 placeholder:text-slate-400" placeholder="Enter your email address" type="text" />
                <button className="bg-primary-dull text-white rounded-full h-11 mr-1 px-10 flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition">Subscribe</button>
            </motion.div>
        </section>
    </motion.div>
  )
}

export default NewsLetter