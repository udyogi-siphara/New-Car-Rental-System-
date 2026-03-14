import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'


const Cars = () => {

  // getting search paarms from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {axios, cars} = useAppContext()

  const [input, setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async () =>{
    if(input === ''){
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmisson.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    try {
      const {data} = await axios.post('/api/booking/check-availability',
        {location: pickupLocation, pickupDate, returnDate}
      )
      if(data.success){
        setFilteredCars(data.availableCars)
        if(data.availableCars.length === 0){
          toast('No cars available for these dates')
        }
        return null
      }
    } catch (error) {
      // Fallback: filter from loaded cars by location if API fails
      const locationFiltered = cars.filter(
        (car) => car.location?.toLowerCase() === pickupLocation?.toLowerCase() && car.isAvaliable
      )
      setFilteredCars(locationFiltered)
      if(locationFiltered.length === 0){
        toast('No cars available for these dates')
      }
    }
  }

  useEffect(() =>{
    if(isSearchData && cars.length > 0) {
      searchCarAvailability()
    }
  },[cars])


  useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter()
  },[input, cars])

  return (
    <div className='bg-gray-50/50 min-h-screen'>
    <motion.div
     initial={{opacity:0, y:30}}
     animate={{opacity:1, y:0}}
     transition={{duration:0.6, ease:'easeOut'}}

      className='flex flex-col items-center py-20 pb-12 bg-gradient-to-b from-dark to-dark/95
      max-md:px-4 relative overflow-hidden'>

        {/* Background decorations */}
        <div className='absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]'></div>

        <div className='relative z-10'>
          <div className='text-center'>
            <h1 className='font-bold text-4xl md:text-[42px] text-white leading-tight'>Available Cars</h1>
            <div className='w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-4 mb-3 mx-auto'></div>
            <p className='text-sm md:text-base text-white/40 mt-1 max-w-lg mx-auto leading-relaxed'>
              Browse our selection of premium vehicles available for your next adventure
            </p>
          </div>
        </div>

        <motion.div
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.3,duration:0.5}}
        className='relative z-10 flex items-center bg-white/[0.07] backdrop-blur-sm border border-white/10
        px-5 mt-8 max-w-xl w-full h-13 rounded-full'>
          <img src={assets.search_icon} alt="" className='w-5 h-5 mr-3 brightness-200 opacity-40' />

          <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features'
          className='w-full h-full outline-none text-white bg-transparent placeholder-white/30'/>

          <img src={assets.filter_icon} alt="" className='w-5 h-5 ml-3 brightness-200 opacity-40' />


        </motion.div>
      </motion.div>

      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.6,duration:0.5}}
      className='px-6 md:px-16 lg:px-24 xl:px-32 py-10'>
          <p className='text-gray-400 xl:px-20 max-w-7xl mx-auto font-medium text-sm'>
            Showing <span className='text-primary font-semibold'>{ filteredCars.length }</span> Cars
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6
          xl:px-20 max-w-7xl mx-auto'>
            {filteredCars.map((car,index)=> (
              <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay:0.1*index,duration:0.4}}
              >
                <CarCard car={car}/>
              </motion.div>
            ))}

          </div>
      </motion.div>
    </div>
  )
}

export default Cars
