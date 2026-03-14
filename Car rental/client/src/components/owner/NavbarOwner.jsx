import React from 'react'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const NavbarOwner = () => {

  const {user} = useAppContext();

  return (
    <div className='flex items-center justify-between px-6
    md:px-10 py-4 text-white/80 bg-dark border-b border-white/5
    relative transition-all'>
        <Link to='/'>
          <img src={assets.logo} alt="" className='h-8 brightness-200' />
        </Link>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600
          flex items-center justify-center text-white text-sm font-bold'>
            {user?.name?.charAt(0)?.toUpperCase() || 'O'}
          </div>
          <p className='text-white/60 text-sm'>Welcome, <span className='text-white font-medium'>{user?.name || "owner"}</span></p>
        </div>
    </div>
  )
}

export default NavbarOwner
