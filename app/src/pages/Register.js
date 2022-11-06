import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';

const Register = () => {

  return (
    <div className='bg-blue-50'>
      <section className='flex flex-col w-full min-h-screen '>
        <NavigationBar />
        <div className='flex justify-center items-center flex-col min-h-[100vh] '>
          Register
        </div>
      </section>
      <section className='flex items-center justify-center w-full min-h-screen '>
        Register
      </section>
    </div>
  );
}

export default Register;