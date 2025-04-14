import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser } from '../features/authSlice';
import axiosInstance from '../api/axiosInstance';

const Navbar = () => {
    let userSlice = useSelector((state)=>state.auth);
    // console.log(userSlice)
    let login = userSlice.login
    const [showDropDown, setshowDropDown] = useState(false);
    let dispatch = useDispatch()

    const [friends, setfriends] = useState([]);

    const handleChanger = async(e)=>{
        let name = e.target.value;
        console.log(name)
        let response = await axiosInstance.get(`/users/getuserName?name=${name}`)
        let data = response.data;
        console.log(data)
        setfriends(data.users)
    }
  return (
    <div className='fixed z-50 top-0 left-0 right-0'>
        <nav className='w-full flex items-center px-8 justify-between bg-white text-black h-[65px]'>
            <Link to={'/'} className='text-xl font-semibold'>Social App</Link>

                  { login===true && <form action="" className='relative'>
                        <input onChange={handleChanger} className='px-3 py-2 rounded border outline-none' type="text" placeholder='search friends..' />
                        <div className='absolute top-full bg-white w-full'>
                            {
                                friends.map((ele,i)=>{
                                    return userSlice.user._id!==ele._id && <Link onClick={()=>setfriends([])} state={ele._id} to={`/friendProfile?name=${ele.firstName}&lastName=${ele.lastName}`} className='flex items-center gap-3 px-3 py-2 border-b border-gray-300'>
                                        <img className='w-7 h-7 rounded-full'  src={ele.profilePic} alt="" />
                                        <p>{ele?.firstName?.concat(' ',ele.lastName)}</p>
                                    </Link>
                                })
                            }
                        </div>
                    </form>}

            <div className='relative'>
                <img onClick={()=>setshowDropDown(!showDropDown)} className='w-[40px] h-[40px] rounded-full border' src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />

               {showDropDown && <ul onClick={()=>setshowDropDown(!showDropDown)} className='absolute top-[125%] min-w-[120px] text-center bg-white text-black right-0 bg-500'>
                    <li className='py-1 px-3'><Link to={'/login'}>Login</Link></li>
                    <li className='py-1 px-3'><Link to={'/signup'}>Signup</Link></li>
                    <li className='py-1 px-3'><Link to={'/userProfile'}>Profile</Link></li>
                    <li className='py-1 px-3'><Link>Settings</Link></li>
                    <li onClick={()=>dispatch(logoutUser())} className='py-1 px-3'><Link>Logout</Link></li>
                </ul>}
            </div>
        </nav>
    </div>
  )
}

export default Navbar
