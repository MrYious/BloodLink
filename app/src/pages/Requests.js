import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { FaTimes } from 'react-icons/fa';
import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";

const Requests = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

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

  return (
    <div className='bg-blue-50'>
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
            <div className="flex w-full bg-green-300">
              <div className="flex flex-col w-full text-center">
                Add Content Here
              </div>
              <div className="flex flex-col w-[25%] p-5 shrink-0">
                <div className='flex items-center h-[40vh] border border-black'>
                  Content
                </div>
                <div className='flex items-center h-[40vh] border border-black'>
                  Content
                </div>
                <div className='flex items-center h-[40vh] border border-black'>
                  Content
                </div>
                <div className='flex items-center h-[40vh] border border-black'>
                  Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Requests;