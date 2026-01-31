// import React from 'react'
// import { assets } from '../assets/assets'

// const CarCard = ({car}) => {

//     const currency = import.meta.env.VITE_CURRENCY

//   return (
//     <div className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1
//     transition-all duration-500 cursor-pointer'>
//         <div className='relative h-48 overflow-hidden'>
//             <img src={car.image} alt="car image" className='w-full h-full object -cover transition-transform
//             duration-500 group-hover:scale-105'/>

//             {car.isAvailable && <p className='absoulte top-4 left-4 bg-primary/90
//             tet-white text-xs px-2.5 py-1 rounded-full'>Available Now</p>}

//             <div className='absolute bottm-4 right-4 bg-black/80 backdrop-blur-sm
//             text-white px-3 py-2 rounded-lg '>
//                 <span className='font-semibold'>{currency}{car.pricePerDay}</span>
//                 <span className='text-sm text-white/80'> / day</span>

//             </div>
//         </div>
//         <div className='p-4 sm:p-5'> 
//             <div className='flex justify-between items-start mb-2'>
//                 <div>
//                     <h3 className='text-lg font-medium'>{car.brand} {car.model}</h3>
//                     <p className='text-muted-foreground text-sm'>{car.category} . {car.year}</p>
//                 </div>
//             </div>
//             <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>
//                 <div className='flex items-center text-sm text-muted-foreground'>
//                     <img src={assets.users_icon} alt="" className='h-4 mr-2' />
//                     <span>{car.seating_capacity} Seats</span>
//                 </div>
//                 <div className='flex items-center text-sm text-muted-foreground'>
//                     <img src={assets.fuel_icon} alt="" className='h-4 mr-2' />
//                     <span>{car.fuel_type} Seats</span>
//                 </div>
//                 <div className='flex items-center text-sm text-muted-foreground'>
//                     <img src={assets.car_icon} alt="" className='h-4 mr-2' />
//                     <span>{car.transmisson} Seats</span>
//                 </div>
//                 <div className='flex items-center text-sm text-muted-foreground'>
//                     <img src={assets.location_icon} alt="" className='h-4 mr-2' />
//                     <span>{car.location} Seats</span>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CarCard



import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {

  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <div onClick={() => {navigate(`/car-details/${car._id}`); scrollTo(0,0)}} className="
      group rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white
      transition-all duration-500 cursor-pointer border border-gray-100
      hover:-translate-y-2
    ">

      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">

        <img 
            src={car.image}
            alt="car"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {car.isAvaliable && (
            <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs 
                            px-3 py-1 rounded-full z-20 shadow-lg">
            Available Now
            </span>
        )}

        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg shadow-md z-20">
            <span className="font-semibold text-lg">{currency} {car.pricePerDay}</span>
            <span className="text-sm text-gray-300 ml-1">/day</span>
        </div>

        </div>

      {/* Content Section */}
      <div className="p-5">

        {/* Car Name */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-500 text-sm">
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        {/* Car Specs */}
        <div className="mt-4 grid grid-cols-2 gap-y-3 text-gray-600 text-sm">

          <div className="flex items-center">
            <img src={assets.users_icon} className="w-4 h-4 mr-2 opacity-70" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center">
            <img src={assets.fuel_icon} className="w-4 h-4 mr-2 opacity-70" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center">
            <img src={assets.car_icon} className="w-4 h-4 mr-2 opacity-70" />
            <span>{car.transmisson}</span>
          </div>

          <div className="flex items-center">
            <img src={assets.location_icon} className="w-4 h-4 mr-2 opacity-70" />
            <span>{car.location}</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CarCard
