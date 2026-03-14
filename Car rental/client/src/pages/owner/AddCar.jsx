import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import {useAppContext} from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'

const AddCar = () => {

  const {axios,currency, fetchCars} = useAppContext();

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay:0,
    category:'',
    transmisson:'',
    fuel_type:'',
    seating_capacity:0,
    location:'',
    description:'',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e)=>{
    e.preventDefault()

    if(isLoading) return null

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('api/owner/add-car', formData)

      if(data.success){
        toast.success(data.message)
        await fetchCars()
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay:0,
          category:'',
          transmisson:'',
          fuel_type:'',
          seating_capacity:0,
          location:'',
          description:'',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='px-6 py-10 md:px-10 flex-1'>
      <Title title="Add New Car" subTitle="Fill in details to list a new car for
      booking, including pricing, availability, and car specifications." />

      <form onSubmit={onSubmitHandler} className='flex flex-col
      gap-6 text-gray-600 text-sm mt-8 max-w-2xl bg-white p-8 rounded-2xl
      border border-gray-100 shadow-sm'>
        {/* car image */}
        <div className='flex items-center gap-4 w-full'>
          <label htmlFor="car-image" className='cursor-pointer'>
            <div className={`w-20 h-20 rounded-2xl border-2 border-dashed
            flex items-center justify-center overflow-hidden transition-all
            ${image ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:border-primary/50'}`}>
              <img src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="" className={`${image ? 'w-full h-full object-cover' : 'h-8 opacity-40'}`} />
            </div>
            <input type="file" id="car-image" accept='image/*' hidden onChange={e=>
              setImage(e.target.files[0])}/>
          </label>
          <div>
            <p className='font-semibold text-dark'>Upload Car Image</p>
            <p className='text-xs text-gray-400 mt-0.5'>JPG, PNG or WebP. Max 5MB</p>
          </div>
        </div>

        {/* car brand & model */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Brand</label>
            <input type="text" placeholder='e.g. BMW, Mercedes, Audi...' required
            className='px-4 py-3 border border-gray-200 rounded-xl
            outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all bg-gray-50/50' value={car.brand} onChange={e=> setCar({...car, brand: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Model</label>
            <input type="text" placeholder='e.g. X5, E-class, M4...' required
            className='px-4 py-3 border border-gray-200 rounded-xl
            outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all bg-gray-50/50' value={car.model} onChange={e=> setCar({...car, model: e.target.value})}/>
          </div>
        </div>

        {/* car year, price, category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Year</label>
            <input type="number" placeholder='2025' required
            className='px-4 py-3 border border-gray-200 rounded-xl
            outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all bg-gray-50/50' value={car.year} onChange={e=> setCar({...car, year: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Daily Price ({currency})</label>
            <input type="number" placeholder='100' required
            className='px-4 py-3 border border-gray-200 rounded-xl
            outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all bg-gray-50/50' value={car.pricePerDay} onChange={e=> setCar({...car, pricePerDay: e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Category</label>
            <select onChange={e=> setCar({...car, category: e.target.value})} value={car.category}
              className='px-4 py-3 border border-gray-200
              rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              transition-all bg-gray-50/50 cursor-pointer'>
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* car transmisson, fuel type, seating capacity*/}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5'>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Transmission</label>
            <select onChange={e=> setCar({...car, transmisson: e.target.value})} value={car.transmisson}
              className='px-4 py-3 border border-gray-200
              rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              transition-all bg-gray-50/50 cursor-pointer'>
              <option value="">Select a transmisson</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Fuel Type</label>
            <select onChange={e=> setCar({...car, fuel_type: e.target.value})} value={car.fuel_type}
              className='px-4 py-3 border border-gray-200
              rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              transition-all bg-gray-50/50 cursor-pointer'>
              <option value="">Select a fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Gas">Gas</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Seating Capacity</label>
            <input type="number" placeholder='4' required
            className='px-4 py-3 border border-gray-200 rounded-xl
            outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all bg-gray-50/50' value={car.seating_capacity} onChange={e=> setCar({...car, seating_capacity: e.target.value})}/>
          </div>
        </div>

        {/* Car location */}
        <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Location</label>
            <select onChange={e=> setCar({...car, location: e.target.value})} value={car.location}
              className='px-4 py-3 border border-gray-200
              rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
              transition-all bg-gray-50/50 cursor-pointer'>
              <option value="">Select a location</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Badulla">Badulla</option>
              <option value="Monaragala">Monaragala</option>
              <option value="Bibile">Bibile</option>
            </select>
        </div>
        {/* Car Description */}
        <div className='flex flex-col w-full'>
            <label className='font-semibold text-dark mb-1.5'>Description</label>
            <textarea rows={5} placeholder='e.g. Describe your car, its condition, and any notable details...' required
            className='px-4 py-3 border border-gray-200 rounded-xl
            outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all bg-gray-50/50 resize-none' value={car.description} onChange={e=> setCar({...car, description: e.target.value})}></textarea>
        </div>
        <button className='flex items-center justify-center gap-2 px-6 py-3.5 mt-2
        bg-gradient-to-r from-primary to-purple-600
        hover:from-primary-dull hover:to-purple-700
        text-white rounded-xl font-semibold w-max cursor-pointer
        shadow-lg shadow-primary/25 hover:shadow-primary/40
        active:scale-[0.98] transition-all'>
          <img src={assets.tick_icon} alt="" className='brightness-200' />
        {isLoading ? 'Listing...' : 'List Your Car'}
        </button>
      </form>
    </div>
  )
}

export default AddCar
