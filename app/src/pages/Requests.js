import { FaCheck, FaRegStar, FaStar, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import profilepic from '../assets/images/profilepic.jpg'

const Requests = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');
  const fname = localStorage.getItem('fname');
  const lname = localStorage.getItem('lname');

  const [allRequests, setAllRequests] = useState([
    {
      isDonor: true,
      user: {
        id: '2',
        image: '',
        name: 'Tessia Eralith',
        bloodType: 'O+',
        gender: 'Female',
        status: 'Active',
        age: 22,
        rating: 2,
      },
      status: 'Pending',
      message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
      date: '2022-11-12',
    },
  ]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [reason, setReason] = useState('');

  const [showModalAccept, setShowModalAccept] = useState(false);
  const [showModalDecline, setShowModalDecline] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  useEffect(() => {
    if(!userId){
      navigate("/")
    } else {
      fetchAllPendingRequests()
    }
  }, [])

  useEffect(() => {
    setReason('');
  }, [showModalDecline])

  useEffect(() => {
    if(location.state){
      setAlert({
        show: true,
        header: location.state.message,
        isError: location.state.isError,
      });
    }
  }, [location])

  const fetchAllPendingRequests = () => {
    const data = {
      id: userId,
      status: 'Pending',
    }
    let endpoint = contextData.link + 'api/getRequest';
    axios.post(endpoint, {data})
    .then(function (response) {
      console.log('Pending Requests ', response.data.requests);
      const result = response.data.requests
      const requests = [
        ...result.seekDonorReq.map((req) => {
        return {
          isDonor: false,
          details: req,
          user: result.listUsers.users.find(user => user.id === req.donorID),
          donorInfo: result.listUsers.donorInfos.find(donorInfo => donorInfo.userID === req.donorID),
          address: result.listUsers.addresses.find(address => address.userID === req.donorID),
        }}),
        ...result.acceptDonorReq.map((req) => {
        return {
          isDonor: true,
          details: req,
          user: result.listUsers.users.find(user => user.id === req.seekerID),
          donorInfo: result.listUsers.donorInfos.find(donorInfo => donorInfo.userID === req.seekerID),
          address: result.listUsers.addresses.find(address => address.userID === req.seekerID),
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
          date: req.details.createdAt,
        }
      })

      setAllRequests(structuredRequests)

      console.log('Requests', structuredRequests);
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      setAlert({
        show: true,
        header: 'Action Failed',
        isError: true,
      });
    });
  }

  const handleOpenAcceptModal = (req) => {
    setShowModalAccept(true)
    setSelectedRequest(req)
  }

  const handleOpenDeclineModal = (req) => {
    setShowModalDecline(true)
    setSelectedRequest(req)
  }

  const handleOpenCancelModal = (req) => {
    setShowModalCancel(true)
    setSelectedRequest(req)
  }

  const handleAccept = () => {
    setShowModalAccept(false)
    const data = {
      id: selectedRequest.id,
      status: 'Active',
    }
    let endpoint = contextData.link + 'api/request';
    axios.patch(endpoint, {data})
    .then(function (response) {
      console.log(response.data.message);
      setAlert({
        show: true,
        header: 'Action Success',
        message: response.data.message,
        isError: false,
      });
      fetchAllPendingRequests();
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      setAlert({
        show: true,
        header: 'Action Failed',
        isError: true,
      });
    });
  }

  const handleDecline = () => {
    if(reason === ''){
      setAlert({
        show: true,
        header: 'Please enter the reason for the action.',
        isError: true,
      });
    }else{
      setShowModalDecline(false)
      const data = {
        id: selectedRequest.id,
        status: 'Declined',
        reason: reason,
      }
      let endpoint = contextData.link + 'api/request';
      axios.patch(endpoint, {data})
      .then(function (response) {
        console.log(response.data.message);
        setAlert({
          show: true,
          header: 'Action Success',
          message: response.data.message,
          isError: false,
        });
        fetchAllPendingRequests();
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAlert({
          show: true,
          header: 'Action Failed',
          isError: true,
        });
      });
    }
  }

  const handleCancel = () => {
    setShowModalCancel(false);
    const data = {
      id: selectedRequest.id,
      status: 'Cancelled',
      reason: '',
    }
    let endpoint = contextData.link + 'api/request';
    axios.patch(endpoint, {data})
    .then(function (response) {
      console.log(response.data.message);
      setAlert({
        show: true,
        header: 'Action Success',
        message: response.data.message,
        isError: false,
      });
      fetchAllPendingRequests();
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      setAlert({
        show: true,
        header: 'Action Failed',
        isError: true,
      });
    });
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
      {/* ACCEPT MODAL */}
      {showModalAccept && selectedRequest && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6 ">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Confirm Accept
                </h3>
                <FaTimes onClick={() => setShowModalAccept(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col p-6 text-sm md:flex-row ">
                <div>Do you want to <b>accept</b> this blood donation request from <b>{selectedRequest.user.name}</b> ? </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalAccept(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleAccept}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      {/* DECLINE MODAL */}
      {showModalDecline && selectedRequest && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6 ">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Confirm Decline
                </h3>
                <FaTimes onClick={() => setShowModalDecline(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col gap-6 p-6 text-sm">
                <div>Do you want to <b>decline</b> this blood donation request from <b>{selectedRequest.user.name}</b> ? </div>
                <div className='flex flex-col gap-2'>
                  <div className='text-xs italic'>Please enter a short reason for declining to let the person know (required)</div>
                  <textarea rows="6" maxLength={200} value={reason} onChange={(e)=> {setReason(e.target.value)}} required placeholder="Reason for declining" className="w-full resize-none bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded"></textarea>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalDecline(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleDecline}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      {/* CANCEL MODAL */}
      {showModalCancel && selectedRequest && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6 ">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Confirm Cancel
                </h3>
                <FaTimes onClick={() => setShowModalCancel(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col p-6 text-sm md:flex-row ">
                <div>Do you want to <b>cancel</b> your blood donation request to <b>{selectedRequest.user.name}</b> ? </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalCancel(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleCancel}
                >
                  Yes
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
          <div className="flex items-start justify-center w-full gap-5 p-5 bg-gray-100">
            {/* 1 */}
            <div className="bg-gray-50 w-[100%] lg:w-[65%] flex flex-col p-5 gap-3 rounded drop-shadow-lg">
              <div className="font-bold">YOUR PENDING REQUESTS</div>
              {
                allRequests.length === 0
                ?
                  <div className="flex items-center justify-center h-40">No Records Found</div>
                :
                  <div className='flex flex-wrap items-start justify-between gap-5 p-1'>
                    {
                      allRequests.map((req, i) =>
                        <div key={i} className="relative flex flex-col w-[100%] sm:w-[48%] overflow-hidden bg-gray-200 border border-gray-400 rounded-md">
                          {/* Action */}
                          {
                            req.isDonor ?
                              <div className='absolute right-0 flex flex-col overflow-hidden bg-red-200 rounded-md shadow-sm shadow-gray-500'>
                                <div onClick={()=>{handleOpenAcceptModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-green-400 cursor-pointer hover:bg-green-600'>
                                  <FaCheck className='text-base ' />
                                  <span className='hidden md:flex'>Accept</span>
                                </div>
                                <div onClick={()=>{handleOpenDeclineModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-red-400 cursor-pointer hover:bg-red-500'>
                                  <FaTimes className='text-base ' />
                                  <span className='hidden md:flex'>Decline</span>
                                </div>
                              </div>
                            :
                              <div className='absolute right-0 flex flex-col overflow-hidden bg-red-200 rounded-md shadow-sm shadow-gray-500'>
                                <div onClick={()=>{handleOpenCancelModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-red-400 cursor-pointer hover:bg-red-500'>
                                  <FaTimes className='text-base ' />
                                  <span className='hidden md:flex'>Cancel</span>
                                </div>
                              </div>
                          }
                          {/* 1 */}
                          <div className='flex w-full overflow-hidden select-none shrink-0'>
                            <img src={req.user.image ? req.user.image : profilepic} className='w-32' alt="profilepicture" />
                            <div className='flex flex-col justify-between w-full gap-1 p-2 text-sm'>
                              <div>{req.user.bloodType}</div>
                              <div>{req.user.gender}</div>
                              <div className={`font-bold ${req.user.status === 'Active' ? 'text-green-700' :'text-red-700' }`}>{req.user.status}</div>
                              <div>{req.user.age} yrs old</div>
                              <div className='flex gap-1 text-lg'>
                                {
                                  [...Array(req.user.rating)].map((e, i) => <FaStar key={i} />)
                                }
                                {
                                  [...Array(5 - req.user.rating)].map((e, i) => <FaRegStar key={i} />)
                                }
                              </div>
                            </div>
                          </div>
                          {/* 2 */}
                          <div className='flex flex-col w-full gap-2 p-2 text-sm'>
                            <Link to={'/main/profile/'+ req.user.id} target="_blank" className='text-lg font-bold cursor-pointer w-fit hover:underline'>
                              { req.user.name }
                            </Link>
                            <div className='flex flex-col gap-1'>
                              <div className='font-bold text-md'>
                                STATUS
                              </div>
                              <div className='italic'>
                                {
                                  req.isDonor ? 'Waiting for your action' : "Waiting for donor's response"
                                }
                              </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                              <div className='font-bold text-md'>
                                {
                                  req.isDonor ? 'MESSAGE' : 'YOUR MESSAGE'
                                }
                              </div>
                              <div className='italic'>
                                { req.message }
                              </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                              <div className='font-bold text-md'>
                                DATE
                              </div>
                              <div className=''>
                                { req.date }
                              </div>
                            </div>
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
    </section>
  );
}

export default Requests;