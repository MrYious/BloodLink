import { FaExclamation, FaRegStar, FaStar, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import profilepic from '../assets/images/profilepic.jpg'

const HistoryCancelled = () => {
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

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
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
      fetchAllCancelledRequests()
    }
  }, [])

  useEffect(() => {
    setReason('');
  }, [showModalReport])

  useEffect(() => {
    if(location.state){
      setAlert({
        show: true,
        header: location.state.message,
        isError: location.state.isError,
      });
    }
  }, [location])

  const fetchAllCancelledRequests = () => {
    const data = {
      id: userId,
      status: 'Cancelled',
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
          reason: req.details.reason,
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

  const handleOpenDeleteModal = (req) => {
    setShowModalDelete(true)
    setSelectedRequest(req)
  }

  const handleOpenReportModal = (req) => {
    setShowModalReport(true)
    setSelectedRequest(req)
  }

  const handleDelete = () => {
    setShowModalDelete(false);
    const data = {
      id: selectedRequest.id,
    }
    let endpoint = contextData.link + 'api/deleteRequest';
    axios.post(endpoint, {data})
    .then(function (response) {
      console.log(response.data.message);
      setAlert({
        show: true,
        header: response.data.message,
        isError: false,
      });
      fetchAllCancelledRequests();
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

  const handleReport = () => {
    if(reason === ''){
      setAlert({
        show: true,
        header: 'Please enter the reason for the action.',
        isError: true,
      });
    } else {
      setShowModalReport(false);
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
      {/* DELETE MODAL */}
      {showModalDelete && selectedRequest && (
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
                  Confirm Delete
                </h3>
                <FaTimes onClick={() => setShowModalDelete(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col p-6 text-sm md:flex-row ">
                <div>Are you sure you want to permanently <b>delete</b> this record?</div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalDelete(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleDelete}
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
      {/* REPORT MODAL */}
      {showModalReport && selectedRequest && (
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
                  Report the request
                </h3>
                <FaTimes onClick={() => setShowModalReport(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col gap-6 p-6 text-sm ">
                <div>Do you find this request inappropriate, dangerous or something that violates the standard community guidelines?  </div>
                <div className='flex flex-col gap-2'>
                  <div className='text-xs italic'>Please provide the reason on why this request should be removed (required)</div>
                  <textarea rows="6" maxLength={200} value={reason} onChange={(e)=> {setReason(e.target.value)}} required placeholder="Reason" className="w-full resize-none bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded"></textarea>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalReport(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleReport}
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
              <div className="font-bold">HISTORY: LIST OF CANCELLED REQUESTS</div>
              {
                allRequests.length === 0
                ?
                  <div className="flex items-center justify-center h-40">No Records Found</div>
                :
                  <div className='flex flex-col items-start justify-between gap-5 p-1'>
                    {
                      allRequests.map((req, i) =>
                        <div key={i} className="relative flex flex-col w-[100%] overflow-hidden bg-gray-200 border border-gray-400 rounded-md">
                          {/* Action */}
                          {
                            <div className='absolute right-0 flex flex-col overflow-hidden bg-red-200 rounded-md shadow-sm shadow-gray-500'>
                              <div onClick={()=>{handleOpenDeleteModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-green-400 cursor-pointer hover:bg-green-600'>
                                <FaTrashAlt className='text-base ' />
                              </div>
                              <div onClick={()=>{handleOpenReportModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-red-400 cursor-pointer hover:bg-red-500'>
                                <FaExclamation className='text-base ' />
                              </div>
                            </div>
                          }
                          {/* 1 */}
                          <div className='flex flex-col w-full overflow-hidden select-none md:flex-row shrink-0'>
                            <div className="flex items-center justify-center w-32 h-32 overflow-hidden shrink-0">
                              <img src={req.user.image ? req.user.image : profilepic} className='w-full' alt="profilepicture" />
                            </div>
                            <div className='flex flex-col w-full gap-2 p-2 text-sm bg-gray-200'>
                              <Link to={'/main/profile/'+ req.user.id} target="_blank" className='text-lg font-bold cursor-pointer w-fit hover:underline'>
                                { req.user.name }
                              </Link>
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
                                  {
                                    !req.isDonor ? 'REASON' : 'YOUR REASON'
                                  }
                                </div>
                                <div className='italic'>
                                  { req.reason }
                                </div>
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

export default HistoryCancelled;