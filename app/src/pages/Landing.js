import { FaAngleRight, FaFacebookF, FaInstagram, FaRedditAlien, FaTwitter, FaYoutube } from "react-icons/fa";

import { Link } from "react-router-dom";
import NavigationBar from '../components/NavigationBar';
import feature1 from '../assets/images/feature1.png'

const Landing = () => {

  return (
    <div className='bg-blue-50'>
      {/* HERO BANNER */}
      <section id='home' className='flex flex-col w-full min-h-screen bg-cover bg-hero-banner'>
        <NavigationBar />
        <div className='flex flex-col justify-center items-center min-h-[100vh] '>
          <div className='flex flex-col items-start justify-center gap-5 py-8 -ml-[40%] bg-blue-200 shadow-black shadow-md px-9 bg-opacity-80 backdrop-blur-sm'>
            <div className='flex flex-col font-bold text-7xl'>
              <div className=''>SHARE YOUR</div>
              <div className='text-red-600 '>POWER</div>
            </div>
            <div className='text-3xl italic'>
              Your <span className='text-red-600'>blood</span> can save <span className='border-b-2 border-blue-800'> lives </span>
            </div>
            <Link to={'/register'} className='flex items-center px-4 py-2 mb-2 text-xl text-white bg-red-800 rounded-md shadow-sm w-fit shadow-black hover:bg-red-900'>
              <FaAngleRight className="text-md"/>
              Become a DONOR
            </Link>
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section id='features' className='flex flex-col items-center justify-center w-full min-h-[90vh] gap-10 bg-gray-200 py-10 lg:py-0'>
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
            <div className="flex flex-col items-center justify-center gap-3 p-3 bg-blue-50">
              <div className="text-xl font-bold ">Feature 1</div>
              <div className="text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel voluptatem dicta iste quisquam totam cumque iure facere fugit magni rem vitae dolorum quaerat suscipit architecto, alias minus distinctio tempor
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col justify-start items-center w-[80%] md:w-[40%] lg:w-[25%] rounded-md shadow-sm shadow-black overflow-hidden">
            <img src={feature1} alt="feature1" className="w-full" />
            <div className="flex flex-col items-center justify-center gap-3 p-3 bg-blue-50">
              <div className="text-xl font-bold ">Feature 2</div>
              <div className="text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel voluptatem dicta iste quisquam totam cumque iure facere fugit magni rem vitae dolorum quaerat suscipit architecto, alias minus distinctio tempor
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="flex flex-col justify-start items-center w-[80%] md:w-[40%] lg:w-[25%] rounded-md shadow-sm shadow-black overflow-hidden">
            <img src={feature1} alt="feature1" className="w-full" />
            <div className="flex flex-col items-center justify-center gap-3 p-3 bg-blue-50">
              <div className="text-xl font-bold ">Feature 3</div>
              <div className="text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel voluptatem dicta iste quisquam totam cumque iure facere fugit magni rem vitae dolorum quaerat suscipit architecto, alias minus distinctio tempor
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CONTACT */}
      <section id='contact' className='flex flex-col items-center justify-center w-full min-h-[90vh] bg-cover bg-contact bg-center py-16'>
        <div className="flex flex-col items-center justify-center rounded overflow-hidden w-[85%] md:[80%] gap-10 p-10 bg-blue-50 shadow-md shadow-black">

          <div className="flex flex-col gap-1 bg-gray-100">
            <div className="px-5 text-4xl">
              Contact Us
            </div>
            <div className="w-full h-0 border-[3px] border-red-700 rounded-full"></div>
          </div>

          <div className="flex flex-col items-start justify-center w-full gap-10 lg:flex-row">
            <form className="flex flex-col items-center justify-start w-[100%] lg:w-[40%]  gap-4 bg-opacity-80 backdrop-blur-sm">
              <input type="text" placeholder="Name" required className="w-full p-2 border-[1px] border-gray-900 rounded focus:text-gray-700 focus:border-red-800 focus:outline-none"/>
              <input type="text" placeholder="Email Address" required className="w-full p-2 border-[1px] border-gray-900 rounded focus:text-gray-700 focus:border-red-800 focus:outline-none"/>
              <textarea placeholder="Message" rows={5} required className="w-full p-2 border-[1px] border-gray-900 rounded resize-none focus:text-gray-700 focus:border-red-800 focus:outline-none"/>
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
              <div className="flex flex-col items-center gap-3 lg:gap-5 lg:items-start">
                <div className="flex flex-wrap justify-center w-full gap-3 lg:justify-start lg:gap-5">
                  <div className="flex w-fit">
                    <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                      <FaAngleRight />
                    </div>
                    <div className="flex flex-col items-start justify-between w-full p-2">
                      <div className="font-bold">Technical Support</div>
                      <div className="text-sm">support@example.com</div>
                    </div>
                  </div>
                  <div className="flex w-fit">
                    <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                      <FaAngleRight />
                    </div>
                    <div className="flex flex-col items-start justify-between w-full p-2">
                      <div className="font-bold">Technical Support</div>
                      <div className="text-sm">support@example.com</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center w-full gap-3 lg:justify-start lg:gap-5">
                  <div className="flex w-fit">
                    <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                      <FaAngleRight />
                    </div>
                    <div className="flex flex-col items-start justify-between w-full p-2">
                      <div className="font-bold">Technical Support</div>
                      <div className="text-sm">support@example.com</div>
                    </div>
                  </div>
                  <div className="flex w-fit">
                    <div className="flex items-center justify-center p-4 text-3xl text-white bg-red-700 rounded-lg shrink-0">
                      <FaAngleRight />
                    </div>
                    <div className="flex flex-col items-start justify-between w-full p-2">
                      <div className="font-bold">Technical Support</div>
                      <div className="text-sm">support@example.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section id='about' className='flex items-center justify-center w-full min-h-[90vh] '>
        About
      </section>
      {/* FOOTER */}
      <section id='footer' className='flex w-full h-[30vh] bg-slate-300'>
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