import React, { useRef } from 'react'
import axiosInstance from '../api/axiosInstance'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
    let inputRef = useRef()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let value = inputRef.current.value;
        console.log(value)
try {
    
    let response = await axiosInstance.post('/users/reset-password',{email:value})
    console.log(response)
        let data = response.data;
        console.log(data)
        toast.success(data.msg,{position:'top-center'})
        if(response.status==200){
            inputRef.current.value = ""
        }
} catch (error) {
        console.log(error)
}



    }
  return (
    <div className='mt-32'>
        <form action="" className='flex flex-col gap-4 items-center '>
            <h4 className='font-bold'>Forget password Page</h4>
            <div className='flex md:flex-row flex-col'>
            <input ref={inputRef} className='border px-4 py-2 rounded-md' type="text" placeholder='enter your email' />
            <button onClick={handleSubmit} className='bg-green-400 mx-1 px-3 py-2 rounded-md hover:bg-green-500'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default ForgetPassword
