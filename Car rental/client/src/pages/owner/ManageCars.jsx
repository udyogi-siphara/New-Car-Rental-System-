import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import {useAppContext} from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'

const ManageCars = () => {

  const {isOwner, axios, currency, cars, setCars} = useAppContext()

  const fetchOwnerCars =  async ()=>{
    try {
      const {data} = await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability =  async (carId)=>{
    try {
      const {data} = await axios.post('/api/owner/toggle-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar =  async (carId)=>{
    try {

      const confirm = window.confirm('Are you sure you want to delete this car?')

      if(!confirm) return null

      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
   isOwner && fetchOwnerCars()
  },[isOwner])

  return (
    <div className='px-6 pt-10 md:px-10 w-full'>
      <Title title="Manage Cars" subTitle="View all listed cars, update their
      details, or remove them from the booking platform"/>

      <div className='max-w-4xl w-full rounded-2xl overflow-hidden border
      border-gray-100 mt-8 bg-white shadow-sm'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead>
            <tr className='bg-gray-50/80'>
              <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider'>Car</th>
              <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider max-md:hidden'>Category</th>
              <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider'>Price</th>
              <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider max-md:hidden'>Status</th>
              <th className='p-4 font-semibold text-dark text-xs uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index)=>(
              <tr key={index} className='border-t border-gray-100 hover:bg-gray-50/50
              transition-colors duration-200'>
                <td className='p-4 flex items-center gap-3'>
                  <img src={car.image} alt="" className='h-12 w-12 aspect-square
                  rounded-xl object-cover ring-1 ring-gray-100'/>
                  <div className='max-md:hidden'>
                    <p className='font-semibold text-dark'>{car.brand} {car.model}</p>
                    <p className='text-xs text-gray-400'>{car.seating_capacity} seats | {car.transmisson}</p>
                  </div>
                </td>

                <td className='p-4 max-md:hidden'>
                  <span className='px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium'>{car.category}</span>
                </td>
                <td className='p-4 font-bold text-dark'>{currency}{car.pricePerDay}<span className='text-gray-400 font-normal'>/day</span></td>

                <td className='p-4 max-md:hidden'>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${car.isAvaliable ? 'bg-green-50 text-green-600 ring-1 ring-green-100' : 'bg-red-50 text-red-500 ring-1 ring-red-100'}`}>
                    {car.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className='flex items-center gap-2 p-4'>
                  <button onClick={()=> toggleAvailability(car._id)}
                    className='w-8 h-8 rounded-lg bg-gray-100 hover:bg-primary/10
                    flex items-center justify-center transition-all cursor-pointer'>
                    <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
                     alt="" className='w-4 h-4'/>
                  </button>

                  <button onClick={()=> deleteCar(car._id)}
                    className='w-8 h-8 rounded-lg bg-gray-100 hover:bg-red-50
                    flex items-center justify-center transition-all cursor-pointer'>
                    <img src={assets.delete_icon}
                     alt="" className='w-4 h-4' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default ManageCars
