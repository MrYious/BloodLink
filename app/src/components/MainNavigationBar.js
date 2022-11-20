import { FaHome, FaRegCaretSquareDown, FaSearch, FaSortDown } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { animateScroll } from 'react-scroll';
import profilepic from '../assets/images/profilepic.jpg'

const MainNavigationBar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    animateScroll.scrollToTop();
  }, [location])

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {/* HORIZONTAL NAVIGATION BAR */}
      <section className='select-none flex items-end justify-start w-full h-[10vh] z-[2] bg-blue-100 bg-opacity-70 shadow-sm backdrop-blur-md shadow-gray-400 fixed ' >
        {/* LEFT */}
        <Link to={'/main'} className='text-[30px] md:text-[40px] pl-4 md:px-4 h-full flex items-center shrink-0 leading-tight'>
          <span className='text-red-700'>
            Blood
          </span>
          <span className='border-b-2 border-blue-600'>
            Link
          </span>
        </Link>
        {/* RIGHT */}
        <div className='flex items-center justify-end w-full h-full gap-3 px-5 py-3 text-sm md:text-base'>
          <Link to="/main/search" className='flex items-center gap-3 p-3 border border-black rounded-full cursor-pointer hover:bg-gray-300'>
            <FaSearch className='text-lg md:text-xl' />
            <div>
              Donors
            </div>
          </Link>
          <Link to="/main" className='items-center hidden gap-3 p-3 border border-black rounded-full cursor-pointer md:flex hover:bg-gray-300'>
            <FaHome className='text-lg md:text-xl' />
          </Link>
          <div className="relative flex flex-col gap-5 dropdown">
            <a href="#" className="transition duration-150 ease-in-out dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              <img className='w-12 border border-black rounded-full shadow cursor-pointer shadow-black'  src={profilepic} alt="profilepic" />
              <FaSortDown className='absolute bottom-0 right-0 text-xl'/>
            </a>
            {/* LINKS */}
            <ul className="absolute hidden float-left py-2 text-base text-left list-none bg-gray-200 border-none rounded-lg shadow-sm dropdown-menu min-w-max shadow-black bg-clip-padding" aria-labelledby="dropdownMenuButton2">
              <li className='w-40'>
                <Link to='/main/profile' className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-300">
                  View Profile
                </Link>
              </li>
              <li className='w-40'>
                <Link to='/main/update' className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-300">
                  Edit Profile
                </Link>
              </li>
              <li className='w-40'>
                <div className='border-b-[1px] border-black'></div>
              </li>
              <li className='w-40'>
                <div onClick={handleLogout} className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent cursor-pointer dropdown-item whitespace-nowrap hover:bg-gray-300">
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainNavigationBar;