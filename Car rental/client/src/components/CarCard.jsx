import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {

  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <div onClick={() => {navigate(`/car-details/${car._id}`); scrollTo(0,0)}} className="
      group rounded-2xl overflow-hidden bg-white
      transition-all duration-500 cursor-pointer
      border border-gray-100
      hover:shadow-2xl hover:shadow-primary/10
      hover:-translate-y-3
    ">

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">

        <img
            src={car.image}
            alt="car"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay on hover */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

        {car.isAvaliable && (
            <span className="absolute top-4 left-4 bg-green-500 text-white text-xs
                            px-3 py-1.5 rounded-full z-20 font-semibold flex items-center gap-1.5
                            shadow-lg shadow-green-500/30">
              <span className='w-1.5 h-1.5 bg-white rounded-full animate-pulse'></span>
              Available
            </span>
        )}

        <div className="absolute bottom-4 right-4 bg-dark/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl shadow-xl z-20
          border border-white/10">
            <span className="font-bold text-lg">{currency} {car.pricePerDay}</span>
            <span className="text-xs text-white/60 ml-1">/day</span>
        </div>

        </div>

      {/* Content Section */}
      <div className="p-6">

        {/* Car Name */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors duration-300">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-400 text-sm mt-0.5 font-medium">
              {car.category} &bull; {car.year}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-borderColor to-transparent mb-4'></div>

        {/* Car Specs */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">

          <div className="flex items-center gap-2.5 text-gray-500">
            <div className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center'>
              <img src={assets.users_icon} className="w-4 h-4 opacity-70" />
            </div>
            <span className='font-medium'>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-500">
            <div className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center'>
              <img src={assets.fuel_icon} className="w-4 h-4 opacity-70" />
            </div>
            <span className='font-medium'>{car.fuel_type}</span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-500">
            <div className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center'>
              <img src={assets.car_icon} className="w-4 h-4 opacity-70" />
            </div>
            <span className='font-medium'>{car.transmisson}</span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-500">
            <div className='w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center'>
              <img src={assets.location_icon} className="w-4 h-4 opacity-70" />
            </div>
            <span className='font-medium'>{car.location}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CarCard
