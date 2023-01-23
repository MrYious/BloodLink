import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AdminSideBar from '../components/AdminSideBar.js';
import { Editor } from 'react-draft-wysiwyg';
import { FaTimes } from 'react-icons/fa';
import { MainContext } from '../App.js'
import axios  from "axios";

// import draftToHtml from 'draftjs-to-html';

// import htmlToDraft from 'html-to-draftjs';

const ManageContents = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const adminID = localStorage.getItem('adminID');
  const username = localStorage.getItem('username');
  const profile = localStorage.getItem('profile');

  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [allContents, setAllContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState({});

  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  useEffect(() => {
    if(!adminID){
      navigate("/")
    } else {
      fetchAllContents()
    }
  }, [])

  useEffect(() => {
    if(location.state){
      setAlert({
        show: true,
        header: location.state.header,
        message: location.state.message,
        isError: location.state.isError,
      });
    }
  }, [location])

  useEffect(() => {
    setTitle('');
    setEditorState(() => EditorState.createEmpty());
  }, [showModalNew])

  const handleOpenNewModal = () => {
    setShowModalNew(true)
  }

  const handleOpenEditModal = (req) => {
    setShowModalEdit(true)
    setSelectedContent(req)
    setTitle(req.title);
    setEditorState(EditorState.createWithContent(
      convertFromRaw(JSON.parse(req.content)),
    ))
  }

  const handleOpenDeleteModal = (req) => {
    setShowModalDelete(true)
    setSelectedContent(req)
  }

  const handleNew = () => {
    if(title === ''){
      setAlert({
        show: true,
        header: 'Please enter a title for the content.',
        isError: true,
      });
    } else {
      setShowModalNew(false)
      const data = {
        title,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      }
      let endpoint = contextData.link + 'api/content';
      axios.post(endpoint, {data})
      .then(function (response) {
        setAlert({
          show: true,
          header: 'Action Success',
          message: response.data.message,
          isError: false,
        });
        fetchAllContents()
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
  }

  const handleEdit = () => {
    setShowModalEdit(false)
    const data = {
      id: selectedContent.id,
      title,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    }
    let endpoint = contextData.link + 'api/updateContent';
    axios.post(endpoint, {data})
    .then(function (response) {
      setAlert({
        show: true,
        header: 'Action Success',
        message: response.data.message,
        isError: false,
      });
      fetchAllContents()
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

  const handleDelete = () => {
    setShowModalDelete(false)
    const data = {
      id: selectedContent.id,
    }
    let endpoint = contextData.link + 'api/deleteContent';
    axios.post(endpoint, {data})
    .then(function (response) {
      setAlert({
        show: true,
        header: 'Action Success',
        message: response.data.message,
        isError: false,
      });
      fetchAllContents()
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

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    // console.log(state);
    // const data = convertToRaw(editorState.getCurrentContent());
    // console.log(data);
  };

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
      {/* NEW MODAL */}
      {showModalNew && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6 ">
            {/*content*/}
            <div className="relative flex flex-col w-full max-h-screen bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Create New Content
                </h3>
                <FaTimes onClick={() => setShowModalNew(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col gap-2 p-6 overflow-y-scroll text-sm">
                <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Content Title*" className="w-full resize-none bg-transparent focus:outline-none p-2 border-[1px] border-gray-400 rounded" />
                <div className='p-2 border border-gray-400 rounded'>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={updateTextDescription}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  />
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalNew(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleNew}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      {/* EDIT MODAL */}
      {showModalEdit && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6 ">
            {/*content*/}
            <div className="relative flex flex-col w-full max-h-screen bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Edit Content
                </h3>
                <FaTimes onClick={() => setShowModalEdit(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col gap-2 p-6 overflow-y-scroll text-sm">
                <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Content Title*" className="w-full resize-none bg-transparent focus:outline-none p-2 border-[1px] border-gray-400 rounded" />
                <div className='p-2 border border-gray-400 rounded'>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={updateTextDescription}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  />
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-xs font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none hover:underline background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModalEdit(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-3 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="button"
                  onClick={handleEdit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      {/* DELETE MODAL */}
      {showModalDelete && (
      <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        >
          <div className="relative w-auto max-w-3xl mx-auto my-6 ">
            {/*content*/}
            <div className="relative flex flex-col w-full max-h-screen bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-solid rounded-t border-slate-200">
                <h3 className="text-xl font-semibold">
                  Delete Content
                </h3>
                <FaTimes onClick={() => setShowModalDelete(false)} className='text-xl cursor-pointer ' />
              </div>
              {/*body*/}
              <div className="flex flex-col p-6 text-sm">
                <div>Are you sure you want to delete this content?</div>
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
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      </>
      )}
      <div className='flex flex-col min-h-[100vh] '>
        <div className="flex min-h-[90vh]">
          {/* 1 */}
          <AdminSideBar />
          {/* 2 */}
          <div className="flex flex-col items-start w-full p-5 bg-gray-100 lg:justify-around lg:flex-row">
            {/* 1 */}
            <div className="bg-gray-50 w-[100%] flex flex-col gap-5 p-5 rounded drop-shadow-lg">
              <div className="font-semibold">Administrator / Manage Featured Contents </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div>LIST OF FEATURED CONTENTS</div>
                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button onClick={handleOpenNewModal} className="flex items-center gap-1 p-2 bg-green-200 border border-green-700 rounded hover:bg-green-500">
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {
                    allContents.map((content, i) => {
                      return <div key={i} className="flex items-center justify-between w-full p-2 border border-gray-400">
                        <span><b>Content Title: </b>{content.title}</span>
                        <div className="flex gap-2">
                          <button onClick={()=>{handleOpenEditModal(content)}} className="p-2 text-green-900 bg-green-100 border border-green-500 rounded hover:bg-green-300"><FaEdit /></button>
                          <button onClick={()=>{handleOpenDeleteModal(content)}} className="p-2 text-red-900 bg-red-100 border border-red-500 rounded hover:bg-red-300"><FaTrashAlt /></button>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageContents;