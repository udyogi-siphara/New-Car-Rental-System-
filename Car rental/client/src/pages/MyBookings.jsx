import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'


const MyBookings = () => {

const {axios, user, currency} = useAppContext()

const [bookings, setBookings] = useState([])


const fetchMyBookings = async ()=> {
  try {
    const {data} = await axios.get('/api/booking/user')
    if(data.success){
      setBookings(data.bookings)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
 user && fetchMyBookings()
},[user])

  return (
    <motion.div
    initial={{opacity:0, y:30}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.6}}
    className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-16 text-sm
    max-w-7xl min-h-screen bg-gray-50/50'>
          <Title title='My Bookings'
          subTitle='View and manage your car bookings'
          align='left'/>


          <div>
            {bookings.map((booking, index)=> (
              <motion.div
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay:index*0.1, duration:0.4}}

              key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6
              p-6 bg-white border border-gray-100 rounded-2xl mt-5 first:mt-12
              shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300'>
                {/* Car Image + info */}
                <div className='md:col-span-1'>
                    <div className='rounded-xl overflow-hidden mb-3 shadow-sm'>
                      <img src={booking.car.image} alt="" className='w-full h-auto
                      aspect-video object-cover' />
                    </div>
                    <p className='text-lg font-bold text-dark mt-2'>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-gray-400 font-medium'>{booking.car.year} | {booking.car.category} | {booking.car.location}</p>
                </div>

                {/* Booking info */}
                <div className='md:col-span-2'>
                  <div className='flex items-center gap-3'>
                    <p className='px-3 py-1.5 bg-primary/5 text-primary rounded-lg font-semibold text-xs'>
                      Booking #{index+1}
                    </p>
                    <p className={`px-3 py-1.5 text-xs rounded-full font-semibold ${booking.status ===
                      'confirmed' ? 'bg-green-50 text-green-600 ring-1 ring-green-100'
                      : 'bg-red-50 text-red-500 ring-1 ring-red-100'}`}>{booking.status}</p>
                  </div>

                  <div className='flex items-start gap-3 mt-4'>
                    <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5 shrink-0'>
                      <img src={assets.calendar_icon_colored} alt="" className='h-4 w-4'/>
                    </div>
                    <div>
                      <p className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>Rental Period</p>
                      <p className='text-dark font-medium mt-0.5'>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split
                      ('T')[0]}</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3 mt-3'>
                    <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5 shrink-0'>
                      <img src={assets.location_icon_colored} alt="" className='h-4 w-4'/>
                    </div>
                    <div>
                      <p className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>Pick-up Location</p>
                      <p className='text-dark font-medium mt-0.5'>{booking.car.location}</p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3 mt-3'>
                    <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5 shrink-0'>
                      <img src={assets.location_icon_colored} alt="" className='h-4 w-4'/>
                    </div>
                    <div>
                      <p className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>Return Location</p>
                      <p className='text-dark font-medium mt-0.5'>{booking.car.location}</p>
                    </div>
                  </div>
                </div>

                {/* price */}
                <div className='md:col-span-1 flex flex-col justify-between gap-6'>
                  <div className='text-right bg-gradient-to-br from-primary/5 to-purple-500/5
                  p-4 rounded-2xl'>
                    <p className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>Total Price</p>
                    <h1 className='text-3xl font-bold gradient-text mt-1'>{currency}
                    {booking.price}</h1>
                    <p className='text-gray-400 text-xs mt-2'>Booked on {booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
    </motion.div>
  )
}

export default MyBookings
