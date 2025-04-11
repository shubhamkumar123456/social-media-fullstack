import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiCamera } from "react-icons/ci";
import axiosInstance from '../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../features/authSlice';
import PostCard from '../components/PostCard';
import { Link, useLocation } from 'react-router-dom';

const UserProfile = () => {


    let location = useLocation()
   

    const friendId = location.state

  
    let dispatch = useDispatch()
    let userSlice = useSelector((state) => state.auth);
    // console.log(userSlice)
    const [friend, setfriend] = useState("");
    console.log(friend)
    const [friendPosts, setfriendPosts] = useState([]);


    const getFriend = async () => {
        let response = await axiosInstance.get(`/users/friend/${friendId}`,{
            headers:{
                'Authorization':userSlice.token
            }
        });
        let data = response.data;
        console.log(data)
        setfriend(data.friend)
        setfriendPosts(data.friendPost)

    }
    useEffect(() => {
        getFriend()
    }, [])


    const handleFollow = async()=>{
        let response = await axiosInstance.put(`/users/follow/${friend._id}`);
        let data = response.data
        console.log(data)
        if(data){
            getFriend();
            dispatch( fetchUserDetails())
           
        }
    }





  
    return (
        <div>
            <div className='w-[90%] relative m-auto h-[350px]  bg-amber-950'>
                <img src={friend?.coverPic} className='w-full h-full object-cover absolute object-center' alt="" />


                <div className='absolute w-[180px] h-[180px] bottom-0 left-12 translate-y-1/2 rounded-full bg-amber-400'>
                    <img src={friend?.profilePic} alt="" className='w-full h-full object-cover object-center rounded-full' />
                    <p className='font-semibold text-xl text-center'>{friend?.firstName?.concat(' ',friend?.lastName)}</p>
                </div>
            </div>

            <div className='grid sm:grid-cols-4 grid-cols-2 w-max m-auto items-center gap-8 lg:mt-6 mt-36 my-6'>
                <div className='text-center  rounded  shadow'>
                    <p className='font-semibold mb-2'>Followers</p>
                    <span>{friend?.followers?.length}</span>
                </div>
                <div className='text-center  rounded  shadow'>
                    <p className='font-semibold mb-2'>Followings</p>
                    <span>{friend?.followings?.length}</span>
                </div>
                <div className='text-center  rounded  shadow'>
                    {
                        userSlice?.user?.followings?.includes(friend._id)?        <button onClick={handleFollow} className='bg-orange-500 px-4 py-2 rounded hover:bg-green-700'>UnFollow</button>
                         :
                        <button onClick={handleFollow} className='bg-orange-500 px-4 py-2 rounded hover:bg-green-700'>Follow</button>
                    }
                    
            
                </div>
                <div>
                <Link  className='bg-blue-500 px-4 py-2 rounded hover:bg-blue-700'>Chat</Link>
                </div>
            </div>

            <div className='flex flex-col items-center'>
                {
                    friendPosts.length > 0 ? friendPosts.map((ele, i) => {
                        return <PostCard ele={ele} fetchPosts={getFriend} />
                    })
                        :
                        <p className='text-center text-4xl mt-10'>No Post to show</p>
                }
            </div>

        </div>
    )
}

export default UserProfile
