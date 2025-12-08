import React, { useContext, useState } from 'react'
import logo from 'logo.svg'
import { AuthContext } from '@/context/AuthProvider';

const Nav = () => {
    const {user,loading} = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <div className='p-4 border-b border-gray-200 flex flex-row items-center justify-between'>
            <div>
                <img src={logo} alt="KrishiNetra Logo" className='h-10 w-auto'/>
                <h1 className='text-2xl font-bold text-gray-800 mt-2'>KrishiNetra</h1>
            </div>
            {user ? 
                <>
                <div>{user.userId.role} Dashboard</div>
                <div className='mt-2 flex flex-row gap-2 '>
                    <div onClick={() => setOpenDropdown(!openDropdown)}>
                        <p>{user.userId.name}</p>
                        {openDropdown &&
                            <div className='absolute bg-white border border-gray-200 rounded-md shadow-lg mt-2 right-4'>
                                <button className='block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left'>Profile</button>
                                <button className='block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left'>Logout</button>
                            </div>
                        }
                    </div>
                </div>
                </>
                :
                <div className='flex flex-row'>
                    <button className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors mr-2'>Login</button>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors'>Sign Up</button>
                </div>
            }   
        </div>
    )
}

export default Nav