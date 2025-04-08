import axios from 'axios';
import React from 'react'
import { CiCamera } from "react-icons/ci";
import axiosInstance from '../api/axiosInstance';
import { useSelector } from 'react-redux';

const UserProfile = () => {

    let userSlice = useSelector((state)=>state.auth);
    console.log(userSlice)

    const handleCoverChanger = async(e)=>{
        let file = e.target.files[0];
        console.log(file)
        let formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset','social12-2')

        let response = await axios.post('https://api.cloudinary.com/v1_1/dsf7eyovf/upload',formData);
        let data = response.data;
        console.log(data);
        console.log(data.secure_url);

        let res = await axiosInstance.put('/users/update',{coverPic:data.secure_url})
        let ans = res.data;
        console.log(ans)


    }
  return (
    <div>
      <div className='w-[90%] relative m-auto h-[350px]  bg-amber-950'>
        <img src={userSlice?.user?.coverPic}  className='w-full h-full object-cover absolute object-center' alt="" />

        <label htmlFor="cover" className='absolute right-3 bottom-3 cursor-pointer'>
            <CiCamera color='white' size={35}  />
            <input onChange={handleCoverChanger} id='cover' hidden type="file" />
        </label>
        <div className='absolute w-[180px] h-[180px] bottom-0 left-12 translate-y-1/2 rounded-full bg-amber-400'>
            <img src={'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2hpcHBvdW5pY29ybl9hX2Z1bGxfZmllcnlfZHJhZ29uX2hlYWRfb25fYmxhY2tfYmFja2dyb3VuZF9pbl90aF9lY2I5YTZlOS01N2ZkLTRjMDYtYjIwZS05N2U3ZTk0ZmQxNDYuanBn.jpg'} alt="" className='w-full h-full object-cover object-center rounded-full'  />

            <label htmlFor="profile" className='absolute right-0 bottom-0 cursor-pointer'>
            <CiCamera color='white' size={30}  />
            <input id='profile' hidden type="file" />
        </label>
        </div>
      </div>



    </div>
  )
}

export default UserProfile
