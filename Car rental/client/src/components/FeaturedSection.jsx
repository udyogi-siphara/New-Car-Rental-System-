// import React from 'react'
// import Title from './Title'
// import { assets, dummyCarData } from '../assets/assets'
// import CarCard from './CarCard'
// import { useNavigate } from 'react-router-dom'

// const FeaturedSection = () => {

//     const navigate = useNavigate()

//   return (
//     <div className='flex flex-vol items-center py-24 px-6 md:px-16
//     lg-px-24 xl:px-32'>

//         <div>
//             <Title title='Feartured Vahicles' subTitle='Explore our 
//             selection of premium vehicles available for your next
//             adventure.' />        
            
//         </div>

//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
//             {
//                 dummyCarData.slice(0,6).map((car) => (
//                     <div key={car.id}>
//                         <CarCard car={car}/>
//                     </div>
//                 ))
//             }
//         </div>

//         <button onClick={()=> {
//             navigate('/cars'); scrollTo(0,0)
//         }} 
//         className='flex items-center justify-center gap-2 px-6 py-2 border
//         border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
//             Explore all cars <img src={assets.arrow_icon} alt='arrow'/>
//         </button>

//     </div>
//   )
// }

// export default FeaturedSection


import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import {useAppContext} from '../context/AppContext.jsx'
import {motion} from 'motion/react'

const FeaturedSection = () => {

  const navigate = useNavigate()
  const {cars} = useAppContext();

  return (
    <motion.div 
    initial={{opacity:0, y:40}}
    whileInView={{opacity:1, y:0}}
    transition={{duration:1, ease:'easeOut'}}
    className="w-full flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-to-b from-white to-gray-50">

      {/* Section Title */}
      <motion.div 
      initial={{opacity:0, y:20}}
      whileInView={{opacity:1, y:0}}
      transition={{duration:1, delay:0.5}}
      className="text-center max-w-2xl">
        <Title 
          title="Featured Vehicles"
          subTitle="Explore a curated selection of premium vehicles perfect for your next adventure."
        />
      </motion.div>

      {/* Cars Grid */}
      <motion.div 
      initial={{opacity:0, y:100}}
      whileInView={{opacity:1, y:0}}
      transition={{delay:0.5, duration:1}}
      
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 w-full">
        {cars.slice(0, 6).map((car) => (
          <motion.div 
          initial={{opacity:0, scale:0.95}}
          whileInView={{opacity:1, scale:1}}
          transition={{duration:0.4, ease:"easeOut"}}
          key={car._id} >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      {/* Explore All Button */}
      <motion.button
        initial={{opacity:0, y:20}}
        whileInView={{opacity:1, y:0}}
        transition={{delay:0.6, duration:0.4}}

        onClick={() => {
          navigate('/cars')
          scrollTo(0, 0)
        }}
        className="flex items-center justify-center gap-3 px-7 py-3 mt-16 rounded-xl border border-gray-300 
                   hover:bg-gray-100 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
      >
        <span className="font-medium text-gray-700 text-lg">Explore All Cars</span>
        <img src={assets.arrow_icon} alt="arrow" className="w-5 h-5" />
      </motion.button>

    </motion.div>
  )
}

export default FeaturedSection
