import React, { useState } from 'react'
import {assets, menuLinks} from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Navbar = () => {

    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async ()=>{
        try {
           const {data} = await axios.post('/api/owner/change-role')
            if(data.success){
                setIsOwner(true)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <motion.nav
    initial={{y: -20, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration: 0.5}}
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32
     py-5 relative transition-all z-50
     ${location.pathname === "/"
       ? "bg-dark text-white/90 border-b border-white/5"
       : "bg-white text-gray-700 border-b border-borderColor shadow-sm"}`}>

        <Link to='/'>
            <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="logo" className={`h-9 ${location.pathname === "/" ? "brightness-200" : ""}`}/>
        </Link>
        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-[68px]
        max-sm:border-t right-0 flex flex-col sm:flex-row
        items-start sm:items-center gap-1 sm:gap-8 max-sm:p-6 transition-all duration-300 z-50
        ${location.pathname === "/"
          ? "max-sm:bg-dark max-sm:border-white/10"
          : "max-sm:bg-white max-sm:border-borderColor"}
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
            {menuLinks.map((link,index)=>(
                <Link key={index} to={link.path}
                  className={`py-2 sm:py-0 text-[15px] font-medium transition-all duration-200 relative
                  ${location.pathname === link.path
                    ? "text-primary"
                    : location.pathname === "/"
                      ? "hover:text-white text-white/70"
                      : "hover:text-primary text-gray-600"}
                  ${location.pathname === link.path ? "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : ""}
                  `}>
                    {link.name}
                </Link>
            ))}

            <div className={`hidden lg:flex items-center text-sm gap-2 border
            px-4 py-2 rounded-full max-w-56 transition-all
            ${location.pathname === "/"
              ? "border-white/15 bg-white/5 text-white/80 placeholder-white/40"
              : "border-borderColor bg-gray-50"}`}>
                <input type="text" className={`py-0.5 w-full bg-transparent
                outline-none ${location.pathname === "/" ? "placeholder-white/40" : "placeholder-gray-400"}`}
                placeholder='Search cars...'/>
                <img src={assets.search_icon} alt="search" className={`w-4 h-4 ${location.pathname === "/" ? "brightness-200 opacity-60" : "opacity-40"}`} />
            </div>
            <div className='flex max-sm:flex-col items-start sm:items-center gap-4 sm:gap-5 max-sm:mt-4'>
                <button onClick={() => isOwner ? navigate('/owner') :
                    changeRole()}
                    className={`cursor-pointer font-medium text-[15px] transition-all
                    ${location.pathname === "/"
                      ? "text-accent hover:text-accent-light"
                      : "text-primary hover:text-primary-dull"}`}>
                    {isOwner ? 'Dashboard' : 'List Cars'}
                </button>

                <button onClick={() => {user ? logout() : setShowLogin(true)}}
                className='cursor-pointer px-7 py-2.5 bg-gradient-to-r from-primary to-purple-600
                hover:from-primary-dull hover:to-purple-700 transition-all text-white rounded-full
                font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40
                hover:scale-[1.02] active:scale-[0.98]'>
                    {user ? 'Logout' : 'Get Started'}
                </button>
            </div>
        </div>

        <button className='sm:hidden cursor-pointer' aria-label='Menu' onClick={() =>
        setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu"
              className={location.pathname === "/" ? "brightness-200" : ""} />
        </button>
    </motion.nav>
  )
}

export default Navbar
