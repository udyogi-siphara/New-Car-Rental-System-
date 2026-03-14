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
    className="w-full flex flex-col items-center py-28 px-6 md:px-16 lg:px-24 xl:px-32
    bg-white relative overflow-hidden">

      {/* Background decorations */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-[80px]'></div>
      <div className='absolute bottom-0 left-0 w-72 h-72 bg-purple-500/[0.03] rounded-full blur-[80px]'></div>

      {/* Section Title */}
      <motion.div
      initial={{opacity:0, y:20}}
      whileInView={{opacity:1, y:0}}
      transition={{duration:1, delay:0.5}}
      className="text-center max-w-2xl relative z-10">
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

      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full relative z-10">
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
        className="group flex items-center justify-center gap-3 px-8 py-4 mt-16 rounded-full
                   bg-dark text-white font-semibold text-[15px]
                   hover:bg-primary transition-all duration-300
                   shadow-lg shadow-dark/20 hover:shadow-primary/30
                   cursor-pointer relative z-10"
      >
        <span>Explore All Cars</span>
        <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4 brightness-200
          group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>

    </motion.div>
  )
}

export default FeaturedSection
