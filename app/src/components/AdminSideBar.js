import { FaSignOutAlt, FaUsers, FaUserCog, FaThLarge, FaEdit, FaUserEdit, FaEnvelope, FaInbox } from 'react-icons/fa';

import { Link, useNavigate } from "react-router-dom";
import profilepic from '../assets/images/profilepic.jpg'
import { useState } from "react";

const AdminSideBar = () => {
    const navigate = useNavigate();
    const adminID = localStorage.getItem('adminID');
    const isMaster = localStorage.getItem('isMaster');
    const username = localStorage.getItem('username');
    const profile = localStorage.getItem('profile');

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            {/* 0 */}
            <div className="flex flex-col w-[300px] shrink-0"></div>
            {/* 1 */}
            <div className={`flex flex-col p-2 w-[300px] gap-1 bg-gray-50 drop-shadow-xl border-r-[1px] z-[1] h-full shrink-0 fixed border-gray-400`}>
                <div className='py-2'>
                    <div className='text-[30px] md:text-[40px] pl-4 md:px-4 flex items-center shrink-0 leading-tight'>
                        <span className='text-red-700'>
                            Blood
                        </span>
                        <span className='border-b-2 border-blue-600'>
                            Link
                        </span>
                    </div>
                </div>
                <div className="flex items-center h-12 gap-2 my-2 rounded">
                    <div className='flex items-center justify-center w-16 h-full shrink-0'>
                        <img className='border border-black rounded-full shadow w-14 h-14 shadow-black'  src={ profile ? profile : profilepic} alt="profilepic" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className=''>{username}</div>
                        <div className='font-bold'>Administrator{isMaster && ' - Master'}</div>
                    </div>
                </div>
                <div className='flex flex-col py-2'>
                    <Link to={'/admin/dashboard'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                        <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                            <FaThLarge className='text-xl'/>
                        </div>
                        <div>
                            Dashboard
                        </div>
                    </Link>
                    <Link to={'/admin/content'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                        <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                            <FaEdit className='text-xl'/>
                        </div>
                        <div>
                            Featured Contents
                        </div>
                    </Link>
                    <Link to={'/admin/message'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                        <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                            <FaEnvelope className='text-xl'/>
                        </div>
                        <div>
                            Contact Us Messages
                        </div>
                    </Link>
                    <Link to={'/admin/manage/requests'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                        <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                            <FaInbox className='text-xl'/>
                        </div>
                        <div>
                            Moderate Requests
                        </div>
                    </Link>
                    <Link to={'/admin/manage/users'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                        <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                            <FaUserEdit className='text-xl'/>
                        </div>
                        <div>
                            Moderate Users
                        </div>
                    </Link>
                    {
                        isMaster && <Link to={'/admin/manage/accounts'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                            <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                                <FaUsers className='text-xl'/>
                            </div>
                            <div>
                                Manage Administrators
                            </div>
                        </Link>
                    }
                    <div>
                        <div className='h-[1px] border border-gray-600'></div>
                    </div>
                    <Link to={'/admin/account'} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                        <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                            <FaUserCog className='text-xl '/>
                        </div>
                        <div>
                            Account Settings
                        </div>
                    </Link>
                    <div onClick={handleLogout} className="flex items-center h-12 gap-2 rounded cursor-pointer hover:bg-gray-300">
                        <div className='flex items-center justify-center h-full text-gray-700 w-14 shrink-0'>
                            <FaSignOutAlt className='text-xl '/>
                        </div>
                        <div>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSideBar;