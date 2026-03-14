import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import {useAppContext} from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'

const Managebooking = () => {

  const {currency, axios} = useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () =>{
    try {
      const {data} = await axios.get('/api/booking/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)

    }
  }

  const changeBookingStatus = async (bookingId, status) =>{
    try {
      const {data} = await axios.post('/api/booking/change-status', {bookingId, status})
      if(data.success){
          toast.success(data.message)
          fetchOwnerBookings()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
      toast.error(error.message)

    }
  }

  useEffect(()=>{
      fetchOwnerBookings()
  },[])
  return (
    <div className='px-6 pt-10 md:px-10 w-full'>
          <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or
          cancel requests, and manage booking statuses"/>

          <div className='max-w-4xl w-full rounded-2xl overflow-hidden border
          border-gray-100 mt-8 bg-white shadow-sm'>

            <table className='w-full border-collapse text-left text-sm text-gray-600'>
              <thead>
                <tr className='bg-gray-50/80'>
                  <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider'>Car</th>
                  <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider max-md:hidden'>Date Range</th>
                  <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider'>Total</th>
                  <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider max-md:hidden'>Payment</th>
                  <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index)=>(
                  <tr key={index} className='border-t border-gray-100 hover:bg-gray-50/50
                  transition-colors duration-200'>
                    <td className='p-4 flex items-center gap-3'>
                      <img src={booking.car.image} alt="" className='h-12 w-12
                      aspect-square rounded-xl object-cover ring-1 ring-gray-100'/>
                      <p className='font-semibold text-dark max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
                    </td>

                    <td className='p-4 max-md:hidden text-gray-500'>
                      {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                    </td>
                    <td className='p-4 font-bold text-dark'>{currency}{booking.price}</td>

                    <td className='p-4 max-md:hidden'>
                      <span className='bg-gray-100 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500'>Offline</span>
                    </td>

                    <td className='p-4'>
                      {booking.status === 'pending' ? (
                        <select onChange={e=>changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='px-3 py-2 text-gray-600 border
                        border-gray-200 rounded-xl outline-none focus:border-primary
                        focus:ring-2 focus:ring-primary/10 transition-all
                        bg-gray-50/50 text-xs font-medium cursor-pointer'>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      ): (
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' ? 'bg-green-50 text-green-600 ring-1 ring-green-100'
                          : 'bg-red-50 text-red-500 ring-1 ring-red-100'
                        }`}>{booking.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
  )
}

export default Managebooking
