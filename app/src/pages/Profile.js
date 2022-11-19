import { FaAngleLeft, FaAngleRight, FaFacebookSquare, FaInstagramSquare, FaQuoteLeft, FaStar, FaTimes, FaTwitterSquare } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import profilepic from '../assets/images/profilepic.jpg'

const Profile = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  useEffect(() => {
    if(!userId){
      navigate("/")
    }
  }, [])

  useEffect(() => {
    if(location.state){
      setAlert({
        show: true,
        header: location.state.message,
        isError: location.state.isError,
      });
    }
  }, [location])

  const handleOpenReview = (i) => {
    
  }

  return (
    <div>
      <section className='flex flex-col w-full min-h-screen '>
        {/* ALERT */}
        {
          alert.show &&
          <div className={`flex items-start justify-between gap-5 w-[30%] border ${ alert.isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} p-4 rounded fixed z-[2] bottom-0 m-5`} role="alert">
            <div>
              <div className="py-1 font-bold">
                {alert.header}
              </div>
              {alert.message}
            </div>
            <FaTimes onClick={()=>{setAlert({...alert, show: false})}} className={`-mt-2 -mr-2 text-2xl  ${ alert.isError ? 'text-red-900' : 'text-green-900'}  cursor-pointer`}/>
          </div>
        }
        
        <MainNavigationBar />
        <div className='flex flex-col min-h-[100vh] '>
          <div className="h-[10vh]"></div>
          <div className="flex min-h-[90vh]">
            {/* 1 */}
            <SideBar />
            {/* 2 */}
            <div className="flex flex-col items-center w-full bg-gray-200">
              <div className="flex flex-col p-10 w-[100%] md:w-[85%] lg:w-[65%] gap-8 bg-gray-100 shadow-white">
                {/* 1 */}
                <div className="flex flex-col w-full gap-5 lg:gap-14 lg:flex-row">
                  <div className="bg-black w-60 h-60 shrink-0">
                    <img src={profilepic} className='w-full ' alt="profilepicture" />
                  </div>
                  <div className="flex flex-col justify-around w-full h-full gap-6 lg:gap-3">
                    <div className="flex flex-col gap-2 text-4xl">
                      {'Mark Edison Rosario'}
                      <div className='text-xs italic'>
                        Registered since <span className='underline '>09/20/2011</span>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm font-bold">
                      <div className="text-gray-600">
                        STATUS:
                      </div>
                      <div className='text-green-400'>
                        ACTIVE
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="text-sm font-bold text-gray-600">
                        SOCIAL MEDIA
                      </div>
                      <div className="flex gap-4 text-4xl ">
                        <FaFacebookSquare className='cursor-pointer hover:text-red-800'/>
                        <FaInstagramSquare className='cursor-pointer hover:text-red-800'/>
                        <FaTwitterSquare className='cursor-pointer hover:text-red-800'/>
                      </div>
                    </div>
                    <div>
                      <Link to={'/main/update'} className='py-1 text-xs bg-red-300 border border-red-500 rounded-full px-7 hover:bg-red-500'>Edit Profile</Link>
                    </div>
                  </div>
                </div>
                {/* 2 */}
                <div className="flex flex-col w-full gap-5 lg:gap-14 lg:flex-row">
                  <div className="flex flex-col w-full gap-5 lg:w-60 shrink-0">
                    <div className='flex items-center'>
                      <div className='pr-1 text-sm font-bold text-gray-500 shrink-0'>INFORMATION</div>
                      <div className='w-full border border-gray-500'></div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Full Name
                      </div>
                      <div>
                        Mark Edison Rosario
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Gender
                      </div>
                      <div>
                        Male
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Age
                      </div>
                      <div>
                        21
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Contact No.
                      </div>
                      <div>
                        09322831560
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Email
                      </div>
                      <div>
                        rosariomark37@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-5 ">
                    <div className='flex items-center'>
                      <div className='pr-1 text-sm font-bold text-gray-500 shrink-0'>ADDRESS</div>
                      <div className='w-full border border-gray-500'></div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Region
                      </div>
                      <div>
                        4A Calabarzon
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Province
                      </div>
                      <div>
                        Laguna
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        City
                      </div>
                      <div>
                        San Pedro
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Barangay
                      </div>
                      <div>
                        Estrella
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold shrink-0'>
                        Full Address
                      </div>
                      <div className='text-right'>
                        <div>
                          B9 L19 P2 Villa Rosa Subv, Brgy Estrella
                        </div>
                        <div>
                          Estrella, City Of San Pedro, Laguna, Region IV-A (CALABARZON)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 3 */}
                <div className="flex flex-col w-full gap-5 lg:gap-14 lg:flex-row">
                  <div className="flex flex-col w-full gap-5 lg:w-60 shrink-0">
                    <div className='flex items-center'>
                      <div className='pr-1 text-sm font-bold text-gray-500 shrink-0'>ABOUT ME</div>
                      <div className='w-full border border-gray-500'></div>
                    </div>
                    <div className='text-sm text-justify'>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-5 ">
                    <div className='flex items-center'>
                      <div className='pr-1 text-sm font-bold text-gray-500 shrink-0'>DONOR PROFILE</div>
                      <div className='w-full border border-gray-500'></div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Blood Group
                      </div>
                      <div>
                        O+
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Donations
                      </div>
                      <div>
                        0
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Rating
                      </div>
                      <div className='flex gap-1'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Health Status
                      </div>
                      <div>
                        Healthy
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Last Donation
                      </div>
                      <div>
                        09-30-2001
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold shrink-0'>
                        Health Conditions
                      </div>
                      <div className='text-right'>
                        None
                      </div>
                    </div>
                  </div>
                </div>
                {/* 4 */}
                <div className="flex flex-col w-full h-full gap-5 ">
                  <div className='flex items-center'>
                    <div className='pr-1 text-sm font-bold text-gray-500 shrink-0'>DONATION HISTORY</div>
                    <div className='w-full border border-gray-500'></div>
                    <div className='flex'>
                      <FaAngleLeft className='text-xl cursor-pointer hover:text-green-500'/>
                      <FaAngleRight className='text-xl cursor-pointer hover:text-green-500'/>
                    </div>
                  </div>
                  {/* <div className='text-sm'>
                    No Records
                  </div> */}
                  <div className='flex flex-wrap justify-around gap-5 text-sm'>
                    {/* 1 */}
                    <div onClick={()=>{handleOpenReview(1)}} className='flex w-[48%] gap-2 p-2 border border-black rounded cursor-pointer shrink-0 hover:bg-gray-200'>
                      <div className='flex items-center justify-center p-2 text-2xl'>
                        <FaQuoteLeft />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='text-sm italic text-justify'>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m
                        </div>
                        <div className='flex gap-1'>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                        <div className='text-xs'>
                          Mark Edison Rosario
                        </div>
                      </div>
                    </div>
                    {/* 2 */}
                    <div className='flex w-[48%] gap-2 p-2 border border-black rounded cursor-pointer shrink-0 hover:bg-gray-200'>
                      <div className='flex items-center justify-center p-2 text-2xl'>
                        <FaQuoteLeft />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='text-sm italic text-justify'>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m
                        </div>
                        <div className='flex gap-1'>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                        <div className='text-xs'>
                          Mark Edison Rosario
                        </div>
                      </div>
                    </div>
                    {/* 3 */}
                    <div className='flex w-[48%] gap-2 p-2 border border-black rounded cursor-pointer shrink-0 hover:bg-gray-200'>
                      <div className='flex items-center justify-center p-2 text-2xl'>
                        <FaQuoteLeft />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <div className='text-sm italic text-justify'>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m
                        </div>
                        <div className='flex gap-1'>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                        <div className='text-xs'>
                          Mark Edison Rosario
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
    </div>
  );
}

export default Profile;