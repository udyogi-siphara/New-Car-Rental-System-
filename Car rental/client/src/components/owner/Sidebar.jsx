import React, {useState} from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx'
import toast from 'react-hot-toast';

const Sidebar = () => {

  const {user, axios,fetchUser} = useAppContext();
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async ()=>{
    try {
      const formData =  new FormData()
      formData.append('image', image)

      const {data} = await axios.post('/api/owner/update-image',
         formData)

      if(data.success){
        fetchUser()
        toast.success(data.message)
        setImage('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='relative min-h-screen md:flex flex-col items-center
    pt-8 max-w-13 md:max-w-64 w-full bg-dark-card border-r border-white/5 text-sm'>

      <div className='group relative'>
        <label htmlFor="image">
          <img src={image ? URL.createObjectURL(image) : user?.image || assets.user_profile } alt="profile" className='h-9 md:h-16 w-9 md:w-16 rounded-full mx-auto object-cover ring-2 ring-primary/30' />
          <input type="file" id="image" accept='image/*' hidden onChange={e =>
            setImage(e.target.files[0])}/>

            <div className='absoulte hidden top-0 right-0 left-0 bottom-0
            bg-black/10 rounded-full group-hover:flex
            items-center justify-center cursor-pointer'>
              <img src={assets.edit_icon} alt="" />
            </div>
        </label>
      </div>
       {image && (
        <button className='absolute top-2 right-2 flex px-3 py-1.5 gap-1.5 items-center
        bg-primary text-white text-xs rounded-lg cursor-pointer font-medium
        shadow-lg shadow-primary/30' onClick={updateImage}>Save
        <img src={assets.check_icon} width={13} alt="" className='brightness-200'/></button>
       )}

       <p className='mt-3 text-base max-md:hidden text-white font-medium'>{user?.name}</p>
       <p className='text-xs text-white/40 max-md:hidden'>Car Owner</p>

       <div className='w-full mt-6'>
        {ownerMenuLinks.map((link, index) => (
            <NavLink key={index} to={link.path} className={`relative flex
            items-center gap-3 w-full py-3.5 pl-5 transition-all duration-200
            ${link.path === location.pathname ?
            'bg-primary/15 text-primary border-r-[3px] border-primary' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}>
              <img src={link.path === location.pathname ? link.coloredIcon : link.
                icon} alt="car icon" className={link.path !== location.pathname ? 'brightness-200 opacity-50' : ''} />
                <span className='max-md:hidden font-medium'>{link.name}</span>
            </NavLink>
        ))}
       </div>
    </div>
  )
}

export default Sidebar
