import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [showDropDown, setshowDropDown] = useState(false);
  return (
    <div className='sticky top-0 left-0 right-0'>
        <nav className='w-full flex items-center px-8 justify-between bg-white text-black h-[65px]'>
            <Link to={'/'} className='text-xl font-semibold'>Social App</Link>

                    <form action="">
                        <input className='px-3 py-2 rounded border outline-none' type="text" placeholder='search friends..' />
                    </form>

            <div className='relative'>
                <img onClick={()=>setshowDropDown(!showDropDown)} className='w-[40px] h-[40px] rounded-full border' src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />

               {showDropDown && <ul className='absolute top-[125%] min-w-[120px] text-center bg-white text-black right-0 bg-500'>
                    <li className='py-1 px-3'><Link to={'/login'}>Login</Link></li>
                    <li className='py-1 px-3'><Link to={'/signup'}>Signup</Link></li>
                    <li className='py-1 px-3'><Link>Profile</Link></li>
                    <li className='py-1 px-3'><Link>Settings</Link></li>
                </ul>}
            </div>
        </nav>
    </div>
  )
}

export default Navbar
