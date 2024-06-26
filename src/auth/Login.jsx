import React, { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Contextpage from '../Contextpage';

function Login() {
    
    const { GoogleLogin } = useContext(Contextpage);

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500">
            <div 
                className='border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black hover:bg-opacity-20 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg'
                onClick={GoogleLogin}
            >
                <FcGoogle className='text-3xl' />
                <h1 className='text-white font-semibold'>Sign in with Google</h1>
            </div>
        </div>
    )
}

export default Login
