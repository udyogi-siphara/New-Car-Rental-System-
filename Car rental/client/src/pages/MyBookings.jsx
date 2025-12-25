import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../assets/assets'
import Title from '../components/Title'

const MyBookings = () => {

const [bookings, setBookings] = useState([])

const fetchMyBookings = async ()=> {
  setBookings(dummyMyBookingsData)
}

useEffect(()=>{
  fetchMyBookings()
},[])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm
    max-w-7xl'>
          <Title title='My Bookings'
          subTitle='View and manage your car bookings'
          align='left'/>  


          <div>
            {bookings.map((booking, index)=> (
              <div key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6
              p-6 border border-borderColor rounded-lg mt-5 first:mt-12'>
                {/* Car Image + info */}
              </div>
            ))}
          </div>
    </div>
  )
}

export default MyBookings