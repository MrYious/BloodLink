import { FaAngleLeft, FaAngleRight, FaFacebookSquare, FaInstagramSquare, FaQuoteLeft, FaStar, FaTimes, FaTwitterSquare } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import profilepic from '../assets/images/profilepic.jpg'

const Profile = () => {
  // USE THIS PAGE ON OTHER PERSON'S PROFILE
  // TODO: MAP REVIEWS, LINK MODALS AND OTHER PERSON's PROFILE
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

  const [isOtherUser, setIsOtherUser] = useState(false);
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

  const [modalContent, setModalContent] = useState({
    donor: {
      id: '',
      name: 'Mark Edison Rosario',
    },
    seeker: {
      id: '',
      name: 'Tessia Eralith',
    },
    date: '2022-11-11',
    comment: 'He is very helpful, a good person.',
    rating: 4,
    image: '',
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
    setShowModal(true);
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
                    Modal Title
                  </h3>
                  <FaTimes onClick={() => setShowModal(false)} className='text-xl cursor-pointer ' />
                </div>
                {/*body*/}
                <div className="flex flex-col p-6 text-sm">
                  <p className="leading-relaxed text-slate-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae minima sed nemo assumenda veritatis, sit quaerat consectetur. At, dolores. Facilis quidem aperiam unde quod nesciunt ullam, amet adipisci est quae quo libero! Aspernatur ut nisi quidem vero culpa facere inventore vitae eligendi provident? Quasi, cupiditate, magnam, numquam labore tenetur quo iure deleniti amet veniam inventore consequatur accusamus veritatis nam adipisci? Provident, ex ducimus ab, consequuntur sit, nihil perspiciatis veritatis voluptates laborum asperiores dolorum. Placeat nam eum quidem quos sed perferendis dolor illum a! Reprehenderit perferendis, at facilis suscipit ipsam commodi porro similique eaque a doloremque earum. Eius atque ab fuga!
                  </p>
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
            <div className="flex flex-col items-center w-full bg-gray-200">
              <div className="flex flex-col p-10 w-[100%] md:w-[85%] lg:w-[65%] gap-8 bg-gray-100 shadow-white">
                {/* 1 */}
                <div className="flex flex-col w-full gap-5 lg:gap-14 lg:flex-row">
                  <div className="bg-black w-60 h-60 shrink-0">
                    <img src={userProfile.user.profilePicture ? userProfile.user.profilePicture : profilepic} className='w-full ' alt="profilepicture" />
                  </div>
                  <div className="flex flex-col justify-around w-full h-full gap-6 lg:gap-3">
                    <div className="flex flex-col gap-2 text-4xl">
                      {userProfile.user.firstname + ' ' + userProfile.user.lastname}
                      <div className='text-xs italic'>
                        Registered since <span className='underline '>{userProfile.user.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm font-bold">
                      <div className="text-gray-600">
                        STATUS:
                      </div>
                      {
                        userProfile.user.status === 'Active'
                        ?
                          <div className='text-green-400'>
                            ACTIVE
                          </div>
                        :
                          <div className='text-red-400'>
                            INACTIVE
                          </div>
                      }
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="text-sm font-bold text-gray-600">
                        SOCIAL MEDIA
                      </div>
                      <div className="flex gap-4 text-4xl ">
                        <FaFacebookSquare  className='cursor-pointer hover:text-red-800'/>
                        <FaInstagramSquare className='cursor-pointer hover:text-red-800'/>
                        <FaTwitterSquare className='cursor-pointer hover:text-red-800'/>
                      </div>
                    </div>
                    {
                      isOtherUser &&
                      <div>
                        <Link to={'/main/update'} className='py-1 text-xs bg-red-300 border border-red-500 rounded-full px-7 hover:bg-red-500'>Edit Profile</Link>
                      </div>
                    }
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
                        {userProfile.user.firstname + ' ' + userProfile.user.middlename + ' ' + userProfile.user.lastname}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Gender
                      </div>
                      <div>
                        {userProfile.user.gender}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Age
                      </div>
                      <div>
                        {userProfile.user.age}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Contact No.
                      </div>
                      <div>
                        {userProfile.user.mobileNumber}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Email
                      </div>
                      <div>
                        {userProfile.user.email}
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
                        {userProfile.address.region}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Province
                      </div>
                      <div>
                        {userProfile.address.province}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        City
                      </div>
                      <div>
                        {userProfile.address.city}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Barangay
                      </div>
                      <div>
                        {userProfile.address.barangay}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold shrink-0'>
                        Full Address
                      </div>
                      <div className='text-right'>
                        <div>
                          {userProfile.address.addressLine1}
                        </div>
                        <div>
                          {userProfile.address.addressLine2}
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
                      {userProfile.user.shortBio}
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
                        {userProfile.user.bloodGroup}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Donations
                      </div>
                      <div>
                        {userProfile.donorInfo.totalDonations}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Rating
                      </div>
                      <div className='flex gap-1'>
                        {
                          [...Array(userProfile.donorInfo.avgRating)].map((e, i) => <FaStar key={i} />)
                        }
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Health Status
                      </div>
                      <div>
                        {userProfile.donorInfo.healthStatus}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold '>
                        Last Donation
                      </div>
                      <div>
                        {userProfile.donorInfo.lastDonation ? userProfile.donorInfo.lastDonation : 'Not set'}
                      </div>
                    </div>
                    <div className='flex justify-between text-xs'>
                      <div className='font-bold shrink-0'>
                        Health Conditions
                      </div>
                      <div className='text-right'>
                        {userProfile.donorInfo.healthConditions ? userProfile.donorInfo.healthConditions : 'N/A'}
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
                    {/* 3 */}
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