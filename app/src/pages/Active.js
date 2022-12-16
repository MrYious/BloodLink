import { FaCheck, FaExclamation, FaRegStar, FaStar, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import Rating from 'react-rating'
import SideBar from '../components/SideBar.js';
import { Widget } from "@uploadcare/react-widget";
import axios  from "axios";
import defaultReviewPic from '../assets/images/defaultReviewPic.png'
import profilepic from '../assets/images/profilepic.jpg'

const Active = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');
  const fname = localStorage.getItem('fname');
  const lname = localStorage.getItem('lname');

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
  const [reason, setReason] = useState('');
  const [completionData, setCompletionData] = useState({
    clinicName: '',
    donationDate: '',
    review: {
      comment: '',
      rating: 0,
      image: '',
    }
  })

  const [showModalComplete, setShowModalComplete] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
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
      fetchAllActiveRequests()
    }
  }, [])

  useEffect(() => {
    setReason('');
  }, [showModalReport, showModalCancel])

  useEffect(() => {
    setCompletionData({
      clinicName: '',
      donationDate: '',
      review: {
        comment: '',
        rating: 0,
        image: '',
      }
    })
  }, [showModalComplete])

  useEffect(() => {
    if(location.state){
      setAlert({
        show: true,
        header: location.state.message,
        isError: location.state.isError,
      });
    }
  }, [location])

  const fetchAllActiveRequests = () => {
    const data = {
      id: userId,
      status: 'Active',
    }
    let endpoint = contextData.link + 'api/getRequest';
    axios.post(endpoint, {data})
    .then(function (response) {
      console.log('Active Requests ', response.data.requests);
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

  const handleOpenCompleteModal = (req) => {
    setShowModalComplete(true)
    setSelectedRequest(req)
  }

  const handleOpenCancelModal = (req) => {
    setShowModalCancel(true)
    setSelectedRequest(req)
  }

  const handleOpenReportModal = (req) => {
    setShowModalReport(true)
    setSelectedRequest(req)
  }

  const handleComplete = () => {
    if(!completionData.review.rating){
      setAlert({
        show: true,
        header: 'Please leave a rating for the donor!',
        isError: true,
      });
    } else if(!completionData.clinicName){
      setAlert({
        show: true,
        header: 'Please enter the hospital or clinic name!',
        isError: true,
      });
    } else if(!completionData.review.comment){
      setAlert({
        show: true,
        header: 'Please leave a review or comment for the donor!',
        isError: true,
      });
    } else if(!completionData.donationDate){
      setAlert({
        show: true,
        header: 'Please enter the date when the blood donation is held!',
        isError: true,
      });
    } else {
      setShowModalComplete(false)
      const data = {
        id: selectedRequest.id,
        status: 'Completed',
        clinicName: completionData.clinicName,
        donationDate: completionData.donationDate,
        comment: completionData.review.comment,
        rating: completionData.review.rating,
        image: completionData.review.image,
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
        fetchAllActiveRequests();
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
    if(reason === ''){
      setAlert({
        show: true,
        header: 'Please enter the reason for the action.',
        isError: true,
      });
    } else {
      setShowModalCancel(false);
      const data = {
        id: selectedRequest.id,
        status: 'Cancelled',
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
        fetchAllActiveRequests();
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
      {/* COMPLETE MODAL */}
      {showModalComplete && selectedRequest && (
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
                  Completion of the Blood Donation Request
                </h3>
                <FaTimes onClick={() => setShowModalComplete(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col max-h-[500px] gap-3 p-6 overflow-y-scroll text-sm">
                {/* 1 */}
                <div>To complete the request, please provide the following information. </div>
                {/* 2 */}
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                  <div className='w-[25px] border border-black shrink-0'></div>
                    <div className='text-lg shrink-0'>
                      Donor Information
                    </div>
                    <div className='w-full border border-black'></div>
                  </div>
                  <div className='flex gap-1'>
                    <div>Donor: </div>
                    <Link to={'/main/profile/'+ selectedRequest.user.id} target="_blank" className='font-bold cursor-pointer w-fit hover:underline'>
                      { selectedRequest.user.name }
                    </Link>
                  </div>
                  <div className='flex gap-1'>
                    <div>Gender: </div>
                    <div className='font-bold'>{selectedRequest.user.gender}</div>
                  </div>
                  <div className='flex gap-1'>
                    <div>Blood Type: </div>
                    <div className='font-bold'>{selectedRequest.user.bloodType}</div>
                  </div>
                </div>
                {/* 3 */}
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <div className='w-[25px] border border-black shrink-0'></div>
                    <div className='text-lg shrink-0'>
                      Blood Donation Information
                    </div>
                    <div className='w-full border border-black'></div>
                  </div>
                  <div className='flex items-center gap-2 text-lg'>
                    <div className='text-sm'>Rating*: </div>
                    <Rating
                      emptySymbol={<FaRegStar />}
                      fullSymbol={<FaStar />}
                      initialRating={completionData.review.rating}
                      value={completionData.review.rating}
                      onChange={(value) => {setCompletionData({...completionData, review: {...completionData.review, rating: value}})}}
                    />
                  </div>
                  <input value={completionData.clinicName} onChange={(e)=> {setCompletionData({...completionData, clinicName: e.target.value})}} maxLength={100} type={"text"} placeholder="Hospital / Clinic Name*" autoComplete="Hospital Name" required className="w-[100%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                  <textarea rows="4" maxLength={150} value={completionData.review.comment} onChange={(e)=> {setCompletionData({...completionData, review: {...completionData.review, comment: e.target.value}})}} required placeholder="Short Review / Comment*" className="w-full resize-none bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded"></textarea>
                  <div className='flex flex-col items-end'>
                    <input value={completionData.donationDate} onChange={(e)=> {setCompletionData({...completionData, donationDate: e.target.value})}} type={"date"} autoComplete="date" required className="w-[100%] bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded" />
                    <div className='text-xs italic'>Date of Donation</div>
                  </div>
                  <div className='flex flex-col items-end'>
                    <div className='flex items-center justify-center w-full border border-gray-700 rounded '>
                      <label className='flex items-center justify-center w-[50%] h-40 overflow-hidden aspect-video shrink-0 cursor-pointer'>
                        <img src={completionData.review.image ? completionData.review.image : defaultReviewPic} className='w-full' alt="image for review" />
                        <div className="hidden">
                          <Widget
                            publicKey='41d925640f30fcc7b2c5'
                            id='file'
                            imagesOnly={true}
                            systemDialog={true}
                            onChange={ info => {
                              console.log('Upload completed:', info)
                              setCompletionData({...completionData, review: {...completionData.review, image: info.cdnUrl}})
                            }}
                          />
                        </div>
                      </label>
                    </div>
                    <div className='text-xs italic'>Image about the blood donation activity (optional)</div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalComplete(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleComplete}
                >
                  Submit
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
              <div className="flex flex-col gap-6 p-6 text-sm ">
                <div>Do you want to <b>cancel</b> your blood donation request to <b>{selectedRequest.user.name}</b> ?</div>
                <div className='flex flex-col gap-2'>
                  <div className='text-xs italic'>Please enter a short reason for the cancellation to let the person know (required)</div>
                  <textarea rows="6" maxLength={200} value={reason} onChange={(e)=> {setReason(e.target.value)}} required placeholder="Reason" className="w-full resize-none bg-transparent focus:outline-none p-2 border-[1px] border-gray-900 rounded"></textarea>
                </div>
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
              <div className="font-bold">ACTIVE REQUESTS</div>
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
                                <div onClick={()=>{handleOpenReportModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-red-400 cursor-pointer hover:bg-red-600'>
                                  <FaExclamation className='text-base ' />
                                </div>
                              </div>
                            :
                              <div className='absolute right-0 flex flex-col overflow-hidden bg-red-200 rounded-md shadow-sm shadow-gray-500'>
                                <div onClick={()=>{handleOpenCompleteModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-green-400 cursor-pointer hover:bg-green-500'>
                                  <FaCheck className='text-base ' />
                                </div>
                                <div onClick={()=>{handleOpenCancelModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-red-400 cursor-pointer hover:bg-red-500'>
                                  <FaTimes className='text-base ' />
                                </div>
                                <div onClick={()=>{handleOpenReportModal(req)}} className='flex items-center gap-1 p-3 text-sm bg-red-400 cursor-pointer hover:bg-red-600'>
                                  <FaExclamation className='text-base ' />
                                </div>
                              </div>
                          }
                          {/* 1 */}
                          <div className='flex w-full overflow-hidden select-none shrink-0'>
                            <div className="flex items-center justify-center w-32 h-32 overflow-hidden shrink-0">
                              <img src={req.user.image ? req.user.image : profilepic} className='w-full' alt="profilepicture" />
                            </div>
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
                                  req.isDonor ? 'Active: Establish contact with seeker' : "Active: Establish Contact with donor"
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

export default Active;