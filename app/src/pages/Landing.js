import {
  FaBug,
  FaBullhorn,
  FaFacebookF,
  FaHandHoldingMedical,
  FaHeadset,
  FaInstagram,
  FaLaptopCode,
  FaRedditAlien,
  FaSearch,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

import { Link } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import feature1 from '../assets/images/feature1.png'

const Landing = () => {

  return (
    <div className='bg-gray-200'>
      {/* HERO BANNER */}
      <section id='home' className='flex flex-col w-full min-h-screen bg-cover bg-hero-banner'>
        <NavigationBar />
        <div className='flex flex-col justify-center items-center min-h-[100vh] '>
          <div className='flex flex-col items-start justify-center gap-5 py-8  lg:-ml-[40%] bg-blue-200 shadow-black shadow-md px-9 bg-opacity-80 backdrop-blur-sm'>
            <div className='flex flex-col text-5xl font-bold md:text-6xl lg:text-7xl'>
              <div className=''>SHARE YOUR</div>
              <div className='text-red-600 '>POWER</div>
            </div>
            <div className='text-xl italic lg:text-3xl md:text-2xl'>
              Your <span className='text-red-600'>blood</span> can save <span className='border-b-2 border-blue-800'> lives </span>
            </div>
            <div className="flex gap-2">
              <Link to={'/register'} className='flex items-center gap-2 px-4 py-2 mb-2 text-white bg-red-800 rounded-md shadow-sm text-md md:text-lg lg:text-xl w-fit shadow-black hover:bg-red-900'>
                <FaHandHoldingMedical className="text-md"/>
                Be a DONOR
              </Link>
              <Link to={'/search'} className='flex items-center gap-2 px-4 py-2 mb-2 text-white bg-red-800 rounded-md shadow-sm text-md md:text-lg lg:text-xl w-fit shadow-black hover:bg-red-900'>
                <FaSearch className="text-md"/>
                Browse Donors
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section id='features' className='flex flex-col items-center justify-center w-full min-h-[90vh] gap-10 py-10 lg:py-0 '>
        <div className="flex flex-col gap-1">
          <div className="px-5 text-4xl">
            Features
          </div>
          <div className="w-full h-0 border-[3px] border-red-700 rounded-full"></div>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center w-full gap-5 md:flex-row">
          {/* 1 */}
          <div className="flex flex-col justify-start items-center w-[80%] md:w-[40%] lg:w-[25%] rounded-md shadow-sm shadow-black overflow-hidden">
            <img src={feature1} alt="feature1" className="w-full" />
            <div className="flex flex-col items-center justify-center w-full gap-3 p-3 bg-blue-50">
              <div className="text-xl font-bold ">Browse Donors</div>
              <div className="text-center">
                The platform offers a wide selection of registered users based on the active donors. We also use filters to limit the results into more the specific ones.
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col justify-start items-center w-[80%] md:w-[40%] lg:w-[25%] rounded-md shadow-sm shadow-black overflow-hidden">
            <img src={feature1} alt="feature1" className="w-full" />
            <div className="flex flex-col items-center justify-center w-full gap-3 p-3 bg-blue-50">
              <div className="text-xl font-bold ">Connect with others</div>
              <div className="text-center">
                Surfing the list of donors enables the blood donation seekers to connect with their preferred donors by initiating a request alongside a short message.
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="flex flex-col justify-start items-center w-[80%] md:w-[40%] lg:w-[25%] rounded-md shadow-sm shadow-black overflow-hidden">
            <img src={feature1} alt="feature1" className="w-full" />
            <div className="flex flex-col items-center justify-center w-full gap-3 p-3 bg-blue-50">
              <div className="text-xl font-bold ">Profile and Past Records</div>
              <div className="text-center">
                In this feature, the users are capable to creating their profiles and see other's profile. The profile includes their donation history and other records
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT */}
      <section id='contact' className='flex flex-col items-center justify-center w-full min-h-[90vh] bg-cover bg-contact bg-center py-16 '>
        <div className="flex flex-col items-center justify-center  overflow-hidden w-[85%] md:[80%] gap-10 p-10 bg-slate-300 shadow-md shadow-black">
          <div className="flex flex-col gap-1 ">
            <div className="px-5 text-4xl">
              Contact Us
            </div>
            <div className="w-full h-0 border-[3px] border-red-700 rounded-full"></div>
          </div>
          <div className="flex flex-col items-start justify-center w-full gap-10 lg:flex-row">
            <form className="flex flex-col items-center justify-start w-[100%] lg:w-[40%]  gap-4 bg-opacity-80 backdrop-blur-sm">
              <input type="text" placeholder="Name" required className="w-full p-2 border-[1px] border-gray-900 rounded bg-slate-200 focus:text-gray-700 focus:border-red-800 focus:outline-none"/>
              <input type="text" placeholder="Email Address" required className="w-full p-2 border-[1px] border-gray-900 rounded bg-slate-200 focus:text-gray-700 focus:border-red-800 focus:outline-none"/>
              <textarea placeholder="Message" rows={5} required className="w-full p-2 border-[1px] border-gray-900 rounded resize-none bg-slate-200 focus:text-gray-700 focus:border-red-800 focus:outline-none"/>
              <button className="w-full p-2 font-bold text-white bg-red-800 rounded shadow-sm resize-none hover:bg-red-900 shadow-black ">SEND</button>
            </form>
            <div className="flex flex-col w-[100%] lg:w-[60%] gap-10 ">
              <div className="flex flex-col items-center gap-3 lg:items-start">
                <div className="text-3xl ">
                  Get in <span className="border-b-2 border-blue-700">touch</span>
                </div>
                <div className="flex gap-3 text-2xl">
                  <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
                    <FaFacebookF />
                  </div>
                  <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
                    <FaInstagram />
                  </div>
                  <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
                    <FaRedditAlien />
                  </div>
                  <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
                    <FaTwitter />
                  </div>
                  <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
                    <FaYoutube />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-around w-full gap-3 lg:gap-5">
                <div className="flex w-[85%] md:w-[48%] ">
                  <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                    <FaHeadset />
                  </div>
                  <div className="flex flex-col items-start justify-between w-full p-2">
                    <div className="font-bold">Technical Support</div>
                    <div className="text-sm">support@bloodlink.com</div>
                  </div>
                </div>
                <div className="flex w-[85%] md:w-[48%] ">
                  <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                    <FaLaptopCode />
                  </div>
                  <div className="flex flex-col items-start justify-between w-full p-2">
                    <div className="font-bold">Developer</div>
                    <div className="text-sm">developers@bloodlink.com</div>
                  </div>
                </div>
                <div className="flex w-[85%] md:w-[48%] ">
                  <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                    <FaBullhorn />
                  </div>
                  <div className="flex flex-col items-start justify-between w-full p-2">
                    <div className="font-bold">Promotions</div>
                    <div className="text-sm">promote@bloodlink.com</div>
                  </div>
                </div>
                <div className="flex w-[85%] md:w-[48%] ">
                  <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                    <FaBug />
                  </div>
                  <div className="flex flex-col items-start justify-between w-full p-2">
                    <div className="font-bold">Bug Report</div>
                    <div className="text-sm">report@bloodlink.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section id='about' className='flex flex-col items-center justify-center w-full min-h-[90vh]  '>
        <div className="flex flex-col gap-1 py-10">
          <div className="px-5 text-4xl">
            About Us
          </div>
          <div className="w-full h-0 border-[3px] border-red-700 rounded-full"></div>
        </div>
        {/* ROW 1 */}
        <div className="flex items-center justify-around gap-10 min-h-[40vh]  w-full py-5 flex-col lg:flex-row">
          <div className="flex flex-col gap-4 w-[85%] lg:w-[45%]   p-3">
            <div className="flex flex-col text-5xl lg:text-6xl">
              <div className="">What is  </div>
              <div className="font-bold text-red-800">BloodLink ?</div>
            </div>
            <div className="text-justify ">
              BloodLink is a community of people motivated to help save others thru blood donation. In this platform, people are motivated to become blood donors where any people can browse, search and ask for help.
            </div>
          </div>
          <div className="w-[85%] lg:w-[35%]  bg-about3 bg-cover h-80 rounded-md shadow-md shadow-black ">
          </div>
        </div>
        {/* ROW 2 */}
        <div className="flex items-center justify-evenly min-h-[30vh] w-full py-5 flex-col-reverse lg:flex-row gap-10">
          <div className="w-[85%] lg:w-[35%]  bg-about1 bg-cover h-80 rounded-md shadow-md shadow-black ">
          </div>
          <div className="flex flex-col gap-4 w-[85%] lg:w-[22%]  p-3">
            <div className="text-2xl font-bold">
              Our <span className=" border-b-[1px] border-red-800">Mission</span>
            </div>
            <div className="text-justify ">
              To create and maintain a healthy community of donors by providing an easy-to-use social platform where they can connect.
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[85%] lg:w-[22%]  p-3">
            <div className="text-2xl font-bold">
              Our <span className=" border-b-[1px] border-red-800">Vision</span>
            </div>
            <div className="text-justify ">
              To be one of pioneers of a united health system where people are continuously being motivated and inspired to work together.
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <section id='footer' className='hidden lg:flex w-full h-[30vh] bg-slate-300'>
        {/* Column 1 */}
        <div className="flex flex-col items-center justify-center w-[35%] gap-2 py-5 ">
          <Link to={'/'} className='text-[55px] p-4 flex items-center shrink-0 leading-tight'>
            <span className='text-red-700'>
              Blood
            </span>
            <span className='border-b-2 border-blue-600'>
              Link
            </span>
          </Link>
          <div>© 2022 Copyright | BloodLink</div>
          <div className="gap-2 text-sm">All rights reserved.</div>
        </div>
        {/* Column 2 */}
        <div className="flex w-[25%]">
          <div className="flex flex-col w-[45%] gap-3 p-5 ">
            <Link to="/#home" className='flex gap-1 px-2 py-1 cursor-pointer center w-22 hover:border-red-700 hover:border-l-2 hover:pl-5 hover:text-red-900'>Home</Link>
            <Link to="/#features" className='flex gap-1 px-2 py-1 cursor-pointer w-22 hover:border-red-700 hover:border-l-2 hover:pl-5 hover:text-red-900'>Features</Link>
            <Link to="/#contact" className='flex gap-1 px-2 py-1 cursor-pointer w-22 hover:border-red-700 hover:border-l-2 hover:pl-5 hover:text-red-900'>Contact</Link>
            <Link to="/#about" className='flex gap-1 px-2 py-1 cursor-pointer w-22 hover:border-red-700 hover:border-l-2 hover:pl-5 hover:text-red-900'>About</Link>
          </div>
          <div className="flex flex-col w-[55%] gap-3 p-5 ">
            <Link to="/search" className='flex gap-1 px-2 py-1 cursor-pointer w-22 hover:border-red-700 hover:border-l-2 hover:pl-5 hover:text-red-900'>Search Donors</Link>
            <Link to="/login" className='flex gap-1 px-2 py-1 cursor-pointer w-22 hover:border-red-700 hover:border-l-2 hover:pl-5 hover:text-red-900'>Sign In</Link>
            <Link to="/register" className='flex gap-1 px-2 py-1 cursor-pointer w-22 hover:border-red-700 hover:border-l-2 hover:pl-5 hover:text-red-900'>Sign Up</Link>
          </div>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col items-center justify-center w-[40%] ">
          <div className="flex gap-3 text-2xl">
            <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
              <FaFacebookF />
            </div>
            <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
              <FaInstagram />
            </div>
            <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
              <FaRedditAlien />
            </div>
            <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
              <FaTwitter />
            </div>
            <div className="p-2 text-white bg-red-700 rounded-full shadow-sm cursor-pointer shadow-black hover:bg-red-900">
              <FaYoutube />
            </div>
          </div>
          <form className="flex flex-col items-start justify-center gap-2 py-5 ">
            <div className="font-semibold ">Sign up for our newsletter:</div>
            <div className="flex gap-4">
              <input type="email" placeholder="Email Address" required className="w-80 p-2 border-[1px] border-gray-900 rounded focus:text-gray-700 focus:border-red-800 focus:outline-none"/>
              <button className="px-5 py-2 font-bold text-white bg-red-800 rounded shadow-sm resize-none hover:bg-red-900 shadow-black">SUBSCRIBE</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Landing;