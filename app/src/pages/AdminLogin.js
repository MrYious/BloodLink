import { FaCaretLeft, FaLock, FaTimes, FaUserAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { BiLogIn } from "react-icons/bi";
import { MainContext } from '../App.js'
import axios  from "axios";

const AdminLogin = () => {
  const contextData = useContext(MainContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  useEffect(() => {
    if(location.state){
      setAlert({
        show: true,
        header: location.state.message,
        isError: location.state.isError,
      });
    }
  }, [location])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    const data = {
      username: username,
      password: password,
    }
    let endpoint = contextData.link + 'api/adminLogin';
    axios.post(endpoint, {data})
    .then(function (response) {
      console.log("Login Success", response.data)
      localStorage.clear();
      localStorage.setItem('adminID', response.data.checkAdmin.id);
      localStorage.setItem('username', response.data.checkAdmin.username);
      localStorage.setItem('isMaster', response.data.checkAdmin.role === 'master' ? 'true' : 'false' );
      localStorage.setItem('profile', response.data.checkAdmin.profilePicture ? response.data.checkAdmin.profilePicture : '');
      navigate("/admin/dashboard", {state: {message: response.data.message, isError: false}})
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      setAlert({
        show: true,
        header: error.response.data.message,
        isError: true,
      });
    });
    e.preventDefault();
  };

  return (
    <section className='flex flex-col w-full min-h-screen bg-white'>
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
      <div className="flex items-center justify-center w-full min-h-screen bg-cover bg-admin-login">
        <form onSubmit={handleLogin} className="flex flex-col w-[80%] lg:w-[35%] p-10 gap-10 bg-gray-100 shadow-black shadow-md bg-opacity-85 backdrop-blur-sm">
          {/* 1 */}
          <div className="flex flex-col items-center w-full gap-2 ">
            <div className="text-4xl font-bold tracking-wider">Administrator!</div>
            <div className="text-gray-500">Login to continue</div>
          </div>
          {/* 2 */}
          <div className='flex flex-col w-full gap-5 '>
            <div className={`flex items-center justify-center w-full gap-3 p-3 border-[1px] border-gray-900 rounded `}>
              <FaUserAlt className="text-3xl text-blue-900"/>
              <input className="w-full bg-transparent focus:outline-none" maxLength="15" value={username} onChange={(e)=> {setUsername(e.target.value)}} type={"text"} placeholder="Username" autoComplete="username" required/>
            </div>
            <div className={`flex items-center justify-center w-full gap-3 p-3 border-[1px] border-gray-900 rounded `}>
              <FaLock className="text-3xl text-blue-900"/>
              <input className="w-full bg-transparent focus:outline-none" minLength={5} maxLength={16} value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} placeholder="Password" autoComplete="password" required/>
            </div>
            <button type="submit" className="flex items-center justify-center w-full gap-4 py-2 text-xl font-bold tracking-wide text-gray-200 bg-green-700 rounded-sm shadow-md hover:bg-green-900 shadow-black">
              <BiLogIn className="text-4xl" />
              LOGIN
            </button>
          </div>
          {/* 3 */}
          <Link to='/' className="flex items-center text-red-600 w-fit hover:underline">
            <FaCaretLeft className="text-xl" /> Return to home
          </Link>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;