import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaTimes } from 'react-icons/fa';
import { MainContext } from '../App.js'
import MainNavigationBar from '../components/MainNavigationBar';
import SideBar from '../components/SideBar.js';
import axios  from "axios";
import { convertFromRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';

const Main = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userID');

  const [allContents, setAllContents] = useState([]);

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
      fetchAllContents()
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

  const fetchAllContents = () => {
    let endpoint = contextData.link + 'api/getAllContents';
    axios.post(endpoint)
    .then(function (response) {
      console.log('Contents ', response.data.contents);
      const contents = response.data.contents
      setAllContents(contents)
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      setAlert({
        show: true,
        header: 'Action Failed',
        message: error.response.data.message,
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
          <div className="flex flex-col items-start w-full gap-5 p-5 bg-gray-100 lg:justify-around lg:flex-row">
            {/* 1 */}
            <div className="bg-gray-50 w-[100%] lg:w-[60%] gap-5 flex items-center flex-col p-5 rounded drop-shadow-lg">
              {/* SAMPLE */}
              {
                allContents.map((content, i) => {
                  return <div key={i} className="flex flex-col w-full gap-3 p-3 border border-gray-500 rounded">
                    {/* HEAD */}
                    <div className="flex flex-col gap-1">
                      <div className="text-lg font-bold">Sample Title {content.title}</div>
                      <div className="flex items-center gap-5 text-xs italic">
                        <div>
                          <span className="font-semibold">
                            Created on:
                          </span> {content.createdAt}
                        </div>
                        <div>
                          <span className="font-semibold">
                            Last Update:
                          </span> {content.updatedAt}
                        </div>
                      </div>
                    </div>
                    {/* BODY */}
                    <div>
                      <div
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(content.content)) }} 
                      />
                    </div>
                  </div>
                })
              }
            </div>
            {/* 2 */}
            <div className="bg-gray-50 w-[100%] lg:w-[33%] flex flex-col items-center p-5 rounded drop-shadow-lg">
              Side Contents
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;