import React, { useEffect, useState } from 'react'
import {assets} from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const {axios, isOwner, currency} = useAppContext()


  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings:0,
    completedBookings:0,
    recentBookings:[],
    monthlyRevenue:0,
  })

  const dashboardCards = [
    {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored, color: 'from-blue-500/10 to-primary/5'},
    {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored, color: 'from-purple-500/10 to-purple-500/5'},
    {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored, color: 'from-amber-500/10 to-amber-500/5'},
    {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored, color: 'from-green-500/10 to-green-500/5'},
  ]

  const fetchDashBoardData = async ()=>{
    try {
      const {data} = await axios.get('/api/owner/dashboard')
      if(data.success){
        setData(data.dashBoardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isOwner){
      fetchDashBoardData()
    }

  },[isOwner])

  return (
    <div className='px-6 pt-10 md:px-10 flex-1'>
        <Title title="Dashboard" subTitle="Monitor overall
        platform performance including total cars, bookings, revenue,
        and recent activities"/>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-5 my-8 max-w-4xl'>
            {dashboardCards.map((card, index)=>(
              <div key={index} className={`flex gap-3 items-center justify-between p-5
              rounded-2xl bg-white border border-gray-100 shadow-sm
              hover:shadow-md transition-all duration-300`}>
                <div>
                  <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>{card.title}</p>
                  <p className='text-2xl font-bold text-dark mt-1'>{card.value}</p>
                </div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.color}`}>
                  <img src={card.icon} alt="" className='h-5 w-5' />
                </div>
              </div>
            ))}
        </div>

        <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
            {/* recent booking */}
          <div className='p-6 bg-white border border-gray-100 rounded-2xl max-w-lg w-full
          shadow-sm'>
            <h2 className='text-lg font-bold text-dark'>Recent Bookings</h2>
            <p className='text-gray-400 text-sm'>Latest customer bookings</p>
            {data.recentBookings.map((booking, index)=>(
              <div key={index} className='mt-4 flex items-center justify-between p-3 rounded-xl
              bg-gray-50/80 hover:bg-gray-50 transition-all'>
                <div className='flex items-center gap-3'>
                  <div className='hidden md:flex items-center justify-center w-11
                  h-11 rounded-xl bg-primary/10'>
                    <img src={assets.listIconColored} alt="" className='h-5 w-5'/>
                  </div>
                  <div>
                    <p className='font-semibold text-dark text-sm'>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-xs text-gray-400'>{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <p className='text-sm font-bold text-dark'>{currency}{booking.price}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${booking.status === 'confirmed' ? 'bg-green-50 text-green-600'
                  : booking.status === 'pending' ? 'bg-amber-50 text-amber-600'
                  : 'bg-red-50 text-red-500'}`}>{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
            {/* monthly revenue */}
          <div className='p-6 mb-6 bg-gradient-to-br from-dark via-[#1a1f4e] to-primary rounded-2xl w-full
          md:max-w-xs shadow-xl shadow-primary/10 text-white'>
            <h2 className='text-lg font-bold'>Monthly Revenue</h2>
            <p className='text-white/40 text-sm'>Revenue for current month</p>
            <p className='text-4xl mt-6 font-bold text-accent'>{currency} {data.monthlyRevenue}</p>
            <div className='w-full h-px bg-white/10 mt-6'></div>
            <p className='text-white/30 text-xs mt-3'>Updated in real-time</p>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
