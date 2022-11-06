import { FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll'

const NavigationBar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* MOBILE NAV MENU HEADER*/}
      <div className='flex items-center w-full p-4 bg-blue-300 fixed min-h-[10vh] md:hidden z-[2] bg-opacity-40 backdrop-blur-sm select-none'>
        {/* BUTTON */}
        <div  className='w-1/4'>
          <div className='p-2 cursor-pointer w-fit' onClick={()=>{setIsOpen(!isOpen)}}>
            {
              isOpen
              ?
                <FaTimes className='text-4xl text-red-900'/>
              :
                <FaBars className='text-4xl text-red-900'/>
            }
          </div>
        </div>
        <Link to={'/'} className='text-[40px] h-full flex justify-center shrink-0 w-1/2 '>
          <span className='text-red-700'>
            Blood
          </span>
          <span className='border-b-2 border-blue-600 '>
            Link
          </span>
        </Link>
        <div className='w-1/4 '>
        </div>
      </div>

      {/* MOBILE NAV MENU LINKS */}
      <div className={`fixed flex flex-col gap-5 w-full ${!isOpen && 'hidden' } items-center justify-center p-4 bg-blue-100 h-[100vh] md:hidden bg-opacity-40 backdrop-blur-md`}>
        <ScrollLink
          activeClass="border-b-2 border-red-700 text-3xl"
          to={'home'}
          spy={true}
          smooth={true}
          duration={500}
          className="flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2"
          onClick={()=>{setIsOpen(!isOpen)}}
        >
          Home
        </ScrollLink>
        <ScrollLink
          activeClass="border-b-2 border-red-700 text-3xl"
          to={'features'}
          spy={true}
          smooth={true}
          duration={500}
          className="flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2"
          onClick={()=>{setIsOpen(!isOpen)}}
        >
          Features
        </ScrollLink>
        <ScrollLink
          activeClass="border-b-2 border-red-700 text-3xl"
          to={'contact'}
          spy={true}
          smooth={true}
          duration={500}
          className="flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2"
          onClick={()=>{setIsOpen(!isOpen)}}
        >
          Contact
        </ScrollLink>
        <ScrollLink
          activeClass="border-b-2 border-red-700 text-3xl"
          to={'about'}
          spy={true}
          smooth={true}
          duration={500}
          className="flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2"
          onClick={()=>{setIsOpen(!isOpen)}}
        >
          About
        </ScrollLink>
        {
          isLogin
          ?
            <Link to={'/login'} className='px-4 py-2 mx-2 text-3xl text-white bg-red-800 rounded-md shadow-sm shadow-black hover:bg-red-900'>
              Login
            </Link>
          :
            <Link to={'/register'} className='px-4 py-2 mx-2 text-xl text-white bg-red-800 rounded-md shadow-sm shadow-black hover:bg-red-900'>
              Register
            </Link>
        }
      </div>

      {/* HORIZONTAL NAVIGATION BAR */}
      <section className='hidden md:flex items-end justify-start w-full h-[10vh] bg-transparent shadow-sm backdrop-blur-sm shadow-black fixed ' >
        <Link to={'/'} className='text-[40px] px-4 h-full flex items-center shrink-0 leading-tight'>
          <span className='text-red-700'>
            Blood
          </span>
          <span className='border-b-2 border-blue-600'>
            Link
          </span>
        </Link>
        <div className='flex items-center justify-end w-full h-full gap-2 px-5 py-3'>
          <ScrollLink
            activeClass="border-b-2 border-red-700 text-lg"
            to={'home'}
            spy={true}
            smooth={true}
            duration={500}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2"
          >
            Home
          </ScrollLink>
          <ScrollLink
            activeClass="border-b-2 border-red-700 text-lg"
            to={'features'}
            spy={true}
            smooth={true}
            duration={500}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2"
          >
            Features
          </ScrollLink>
          <ScrollLink
            activeClass="border-b-2 border-red-700 text-lg"
            to={'contact'}
            spy={true}
            smooth={true}
            duration={500}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2"
          >
            Contact
          </ScrollLink>
          <ScrollLink
            activeClass="border-b-2 border-red-700 text-lg"
            to={'about'}
            spy={true}
            smooth={true}
            duration={500}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2"
          >
            About
          </ScrollLink>
          {
            isLogin
            ?
              <Link to={'/login'} className='px-4 py-2 mx-2 text-xl text-white bg-red-800 rounded-md shadow-sm shadow-black hover:bg-red-900'>
                Login
              </Link>
            :
              <Link to={'/register'} className='px-4 py-2 mx-2 text-xl text-white bg-red-800 rounded-md shadow-sm shadow-black hover:bg-red-900'>
                Register
              </Link>
          }
        </div>
      </section>
    </>
  );
}

export default NavigationBar;