import { FaAngleDoubleRight, FaBars, FaTimes } from 'react-icons/fa';

import { Link } from "react-router-dom";
import profilepic from '../assets/images/profilepic.jpg'
import { useState } from "react";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userId = localStorage.getItem('userID');
    const fname = localStorage.getItem('fname');
    const lname = localStorage.getItem('lname');
    const profile = localStorage.getItem('profile');

    return (
        <>
            {/* 0 */}
            <div className="flex flex-col w-[70px] shrink-0"></div>
            {/* 1 */}
            <div onMouseEnter={() => {setIsOpen(true)}} onClick={() => {setIsOpen(true)}} onMouseLeave={() => {setIsOpen(false)}}  className={`flex flex-col p-2 ${isOpen ? 'w-[300px]' : 'w-[70px] items-center'}  bg-gray-200 h-full shrink-0 none fixed border-r-[1px] border-black`}>
                <Link to={'/main/profile'} className="flex items-center gap-2 mb-3 rounded cursor-pointer h-14 hover:bg-gray-300">
                    <div className='flex items-center justify-center h-full w-14 shrink-0'>
                        <img className='w-full border border-black rounded-full shadow cursor-pointer shadow-black'  src={ profile ? profile : profilepic} alt="profilepic" />
                    </div>
                    {
                        isOpen &&
                        <div>
                            {fname + ' ' + lname}
                        </div>
                    }
                </Link>
                <Link to={'/main/requests'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                    <div className='flex items-center justify-center h-full w-14 shrink-0'>
                        <FaAngleDoubleRight className='text-2xl'/>
                    </div>
                    {
                        isOpen &&
                        <div>
                            Your Pending Requests
                        </div>
                    }
                </Link>
                <Link to={'/main/active'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                    <div className='flex items-center justify-center h-full w-14 shrink-0'>
                        <FaAngleDoubleRight className='text-2xl'/>
                    </div>
                    {
                        isOpen &&
                        <div>
                            Active Requests
                        </div>
                    }
                </Link>
                <Link to={'/main/history/completed'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                    <div className='flex items-center justify-center h-full w-14 shrink-0'>
                        <FaAngleDoubleRight className='text-2xl'/>
                    </div>
                    {
                        isOpen &&
                        <div>
                            Completed Requests
                        </div>
                    }
                </Link>
                <Link to={'/main/history/cancelled'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                    <div className='flex items-center justify-center h-full w-14 shrink-0'>
                        <FaAngleDoubleRight className='text-2xl'/>
                    </div>
                    {
                        isOpen &&
                        <div>
                            Cancelled Requests
                        </div>
                    }
                </Link>
                <Link to={'/main/history/declined'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                    <div className='flex items-center justify-center h-full w-14 shrink-0'>
                        <FaAngleDoubleRight className='text-2xl'/>
                    </div>
                    {
                        isOpen &&
                        <div>
                            Declined Requests
                        </div>
                    }
                </Link>
            </div>
        </>
    );
}

export default SideBar;