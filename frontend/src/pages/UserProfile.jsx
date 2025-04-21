import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiCamera } from "react-icons/ci";
import axiosInstance from '../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../features/authSlice';
import PostCard from '../components/PostCard';
import URL from '../../url';
const UserProfile = () => {

    const [allPosts, setallPosts] = useState([]);
    let dispatch = useDispatch()
    let userSlice = useSelector((state)=>state.auth);
    // console.log(userSlice)

    const handleCoverChanger = async(e)=>{
        let file = e.target.files[0];
        console.log(file)
        let formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset',import.meta.env.VITE_UPLOAD_PRESET)

        let response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_Cloudinary_NAME}/upload`,formData);
        let data = response.data;
        console.log(data);
        console.log(data.secure_url);

        let res = await axiosInstance.put('/users/update',{coverPic:data.secure_url})
        let ans = res.data;
        console.log(ans)
        dispatch(fetchUserDetails())

    }
    const handleProfileChanger = async(e)=>{
        let file = e.target.files[0];
        console.log(file)
        let formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset',import.meta.env.VITE_UPLOAD_PRESET)

        let response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_Cloudinary_NAME}/upload`,formData);
        let data = response.data;
        console.log(data);
        console.log(data.secure_url);

        let res = await axiosInstance.put('/users/update',{profilePic:data.secure_url})
        let ans = res.data;
        console.log(ans)
        dispatch(fetchUserDetails())

    }

    const getUserPosts = async()=>{
      let response = await axios.get(URL+'/post/userposts',{
        headers:{
          'Authorization':userSlice.token
        }
      })
      console.log(response)
      let data = response.data;
      // console.log(data)
      setallPosts(data.posts)
    }

    useEffect(()=>{
        if(userSlice?.token){
          // console.log("i am running")
          getUserPosts();
        }
    },[userSlice?.token])
  return (
    <div>
      <div className='w-[90%] relative m-auto h-[350px]  bg-amber-950'>
        <img src={userSlice?.user?.coverPic}  className='w-full h-full object-cover absolute object-center' alt="" />

        <label htmlFor="cover" className='absolute right-3 bottom-3 cursor-pointer'>
            <CiCamera color='white' size={35}  />
            <input onChange={handleCoverChanger} id='cover' hidden type="file" />
        </label>
        <div className='absolute w-[180px] h-[180px] bottom-0 left-12 translate-y-1/2 rounded-full bg-amber-400'>
            <img src={userSlice?.user?.profilePic} alt="" className='w-full h-full object-cover object-center rounded-full'  />

            <label htmlFor="profile" className='absolute right-0 bottom-0 cursor-pointer'>
            <CiCamera color='white' size={30}  />
            <input onChange={handleProfileChanger} id='profile' hidden type="file" />
        </label>
        </div>
      </div>

      <div className='flex justify-center items-center gap-8 my-6'>
        <div className='text-center  rounded  shadow'>
          <p className='font-semibold mb-2'>Followers</p>
          <span>{userSlice?.user?.followers?.length}</span>
        </div>
        <div className='text-center  rounded  shadow'>
          <p className='font-semibold mb-2'>Followings</p>
          <span>{userSlice?.user?.followings?.length}</span>
        </div>
      </div>

      <div className='flex flex-col items-center'>
            {
            allPosts.length>0? allPosts.map((ele,i)=>{
                return <PostCard ele={ele} fetchPosts={getUserPosts} />
              })
              :
              <p className='text-center text-4xl mt-10'>No Post to show</p>
            }
      </div>

    </div>
  )
}

export default UserProfile
