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


  // donor: {
  //   id: '1',
  //   name: 'Mark Edison Rosario',
  // },
  // seeker: {
  //   id: '2',
  //   name: 'Tessia Eralith',
  // },
  // date: '2022-11-12',
  // comment: '1 He is very helpful, a good person.',
  // rating: 3,
  // image: '',

  const [allRequests, setAllRequests] = useState([
    
  ]);
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
    } else {
      fetchAllPendingRequests()
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

  const fetchAllPendingRequests = () => {
    const data = {
      id: userId,
      status: 'Pending',
    }
    let endpoint = contextData.link + 'api/getRequest';
    axios.post(endpoint, {data})
    .then(function (response) {
      console.log('Pending Requests ', response.data.requests);
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
          <div className="flex items-start justify-center w-full gap-5 p-5 bg-gray-100">
            {/* 1 */}
            <div className="bg-gray-50 w-[100%] lg:w-[60%] flex flex-col p-5 rounded drop-shadow-lg">
              <div className="font-bold">YOUR PENDING REQUESTS</div>
              {
                allRequests.length === 0
                ?
                  <div className="flex items-center justify-center h-40">No Records Found</div>
                :
                  <></>
                  // <div className='flex flex-col gap-5 p-1 md:gap-2'>
                  //   {
                  //     filteredUsers
                  //     .slice(15 * (pageNumber - 1), 15 * pageNumber > filteredUsers.length ? filteredUsers.length : 15 * pageNumber)
                  //     .map((users, i) =>
                  //       <Link key={i} to={'/main/profile/'+ users.user.id} className="flex flex-col items-center overflow-hidden bg-gray-200 border border-gray-400 rounded-md cursor-pointer md:flex-row hover:border-gray-800 hover:shadow-sm hover:shadow-gray-400">
                  //         <div className='flex items-center justify-center w-full overflow-hidden bg-black select-none md:w-28 shrink-0'>
                  //           <img src={users.user.profilePicture ? users.user.profilePicture : profilepic} className='w-full' alt="profilepicture" />
                  //         </div>
                  //         <div className='flex w-full h-full'>
                  //           <div className='flex flex-col justify-between w-1/2 gap-2 px-4 py-2 text-sm md:gap-0'>
                  //             <div className='text-lg font-bold'>
                  //               {users.user.firstname + ' ' + users.user.lastname}
                  //             </div>
                  //             <div className=''>
                  //               {users.user.gender}
                  //             </div>
                  //             <div className=''>
                  //               {users.user.age + ' years old'}
                  //             </div>
                  //             <div className='flex gap-1 text-lg'>
                  //               {
                  //                 [...Array(users.donorInfo.avgRating)].map((e, i) => <FaStar key={i} />)
                  //               }
                  //               {
                  //                 [...Array(5 - users.donorInfo.avgRating)].map((e, i) => <FaRegStar key={i} />)
                  //               }
                  //             </div>
                  //           </div>
                  //           <div className='flex flex-col justify-between w-1/2 gap-2 px-4 py-2 text-sm md:gap-0'>
                  //             <div className=''>
                  //               Status: <span className={`font-bold ${users.user.status === 'Active' ? 'text-green-700' :'text-red-700' }`}>
                  //                 {users.user.status}
                  //                 </span>
                  //             </div>
                  //             <div className=''>
                  //               Blood Group: {users.user.bloodGroup}
                  //             </div>
                  //             <div className=''>
                  //               Last Donation: {users.donorInfo.lastDonation ? users.donorInfo.lastDonation : 'N/A'}
                  //             </div>
                  //             <div className=''>
                  //               Total Donations: {users.donorInfo.totalDonations}
                  //             </div>
                  //           </div>
                  //         </div>
                  //       </Link>
                  //     )
                  //   }
                  // </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Requests;