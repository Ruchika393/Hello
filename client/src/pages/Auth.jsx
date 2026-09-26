import React from 'react';
import axios from 'axios';
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, provider } from "../utils/firebase"
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auth({isModel = false}) {
  const dispatch = useDispatch() 

  const handleGoogleAuth = async () => {
    try {
       console.log("GOOGLE BUTTON CLICKED");
      const response = await signInWithPopup(auth, provider);
       console.log("GOOGLE LOGIN SUCCESS:", response.user);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(ServerUrl+"/api/auth/google", { name, email }, { withCredentials: true });
        console.log("BACKEND LOGIN SUCCESS:", result.data);

      dispatch(setUserData(result.data));
    
    } catch (error) {
      console.error("Error during Google authentication:", error);
      setUserData(null); // Clear user data on error
    }
  };

  return (
    <div className = 'w-full min-h-screen bg-[#f3f3f3] flex justify-center items-center px-6 py-20'>
        <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05}}
        className = 'w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200'>
       <div className='flex items-center justify-center gap-3 mb-5 mt-3'>
        <div className='bg-black text-white p-2 rounded-lg'>
           <BsRobot size={18} />
        </div>
        <h2 className='text-xl font-bold '>InterviewAI</h2>
       </div>
       <h1 className='text-2xl md:text-3xl font-semibold text-center leading-sung mb-4'>Continue With {" "}<span className='bg-green-100 text-green-800 px-3 py-1 rounded-full inline-flex items-center gap-2'>
        <IoSparkles size={16} />
        AI Smart Interview
        </span></h1>

        <p className='text-center text-gray-600 text-sm md:text-base mb-8 ml-2 mr-2'>
          Sign in to start your AI interview journey, and get ready to ace your next interview with confidence!
        </p>

        <motion.button 
        onClick = {handleGoogleAuth}
        whileHover={{ scale: 1.03, opacity: 0.9 }}
        className='w-full flex items-center justify-center bg-black text-white gap-3 py-3 rounded-full shadow-md font-semibold hover:bg-green-800 transition-colors'>
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>
        </motion.div>
       
    </div>
  )
}

export default Auth