import {useState} from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin, axios, setToken, navigate} = useAppContext()

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`, {name,
                email, password})

                if(data.success) {
                    navigate('/')
                    setToken(data.token)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
        } catch (error) {
            toast.error(error.message)
        }

    }

  return (
    <div onClick={()=> setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center
        text-sm bg-dark/70 backdrop-blur-sm'>

        <form onSubmit={onSubmitHandler} onClick={(e) =>e.stopPropagation()} className="flex flex-col gap-5 m-auto items-start
        p-8 py-10 w-[360px] sm:w-[400px]
         text-gray-500 rounded-2xl shadow-2xl shadow-primary/10
         border border-gray-100 bg-white">

            <div className='w-full text-center mb-2'>
              <p className="text-3xl font-bold text-dark">
                  {state === "login" ? "Welcome Back" : "Create Account"}
              </p>
              <p className='text-gray-400 mt-2 text-sm'>
                {state === "login" ? "Sign in to access your bookings" : "Join us and start renting today"}
              </p>
            </div>

            {state === "register" && (
                <div className="w-full">
                    <p className='font-medium text-dark mb-1.5'>Name</p>
                    <input onChange={(e) => setName(e.target.value)}
                    value={name} placeholder="Enter your name"
                    className="border border-gray-200 rounded-xl w-full px-4 py-3
                    outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
                    transition-all bg-gray-50/50"
                    type="text" required />
                </div>
            )}
            <div className="w-full">
                <p className='font-medium text-dark mb-1.5'>Email</p>
                <input onChange={(e) => setEmail(e.target.value)}
                value={email} placeholder="Enter your email"
                className="border border-gray-200 rounded-xl w-full px-4 py-3
                outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
                transition-all bg-gray-50/50"
                type="email" required />
            </div>
            <div className="w-full">
                <p className='font-medium text-dark mb-1.5'>Password</p>
                <input onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className="border border-gray-200 rounded-xl w-full px-4 py-3
                outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
                transition-all bg-gray-50/50"
                type="password" required />
            </div>
            {state === "register" ? (
                <p className='text-gray-400'>
                    Already have an account? <span onClick={() => setState("login")}
                    className="text-primary font-semibold cursor-pointer hover:underline">Sign In</span>
                </p>
            ) : (
                <p className='text-gray-400'>
                    Don't have an account? <span onClick={() => setState("register")}
                    className="text-primary font-semibold cursor-pointer hover:underline">Sign Up</span>
                </p>
            )}
            <button className="bg-gradient-to-r from-primary to-purple-600
            hover:from-primary-dull hover:to-purple-700 transition-all text-white
            w-full py-3.5 rounded-xl cursor-pointer font-semibold text-base
            shadow-lg shadow-primary/25 hover:shadow-primary/40
            active:scale-[0.98]">
                {state === "register" ? "Create Account" : "Sign In"}
            </button>
        </form>
    </div>
  )
}

export default Login
