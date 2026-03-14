import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import {useAppContext} from '../context/AppContext.jsx'
import {motion} from 'motion/react'

const hero = () => {

  const  [pickupLocation, setPickupLocation] = useState('')

  const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext();

  const handleSearch = (e)=>{
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate='
        + pickupDate + '&returnDate=' + returnDate
    )
  }

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration: 0.8}}
    className='relative pt-20 pb-10 min-h-screen flex flex-col items-center justify-center gap-10
    bg-dark text-center overflow-hidden'>

        {/* Background decorative elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]'></div>
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]'></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]'></div>
        </div>

        {/* Badge */}
        <motion.div
        initial={{y: 30, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration: 0.6, delay: 0.1}}
        className='relative z-10 flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm'>
            <span className='w-2 h-2 bg-green-400 rounded-full pulse-glow'></span>
            <span className='text-white/70 text-sm font-medium'>Premium Car Rentals in Sri Lanka</span>
        </motion.div>

        <motion.h1
        initial={{y: 50, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration: 0.8, delay: 0.2}}
        className='relative z-10 text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight'>
          Drive Your <span className='gradient-text'>Dream Car</span> Today
        </motion.h1>

        <motion.p
        initial={{y: 30, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration: 0.8, delay: 0.3}}
        className='relative z-10 text-white/50 text-lg max-w-xl -mt-4'>
          Choose from our curated collection of luxury and everyday vehicles at unbeatable prices
        </motion.p>

    <motion.form
    initial={{scale: 0.95, opacity:0, y: 50}}
    animate={{scale: 1, opacity:1, y: 0}}
    transition={{duration:0.8, delay: 0.4}}
    onSubmit={handleSearch} className='relative z-10 flex flex-col md:flex-row items-start md:items-center
    justify-between p-4 md:p-3 rounded-2xl md:rounded-full w-full max-w-80 md:max-w-[820px]
    bg-white/[0.07] backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20'>

        <div className='flex flex-col md:flex-row items-start md:items-center
        gap-6 md:gap-0 md:divide-x md:divide-white/10 w-full md:w-auto'>
            <div className='flex flex-col items-start gap-1 px-5 py-2'>
                <label className='text-white/40 text-xs font-semibold uppercase tracking-wider'>Location</label>
                <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}
                  className='bg-transparent text-white outline-none text-sm w-full min-w-[140px] cursor-pointer
                  [&>option]:text-gray-800 [&>option]:bg-white'>
                    <option value="">Select city</option>
                    {cityList.map((city)=> <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
            <div className='flex flex-col items-start gap-1 px-5 py-2'>
                <label htmlFor="pickup-date" className='text-white/40 text-xs font-semibold uppercase tracking-wider'>Pick-up</label>
                <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" name='' id='pickup-date' min={new Date().toISOString().
                split('T')[0]} className='bg-transparent text-white text-sm outline-none
                [color-scheme:dark] cursor-pointer' required/>
            </div>
            <div className='flex flex-col items-start gap-1 px-5 py-2'>
                <label htmlFor="return-date" className='text-white/40 text-xs font-semibold uppercase tracking-wider'>Return</label>
                <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" name='' id='return-date'
                className='bg-transparent text-white text-sm outline-none
                [color-scheme:dark] cursor-pointer' required/>
            </div>
        </div>

        <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        className='shimmer-btn flex items-center justify-center gap-2 px-8 py-3.5
            max-sm:mt-4 max-sm:w-full bg-gradient-to-r from-primary to-purple-600
            text-white rounded-full font-semibold text-sm
            cursor-pointer shadow-lg shadow-primary/30'>
                <img src={assets.search_icon} alt="search" className='brightness-300 w-4 h-4' />
                Search Cars
        </motion.button>
    </motion.form>

    <motion.img
        initial={{y: 100, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration: 0.8, delay: 0.6}}
        src={assets.main_car} alt="car" className='relative z-10 max-h-72 float-animation drop-shadow-2xl' />

    {/* Bottom gradient fade */}
    <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent'></div>
    </motion.div>
  )
}

export default hero
