import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';

const Login = () => {

  return (
    <div className='bg-blue-50'>
      <section className='flex flex-col w-full min-h-screen '>
        <NavigationBar />
        <div className='flex justify-center items-center flex-col min-h-[100vh] '>
          Login
        </div>
      </section>
      <section className='flex items-center justify-center w-full min-h-screen '>
        Login
      </section>
    </div>
  );
}

export default Login;