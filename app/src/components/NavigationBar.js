import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
import { animateScroll, scroller } from 'react-scroll';
import { useEffect, useState } from 'react';

const NavigationBar = () => {
  let location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      scroller.scrollTo(location.hash.slice(1), {
        duration: 500,
        delay: 100,
        smooth: true,
      })
      // console.log('Pathname', location.pathname);
      // console.log('Hash', location.hash.slice(1));
    }else{
      animateScroll.scrollToTop();
    }

    // console.log('Location', location);
  }, [location])

  return (
    <>
      {/* MOBILE NAV MENU HEADER*/}
      <div className='flex items-center w-full bg-blue-300 fixed h-[10vh] md:hidden z-[2] bg-opacity-40 backdrop-blur-sm select-none'>
        {/* BUTTON */}
        <div  className='w-1/4 pl-2 '>
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
        <Link to={'/'} className='text-[40px] h-full flex justify-center items-center shrink-0 w-1/2 '>
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
      <div className={`fixed flex flex-col gap-5 select-none w-full ${!isOpen && 'hidden' } items-center justify-center p-4 bg-blue-100 h-[100vh] md:hidden bg-opacity-40 backdrop-blur-md`}>
        <Link to="/#home" onClick={()=>{setIsOpen(!isOpen)}} className='flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2'>Home</Link>
        <Link to="/#features" onClick={()=>{setIsOpen(!isOpen)}} className='flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2'>Features</Link>
        <Link to="/#contact" onClick={()=>{setIsOpen(!isOpen)}} className='flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2'>Contact</Link>
        <Link to="/#about" onClick={()=>{setIsOpen(!isOpen)}} className='flex items-center gap-1 px-3 py-1 text-2xl cursor-pointer hover:border-red-700 hover:border-b-2'>About</Link>
        {
          location.pathname !== '/login'
          ?
            <Link to={'/login'} className='px-4 py-2 mx-2 text-3xl text-white bg-red-800 rounded-md shadow-sm shadow-black hover:bg-red-900'>
              Login
            </Link>
          :
            <Link to={'/register'} className='px-4 py-2 mx-2 text-3xl text-white bg-red-800 rounded-md shadow-sm shadow-black hover:bg-red-900'>
              Register
            </Link>
        }
      </div>

      {/* HORIZONTAL NAVIGATION BAR */}
      <section className='hidden select-none md:flex items-end justify-start w-full h-[10vh] bg-blue-100 bg-opacity-40 shadow-sm backdrop-blur-md shadow-black fixed ' >
        <Link to={'/'} className='text-[40px] px-4 h-full flex items-center shrink-0 leading-tight'>
          <span className='text-red-700'>
            Blood
          </span>
          <span className='border-b-2 border-blue-600'>
            Link
          </span>
        </Link>
        <div className='flex items-center justify-end w-full h-full gap-2 px-5 py-3'>
          <Link to="/#home" className='flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2'>Home</Link>
          <Link to="/#features" className='flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2'>Features</Link>
          <Link to="/#contact" className='flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2'>Contact</Link>
          <Link to="/#about" className='flex items-center gap-1 px-3 py-1 cursor-pointer hover:border-red-700 hover:border-b-2'>About</Link>
          {
            location.pathname !== '/login'
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