import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { FaTimes } from 'react-icons/fa';
import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import e from "cors";
import profilepic from '../assets/images/profilepic.jpg'

const UpdateProfile = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

  const [tab, setTab] = useState(1)
  const [userProfile, setUserProfile] = useState({
    user: {
      id: 1,
      firstname: "",
      lastname: "",
      middlename: "",
      gender: "",
      age: 0,
      mobileNumber: "",
      email: "",
      status: "",
      profilePicture: null,
      bloodGroup: "",
      shortBio: "",
      linkFB: null,
      linkIG: null,
      linkTW: null,
      createdAt: "",
    },
    address: {
      region: "",
      province: "",
      city: "",
      barangay: "",
      addressLine1: "",
      addressLine2: "",
    },
    donorInfo: {
      avgRating: 0,
      totalDonations: 0,
      healthStatus: "",
      healthConditions: "",
      lastDonation: "",
    },
    acceptDonorReq: {

    },
    allReviews: {

    }
  });

  const [tabAccount, setTabAccount] = useState({
    status: 'Active',
  })
  const [tabPersonal, setTabPersonal] = useState({
    firstName: 'Active',
    lastName: 'Active',
    gender: 'Active',
    age: 'Active',
    contact: 'Active',
    email: 'Active',
    bio: '',
  })
  const [tabAddress, setTabAddress] = useState({
    region: 'Active',
    province: 'Active',
    city: 'Active',
    barangay: 'Active',
    line1: 'Active',
    line2: 'Active',
  })
  const [tabSocial, setTabSocial] = useState({
    facebook: 'Active',
    instagram: 'Active',
    twitter: 'Active',
  })
  const [tabHealth, setTabHealth] = useState({
    bloodGroup: 'Active',
    status: 'Active',
    conditions: 'Active',
  })

  const [modalContent, setModalContent] = useState({
  })

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  useEffect(() => {
    if(!userId){
      navigate("/");
    }else{
      const data = {
        id: userId,
      }
      let endpoint = contextData.link + 'api/getUserByID';
      axios.post(endpoint, {data})
      .then(function (response) {
        // console.log("Load UserProfile Success", response.data);
        // console.log(JSON.stringify(response.data.userProfile));
        setUserProfile(response.data.userProfile);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: error.response.data.message,
          isError: true,
        });
      });
    }
  }, [])

  const handleUpdateProfile = (e) => {
    e.preventDefault();
  }

  return (
    <section className='flex flex-col w-full min-h-screen '>
      {/* ALERT */}
      {
        alert.show &&
        <div className={`flex items-start justify-between gap-5 w-[90%] md:w-[40%] lg:w-[30%]  border ${ alert.isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} p-4 rounded fixed z-[2] bottom-0 m-5`} role="alert">
          <div>
            <div className="py-1 font-bold">
              {alert.header}
            </div>
            {alert.message}
          </div>
          <FaTimes onClick={()=>{setAlert({...alert, show: false})}} className={`-mt-2 -mr-2 text-2xl  ${ alert.isError ? 'text-red-900' : 'text-green-900'}  cursor-pointer`}/>
        </div>
      }
      {/* MODAL */}
      {showModal && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Donor Review
                </h3>
                <FaTimes onClick={() => setShowModal(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col p-6 text-sm md:flex-row ">
                {/* HERE */}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      <MainNavigationBar />
      <div className='flex flex-col min-h-[100vh] '>
        <div className="h-[10vh]"></div>
        <div className="flex min-h-[90vh]">
          {/* 1 */}
          <SideBar />
          {/* 2 */}
          <div className="flex justify-center w-full bg-gray-100 ">
            <div className="flex flex-col md:flex-row justify-start items-start w-[100%] md:w-[85%] lg:w-[65%] gap-5">
              {/* Tabs */}
              <div className="flex flex-col gap-2 p-5 bg-gray-50 drop-shadow-xl w-72 shrink-0">
                <div className="py-2 font-bold">
                  Edit Profile Information
                </div>
                <div className="flex flex-col gap-2 text-sm font-semibold">
                  <div onClick={() => {setTab(1)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 1 && 'text-red-600 bg-gray-300' }`}>
                    Account
                  </div>
                  <div onClick={() => {setTab(2)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 2 && 'text-red-600 bg-gray-300' }`}>
                    Personal
                  </div>
                  <div onClick={() => {setTab(3)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 3 && 'text-red-600 bg-gray-300' }`}>
                    Address
                  </div>
                  <div onClick={() => {setTab(4)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 4 && 'text-red-600 bg-gray-300' }`}>
                    Social Media
                  </div>
                  <div onClick={() => {setTab(5)}} className={`p-2 rounded cursor-pointer hover:bg-gray-300 hover:text-red-600 ${tab === 5 && 'text-red-600 bg-gray-300' }`}>
                    Health Status
                  </div>
                </div>
              </div>
              {/* Body */}
              <form  className="flex flex-col w-full gap-2 p-5 bg-gray-50 drop-shadow-xl ">
                {
                  tab  === 1 ?
                  <>
                    <div className="py-2 font-bold">
                      Account
                    </div>
                    <div className="flex flex-col gap-2 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between ">
                        <div className="font-semibold ">
                          Status
                        </div>
                        <select value={tabAccount.status} onChange={(e)=>{setTabAccount({...tabAccount, status: e.target.value })}} className="outline-none cursor-pointer" required >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </> :
                  tab  === 2 ?
                  <>
                    <div className="py-2 font-bold">
                      Account
                    </div>
                    <div className="flex flex-col gap-2 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between ">
                        <div className="font-semibold ">
                          Status
                        </div>
                        <select value={tabAccount.status} onChange={(e)=>{setTabAccount({...tabAccount, status: e.target.value })}} className="outline-none cursor-pointer" required >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </> :
                  tab  === 3 ?
                  <>
                    <div className="py-2 font-bold">
                      Account
                    </div>
                    <div className="flex flex-col gap-2 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between ">
                        <div className="font-semibold ">
                          Status
                        </div>
                        <select value={tabAccount.status} onChange={(e)=>{setTabAccount({...tabAccount, status: e.target.value })}} className="outline-none cursor-pointer" required >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </> :
                  tab  === 4 ?
                  <>
                    <div className="py-2 font-bold">
                      Account
                    </div>
                    <div className="flex flex-col gap-2 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between ">
                        <div className="font-semibold ">
                          Status
                        </div>
                        <select value={tabAccount.status} onChange={(e)=>{setTabAccount({...tabAccount, status: e.target.value })}} className="outline-none cursor-pointer" required >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </> :
                  tab  === 5 &&
                  <>
                    <div className="py-2 font-bold">
                      Account
                    </div>
                    <div className="flex flex-col gap-2 p-2 text-sm">
                      {/* 1 */}
                      <div className="flex justify-between ">
                        <div className="font-semibold ">
                          Status
                        </div>
                        <select value={tabAccount.status} onChange={(e)=>{setTabAccount({...tabAccount, status: e.target.value })}} className="outline-none cursor-pointer" required >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </>
                }
                {/* Actions */}
                <div className="flex justify-end gap-2 text-sm">
                  <button onClick={handleUpdateProfile} className="px-3 py-2 text-white bg-red-700 rounded-full hover:bg-red-900">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateProfile;