import axios from 'axios';
import React, { useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from '../components/LoaderComponent';
import { setLogin } from '../features/authSlice';


const Login = () => {

  let dispatch  = useDispatch()
    let authSlice = useSelector((state)=>state.auth)
    let loading = authSlice.loading
    
    // console.log(loading)

    const [showPassword, setshowPassword] = useState(false);
    const [details, setdetails] = useState({
   
        email:"",
        password:""
    });


    const handleSubmit = async(e)=>{
        e.preventDefault()
        // console.log(details)
        try {
        
          let response = await axiosInstance.post('/users/login',details)
          console.log(response)
          if(response.status==200){
              dispatch(setLogin({user:response.data.user, login:true, token:response.data.token}))
          }
          console.log(response)
        //   console.log(response.data)
          toast.success(response.data.msg,{position:'top-center'})
        } catch (error) {
                console.log(error)
                toast.error(error.response?error.response.data.msg:'something went wrong',{position:'top-center'})
        }
    }
    return (
        // loading===true?<LoaderComponent/>:
        <div className='flex  justify-center items-center  bg-amber-300 h-full'>
            <div className='h-full w-1/2'>
                <img className='w-full h-full object-cover object-center' src="https://www.designmantic.com/blog/wp-content/uploads/2016/07/social-media-cover-image.png" alt="" />
            </div>
            <form className='bg-white w-1/2 text-black p-5 h-full'>
              
             
                    <div className='gap-3 mb-2'>
                        <label className='mb-2' htmlFor="">Email</label> <br />
                        <input onChange={(e)=>setdetails({...details,[e.target.name]:e.target.value})} name='email' className='px-3 w-full border py-2 rounded outline-none' type="email" required />
                    </div>
                    <div className='gap-3 mb-2'>
                        <label className='mb-2' htmlFor="">Password</label> <br />
                       <div className='relative flex'>
                       <input onChange={(e)=>setdetails({...details,[e.target.name]:e.target.value})} name='password' className='px-3 w-full border py-2 rounded outline-none' type={showPassword?'text':'password'} required />
                       <IoEyeOutline onClick={()=>setshowPassword(!showPassword)} className='cursor-pointer absolute right-2 top-[50%] -translate-y-[50%]'/>
                       </div>

                    </div>
                        <Link className='text-blue-400 text-end block my-2'  to={'/forget-password'}>forgot password?</Link>
                    <button onClick={handleSubmit} className='bg-green-500 rounded-md px-3 py-2 w-full hover:bg-green-600 hover:text-white'>Login</button>
             
                    <p className='text-center my-2'>Don't have an account?  <Link className='text-blue-500' to={'/signup'}>register</Link></p>


            </form>
        </div>
    )
}

export default Login
