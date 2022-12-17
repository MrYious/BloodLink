import { FaAngleLeft, FaAngleRight, FaExclamation, FaFacebookSquare, FaInstagramSquare, FaQuoteLeft, FaRegStar, FaStar, FaTimes, FaTwitterSquare } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import defaultReviewPic from '../assets/images/defaultReviewPic.png'
import profilepic from '../assets/images/profilepic.jpg'

const Profile = () => {
  // PROFILE pagination
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');
  let { nameID } = useParams();

  const [isMe, setIsMe] = useState(true);
  const [isRelated, setIsRelated] = useState(false);
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
  });

  const [allRequests, setAllRequests] = useState([
    // {
    //   isDonor: true,
    //   user: {
    //     id: '2',
    //     image: '',
    //     name: 'Tessia Eralith',
    //     bloodType: 'O+',
    //     gender: 'Female',
    //     status: 'Active',
    //     age: 22,
    //     rating: 2,
    //   },
    //   status: 'Pending',
    //   message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
    //   date: '2022-11-12',
    // },
  ]);

  const [selectedRequest, setSelectedRequest] = useState({});

  const [requestMessage, setRequestMessage] = useState('');
  const [reason, setReason] = useState('');

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
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
      fetchUserProfile()
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
    setShowReviewModal(false);
    setShowRequestModal(false);
    setIsMe(nameID ? nameID === userId ? true : false : true);
    fetchUserProfile();
  }, [location])

  useEffect(() => {
    setRequestMessage('');
    setReason('');
  }, [showRequestModal, showReportModal])

  const fetchUserProfile = () => {
    const data = {
      id: nameID ? nameID : userId,
      userId: userId,
    }
    let endpoint = contextData.link + 'api/getUserByID';
    axios.post(endpoint, {data})
    .then(function (response) {
      // console.log("Load UserProfile Success", response.data);
      // console.log(JSON.stringify(response.data.userProfile));
      setUserProfile(response.data.userProfile);
      setIsRelated(response.data.isRelated)
      // console.log(response.data.requests);
      const result = response.data.requests
      // console.log(result.reviews);
      const requests = [
        ...result.acceptDonorReq.map((req) => {
        return {
          isDonor: true,
          details: req,
          user: result.listUsers.users.find(user => user.id === req.seekerID),
          donorInfo: result.listUsers.donorInfos.find(donorInfo => donorInfo.userID === req.seekerID),
          address: result.listUsers.addresses.find(address => address.userID === req.seekerID),
          review: result.reviews.find((review) => review.donorRequestID === req.id)
        }}),
      ]

      const structuredRequests = requests.map((req) => {
        return {
          id: req.details.id,
          isDonor: req.isDonor,
          user: {
            id: req.user.id,
            image: req.user.profilePicture,
            name: req.user.firstname + ' ' + req.user.lastname,
            bloodType: req.user.bloodGroup,
            gender: req.user.gender,
            status: req.user.status,
            age: req.user.age,
            rating: req.donorInfo.avgRating,
          },
          status: req.details.status,
          message: req.details.message,
          clinicName: req.details.clinicName,
          donationDate: req.details.donationDate,
          date: req.details.createdAt,
          review: req.review
        }
      })

      setAllRequests(structuredRequests)

      console.log('Requests', structuredRequests);
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

  const handleOpenReview = (req) => {
    setSelectedRequest(req);
    setShowReviewModal(true);
  }

  const handleOpenRequestDonation = () => {
    setShowRequestModal(true);
  }

  const handleOpenReportUser = () => {
    setShowReportModal(true);
  }

  const handleRequestDonation = () => {
    if (requestMessage === '') {
      setAlert({
        show: true,
        header: 'Please enter a message to proceed.',
        isError: true,
      });
    } else {
      const data = {
        donorID: userProfile.user.id,
        seekerID: userId,
        message: requestMessage,
      }
      let endpoint = contextData.link + 'api/request';
      axios.post(endpoint, {data})
      .then(function (response) {
        setShowRequestModal(false);
        navigate("/main/requests", {
          state: {
            header: 'Success',
            message: response.data.message,
            isError: false
          }
        })
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: 'Action Failed',
          message: error.response.data.message,
          isError: true,
        });
        setShowRequestModal(false);
      });
    }
  }

  const handleReportUser = () => {
    if(reason === ''){
      setAlert({
        show: true,
        header: 'Please state the reason for reporting the user.',
        isError: true,
      });
    } else {
      setShowReportModal(false);
    }
  }

  return (
    <section className='flex flex-col w-full min-h-screen '>
      {/* ALERT */}
      {
        alert.show &&
        <div className={`flex z-[100] items-start justify-between gap-5 w-[90%] md:w-[40%] lg:w-[30%]  border ${ alert.isError ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'} p-4 rounded fixed z-[2] bottom-0 m-5`} role="alert">
          <div>
            <div className="py-1 font-bold">
              {alert.header}
            </div>
            {alert.message}
          </div>
          <FaTimes onClick={()=>{setAlert({...alert, show: false})}} className={`-mt-2 -mr-2 text-2xl  ${ alert.isError ? 'text-red-900' : 'text-green-900'}  cursor-pointer`}/>
        </div>
      }
      {/* REVIEW MODAL */}
      {showReviewModal && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between md:w-[500px] p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Blood Donation Review
                </h3>
                <FaTimes onClick={() => setShowReviewModal(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col items-center gap-2 p-6 text-sm ">
                <div className='text-2xl'>
                  <FaQuoteLeft />
                </div>
                <div className="leading-relaxed text-slate-500">
                  {selectedRequest.review.comment}
                </div>
                <div className='flex text-2xl'>
                  {
                    [...Array(selectedRequest.review.rating)].map((e, i) => <FaStar key={i} />)
                  }
                  {
                    [...Array(5 - selectedRequest.review.rating)].map((e, i) => <FaRegStar key={i} />)
                  }
                </div>
                <Link to={`/main/profile/${selectedRequest.user.id}`} className='flex gap-2 text-lg cursor-pointer hover:underline' >
                  {selectedRequest.user.name}
                </Link>
                <div className='italic'>
                  {selectedRequest.clinicName}
                </div>
                <div className='italic'>
                  {selectedRequest.donationDate}
                </div>
                {
                  selectedRequest.review.image &&
                  <div className='flex items-center justify-center w-full h-40 overflow-hidden'>
                    <label className='flex items-center justify-center w-[50%] overflow-hidden aspect-video shrink-0'>
                      <img src={selectedRequest.review.image} className='w-full' alt="image for review" />
                    </label>
                  </div>
                }
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      {/* REQUEST MODAL */}
      {showRequestModal && (
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
                  Request a Blood Donation
                </h3>
                <FaTimes onClick={() => setShowRequestModal(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col gap-2 p-6 text-sm">
                <div>Are you sure you want to request blood from <b>{userProfile.user.firstname + ' ' + userProfile.user.lastname}</b>?</div>
                { userProfile.user.status === 'Inactive' && <>
                  <div>The user's account is set to  <b className='text-red-700'>{userProfile.user.status}</b>.</div>
                  <div>Do you still want to send a blood donation request?</div>
                </>
                }
                <div className='flex flex-col gap-2 pt-5 '>
                  <div className='text-xs italic'>To proceed, you have to provide a message to the requested donor.</div>
                  <textarea value={requestMessage} onChange={(e)=>{setRequestMessage(e.target.value)}} placeholder='Empty' rows={5} maxLength={200} className='w-full p-1 border border-gray-700 rounded outline-none resize-none '></textarea>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleRequestDonation}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      {/* REPORT MODAL */}
      {showReportModal && (
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
                  Report User
                </h3>
                <FaTimes onClick={() => setShowReportModal(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col gap-2 p-6 text-sm">
                <div>Do you want to report <b>{userProfile.user.firstname + ' ' + userProfile.user.lastname}</b>?</div>
                <div className='flex flex-col gap-2 pt-5 '>
                  <div className='text-xs italic'>Please provide the reason on why this user should be banned (required)</div>
                  <textarea value={reason} onChange={(e)=>{setReason(e.target.value)}} placeholder="Reason" rows={5} maxLength={200} className='w-full p-1 border border-gray-700 rounded outline-none resize-none '></textarea>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleReportUser}
                >
                  Submit Report
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
          <div className="flex flex-col items-center w-full bg-gray-100">
            <div className="flex flex-col p-10 w-[100%] md:w-[85%] lg:w-[65%] gap-8 bg-gray-50 drop-shadow-xl shadow-white">
              {/* 1 */}
              <div className="flex flex-col w-full gap-5 lg:gap-14 lg:flex-row">
                <div className="flex items-center justify-center overflow-hidden w-60 h-60 shrink-0">
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
                      <FaFacebookSquare onClick={()=> { userProfile.user.linkFB && window.open( userProfile.user.linkFB , '_blank')}}  className='text-gray-600 cursor-pointer hover:text-red-800'/>
                      <FaInstagramSquare onClick={()=> { userProfile.user.linkIG && window.open( userProfile.user.linkIG , '_blank')}} className='text-gray-600 cursor-pointer hover:text-red-800'/>
                      <FaTwitterSquare onClick={()=> { userProfile.user.linkTW && window.open( userProfile.user.linkTW , '_blank')}} className='text-gray-600 cursor-pointer hover:text-red-800'/>
                    </div>
                  </div>
                  {
                    isMe
                    ?
                      <div>
                        <Link to={'/main/update'} className='py-1 text-xs bg-red-300 border border-red-500 rounded-full px-7 hover:bg-red-500'>Edit Profile</Link>
                      </div>
                    :
                      <div className='flex gap-2'>
                        <button onClick={handleOpenRequestDonation} className='py-1 text-xs bg-blue-300 border border-blue-500 rounded-full px-7 hover:bg-blue-500'>Request Blood Donation</button>
                        <button onClick={handleOpenReportUser} className='px-5 py-1 text-xs bg-red-300 border border-red-500 rounded-full hover:bg-red-500'> Report </button>
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
                    {/* true && false */}
                    <div className={`${ (!isMe && !isRelated) && 'blur-[2px] select-none'}`}>
                      {userProfile.user.mobileNumber}
                    </div>
                  </div>
                  <div className='flex justify-between text-xs'>
                    <div className='font-bold '>
                      Email
                    </div>
                    <div className={`${ (!isMe && !isRelated) && 'blur-[2px] select-none'}`}>
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
                    <div className={`${ (!isMe && !isRelated) && 'blur-[2px] select-none'} text-right`}>
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
                      {
                        [...Array(5 - userProfile.donorInfo.avgRating)].map((e, i) => <FaRegStar key={i} />)
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
                {
                  !allRequests
                  ?
                    <div className='text-sm'>
                      No Records
                    </div>
                  :
                    <div className='flex flex-wrap justify-around gap-5 text-sm'>
                      {
                        allRequests.map((req, i) =>
                        <div key={i} onClick={()=>{handleOpenReview(req)}} className='flex flex-col items-center w-[100%] md:w-[48%] gap-2 p-2 border border-black rounded cursor-pointer shrink-0 hover:bg-gray-200'>
                            <div className='flex items-center justify-center p-2 text-2xl'>
                              <FaQuoteLeft />
                            </div>
                            <div className='text-sm italic text-center'>
                              {req.review.comment}
                            </div>
                            <div className='flex gap-1'>
                              {
                                [...Array(req.review.rating)].map((e, i) => <FaStar key={i} />)
                              }
                              {
                                [...Array(5 - req.review.rating)].map((e, i) => <FaRegStar key={i} />)
                              }
                            </div>
                            <div className='text-xs'>
                              {req.user.name}
                            </div>
                        </div>
                        )
                      }
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;