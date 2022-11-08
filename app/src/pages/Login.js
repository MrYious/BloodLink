import { FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import NavigationBar from '../components/NavigationBar';
import login from '../assets/images/login.jpg'
import register from '../assets/images/register.jpg'
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    header: '',
    message: '',
    isError: false
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    // axios.post('http://localhost:5000/main/login', {
    //   email: email,
    //   password: password,
    // })
    // .then(function (response) {
    //   // SUCCESS
    //   console.log("Login Success", response.data)
    //   localStorage.clear();
    //   localStorage.setItem('loggedIn', "true");
    //   localStorage.setItem('userID', response.data.user.id);
    //   localStorage.setItem('addressID', response.data.user.addressID);
    //   localStorage.setItem('username', response.data.user.firstname);
    //   localStorage.setItem('type', response.data.user.accountType);

    //   localStorage.setItem('userData', JSON.stringify(response.data.user));
    //   localStorage.setItem('addressData', JSON.stringify(response.data.address));
    //   localStorage.setItem('requestsData', JSON.stringify(response.data.requests));
    //   if(response.data.user.accountType === "Donor"){
    //       localStorage.setItem('donorInfoData', JSON.stringify(response.data.donorInfo));
    //   }

    //   navigate("/dashboard")
    // })
    // .catch(function (error) {
    //     // FAIL
    //     console.log("Login Failed", error)
    //     setAlert({
    //         message: error.response.data.message,
    //         error: true
    //     });
    // });
    e.preventDefault();
    setAlert({
      show: true,
      header: 'Login Failed',
      message: 'Incorrect Email or Password',
      isError: true,
    });
  };

  return (
    <section className='flex flex-col w-full min-h-screen bg-white'>
      {/* ALERT */}
      {
        alert.show &&
        <div className={`flex items-start justify-between gap-5 w-[30%] border ${ alert.isError ? 'bg-red-100 border-red-400 text-red-700' : ''} p-4 rounded fixed z-[2] bottom-0 m-5`} role="alert">
          <div>
            <div className="py-1 font-bold">
              {alert.header}
            </div>
            {alert.message}
          </div>
          <FaTimes onClick={()=>{setAlert({...alert, show: false})}} className="-mt-2 -mr-2 text-2xl text-red-900 cursor-pointer"/>
        </div>
      }
      <NavigationBar />
      <div className="h-[10vh]"></div>
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full min-h-[90vh]  py-10">
        <div className="flex flex-col gap-4 w-[85%] lg:w-[45%] select-none">
          <img src={login} alt="w-full" />
        </div>
        <form onSubmit={handleLogin} className="flex flex-col w-[80%] lg:w-[40%] p-10 gap-10 ">
          {/* 1 */}
          <div className="flex flex-col gap-2 ">
            <div className="text-4xl font-bold tracking-wider">Welcome Back!</div>
            <div className="text-gray-500">Login to continue</div>
          </div>
          {/* 2 */}
          <div className='flex flex-col w-full gap-5 '>
            <div className={`flex items-center justify-center w-full gap-3 p-3 border-[1px] border-gray-900 rounded `}>
              <FaEnvelope className="text-3xl text-blue-900"/>
              <input className="w-full bg-transparent focus:outline-none" maxLength="50" value={email} onChange={(e)=> {setEmail(e.target.value)}} type={"email"} placeholder="Email Address" autoComplete="email" required/>
            </div>
            <div className={`flex items-center justify-center w-full gap-3 p-3 border-[1px] border-gray-900 rounded `}>
              <FaLock className="text-3xl text-blue-900"/>
              <input className="w-full bg-transparent focus:outline-none" minLength={5} maxLength={16} value={password} onChange={(e)=> {setPassword(e.target.value)}} type={"password"} placeholder="Password" autoComplete="password" required/>
            </div>
            <button type="submit" className="w-full py-2 text-xl font-bold tracking-wide text-gray-200 bg-green-700 rounded-sm shadow-md hover:bg-green-900 shadow-black">
              LOGIN
            </button>
          </div>
          {/* 3 */}
          <div className="w-full tracking-normal">
            <span> New User ? </span>
            <Link to='/register' className="text-red-600 ">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;