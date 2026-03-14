import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'


const Footer = () => {
  return (
<motion.div
     initial={{opacity:0, y:30}}
     whileInView={{opacity:1, y:0}}
     transition={{duration:0.6}}
     className='px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-0 bg-dark text-gray-400'>
        <motion.div
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            transition={{duration:0.6, delay:0.2}}

            className='flex flex-wrap justify-between items-start gap-10 pb-10
            border-white/10 border-b'>
                <div className='max-w-sm'>
                    <motion.img
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    transition={{duration:0.5, delay:0.3}}
                    src={assets.logo} alt="logo" className='h-9 brightness-200' />
                    <motion.p
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    transition={{duration:0.5, delay:0.4}}

                    className='mt-4 text-white/40 leading-relaxed'>
                       Premium car rental service with a
                       wide selection of
                        luxury and everyday vehicles for all your
                         driving
                        needs across Sri Lanka.
                    </motion.p>
                <motion.div
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    transition={{duration:0.5, delay:0.5}}

                    className='flex items-center gap-4 mt-6'>
                        <a href="#" className='w-9 h-9 rounded-full bg-white/5 border border-white/10
                          flex items-center justify-center hover:bg-primary/20 hover:border-primary/30
                          transition-all duration-300'>
                          <img src={assets.facebook_logo} className='w-4 h-4 brightness-200 opacity-60' alt=''/>
                        </a>
                        <a href="#" className='w-9 h-9 rounded-full bg-white/5 border border-white/10
                          flex items-center justify-center hover:bg-primary/20 hover:border-primary/30
                          transition-all duration-300'>
                          <img src={assets.instagram_logo} className='w-4 h-4 brightness-200 opacity-60' alt=''/>
                        </a>
                        <a href="#" className='w-9 h-9 rounded-full bg-white/5 border border-white/10
                          flex items-center justify-center hover:bg-primary/20 hover:border-primary/30
                          transition-all duration-300'>
                          <img src={assets.twitter_logo} className='w-4 h-4 brightness-200 opacity-60' alt=''/>
                        </a>
                        <a href="#" className='w-9 h-9 rounded-full bg-white/5 border border-white/10
                          flex items-center justify-center hover:bg-primary/20 hover:border-primary/30
                          transition-all duration-300'>
                          <img src={assets.gmail_logo} className='w-4 h-4 brightness-200 opacity-60' alt=''/>
                        </a>
                </motion.div>
            </div>



            <motion.div
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.6, delay:0.4}}

                className='flex flex-wrap justify-between w-full md:w-1/2 gap-10'>
                <div>
                    <h2 className='text-base font-semibold text-white
                    uppercase tracking-wider text-sm'>Quick Links</h2>
                    <ul className='mt-4 flex flex-col gap-2.5'>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>Home</a></li>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>Browse Cars</a></li>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>List Your Car</a></li>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>About Us</a></li>
                    </ul>
                </div>


                <div>
                    <h2 className='text-base font-semibold text-white
                    uppercase tracking-wider text-sm'>Resources</h2>
                    <ul className='mt-4 flex flex-col gap-2.5'>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>Help Center</a></li>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>Terms of Service</a></li>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>Privacy Policy</a></li>
                        <li><a href="#" className='hover:text-white transition-colors duration-200'>Insurance</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-semibold text-white
                    uppercase tracking-wider text-sm'>Contact</h2>
                    <ul className='mt-4 flex flex-col gap-2.5'>
                        <li>No : 80</li>
                        <li>Galle Road, Colombo</li>
                        <li className='hover:text-white transition-colors duration-200'>+94 112202020</li>
                        <li className='hover:text-white transition-colors duration-200'>info@grt.com</li>
                    </ul>
            </div>
            </motion.div>



        </motion.div>

        <motion.div
            initial={{opacity:0, y:10}}
            whileInView={{opacity:1, y:0}}
            transition={{duration:0.6, delay:0.6}}
            className='flex flex-col md:flex-row gap-2 items-center justify-between py-6
            text-white/30 text-sm'>
                <p>&copy; {new Date().getFullYear()} CarRental. All rights reserved.</p>
                <ul className='flex items-center gap-6'>
                    <li><a href="#" className='hover:text-white/60 transition-colors'>Privacy</a></li>
                    <li className='text-white/10'>|</li>
                    <li><a href="#" className='hover:text-white/60 transition-colors'>Terms</a></li>
                    <li className='text-white/10'>|</li>
                    <li><a href="#" className='hover:text-white/60 transition-colors'>Contact</a></li>
                </ul>
        </motion.div>
        </motion.div>
  )
}

export default Footer
