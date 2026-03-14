import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {assets} from '../assets/assets'
import Loader from '../components/Loader'
import {useAppContext} from '../context/AppContext.jsx'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const CarDetails = () => {

  const {id} = useParams()
  const{cars, axios, pickupDate, returnDate, setPickupDate, setReturnDate, currency} = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)


  const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
       const{data} = await axios.post('api/booking/create',{
          car: id,
          pickupDate ,
          returnDate
      })

      if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      }else{
        toast.error(data.message)
      }
      } catch (error) {
          toast.error(error.message)


      }
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  },[cars, id])


  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-10 bg-gray-50/50 min-h-screen'>
        <motion.button
        initial={{opacity:0, x:-20}}
        animate={{opacity:1, x:0}}
        transition={{duration:0.4}}
        onClick={()=> navigate(-1)} className='group flex items-center gap-2
        mb-8 text-gray-500 cursor-pointer hover:text-primary transition-colors'>
          <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65
            group-hover:opacity-100 transition-all group-hover:-translate-x-1'/>
          <span className='font-medium'>Back to all cars</span>
        </motion.button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* Left: car image & details */}
            <motion.div
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6}}
            className='lg:col-span-2'>
                <motion.div
                initial={{scale:0.98,opacity:0}}
                animate={{scale:1,opacity:1}}
                transition={{duration:0.5}}
                className='relative rounded-2xl overflow-hidden shadow-xl shadow-dark/10 mb-8'>
                  <img
                  src={car.image} alt="" className='w-full h-auto
                  object-cover'/>
                  <div className='absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent'></div>
                </motion.div>

                <motion.div className='space-y-8'
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:0.2,duration:0.5}}
                >
                  <div>
                    <h1 className='text-4xl font-bold text-dark'>{car.brand} {car.model}</h1>
                    <p className='text-gray-400 text-lg mt-1 font-medium'>{car.category} | {car.year}</p>
                  </div>

                  <div className='w-full h-px bg-gradient-to-r from-transparent via-borderColor to-transparent'></div>

                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                      {[
                        {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
                        {icon: assets.fuel_icon, text: car.fuel_type},
                        {icon: assets.car_icon, text: car.transmisson},
                        {icon: assets.location_icon, text: car.location},
                      ].map(({icon, text}) => (
                        <motion.div
                        initial={{opacity:0, y:10}}
                        animate={{opacity:1, y:0}}
                        transition={{duration:0.4}}
                        key={text} className='flex flex-col items-center bg-white
                        p-5 rounded-2xl border border-gray-100 shadow-sm
                        hover:shadow-md hover:border-primary/20 transition-all duration-300'>
                            <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2'>
                              <img src={icon} alt="" className='h-5' />
                            </div>
                            <span className='text-sm font-semibold text-gray-700'>{text}</span>
                        </motion.div>
                      ))}
                  </div>
                  {/* description */}
                  <div className='bg-white p-6 rounded-2xl border border-gray-100'>
                    <h2 className='text-xl font-bold text-dark mb-3'>Description</h2>
                    <p className='text-gray-500 leading-relaxed'>{car.description}</p>
                  </div>
                  {/* Features */}
                  <div className='bg-white p-6 rounded-2xl border border-gray-100'>
                    <h2 className='text-xl font-bold text-dark mb-4'>Features</h2>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      {
                        ["360 camera" , "Bluetooth", "GPS", "Heated Setats", "Rear View",
                          "Mirror"] .map((item) =>(
                            <li key={item} className='flex items-center text-gray-600 bg-gray-50
                            px-4 py-2.5 rounded-xl'>
                              <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3'>
                                <img src={assets.check_icon} className="h-3" alt="" />
                              </div>
                              <span className='font-medium text-sm'>{item}</span>
                            </li>
                          ))
                      }
                    </ul>
                  </div>
                </motion.div>
            </motion.div>

            {/* Right : Booking form */}
            <motion.form
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{delay:0.3,duration:0.6}}

            onSubmit={handleSubmit} className='bg-white h-max sticky top-18 rounded-2xl p-7 space-y-6
            text-gray-500 border border-gray-100 shadow-xl shadow-dark/5'>

              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-3xl text-dark font-bold'>{currency} {car.pricePerDay}</p>
                  <p className='text-gray-400 text-sm font-medium mt-0.5'>per day</p>
                </div>
                <div className='px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-semibold'>
                  Best Price
                </div>
              </div>

              <div className='w-full h-px bg-gradient-to-r from-transparent via-borderColor to-transparent'></div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="pickup-date" className='font-semibold text-dark text-sm'>Pickup Date</label>
                <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}
                type="date" className='border border-gray-200 px-4 py-3
                rounded-xl bg-gray-50/50 outline-none focus:border-primary focus:ring-2
                focus:ring-primary/10 transition-all' required id='pickup-date' min={new Date().toISOString().
                  split('T')[0]}/>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="return-date" className='font-semibold text-dark text-sm'>Return Date</label>
                <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                type="date" className='border border-gray-200 px-4 py-3
                rounded-xl bg-gray-50/50 outline-none focus:border-primary focus:ring-2
                focus:ring-primary/10 transition-all' required id='return-date'/>
              </div>

              <button className='shimmer-btn w-full bg-gradient-to-r from-primary to-purple-600
              hover:from-primary-dull hover:to-purple-700
              transition-all py-4 font-semibold text-white rounded-xl
              cursor-pointer shadow-lg shadow-primary/25 hover:shadow-primary/40
              active:scale-[0.98] text-base'>Book Now</button>

              <p className='text-center text-xs text-gray-400'>No credit card required to reserve</p>
            </motion.form>
        </div>


    </div>
  ) : <Loader/>
}

export default CarDetails
