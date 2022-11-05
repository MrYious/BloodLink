import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';

const Landing = () => {

  return (
    <div className='bg-red-50'>
      <section className='flex flex-col w-full min-h-screen '>
        <NavigationBar />
        <div className='flex justify-center items-center flex-col h-[90vh] '>
          Home
        </div>
      </section>
      <section className='flex items-center justify-center w-full min-h-screen '>
        Features
      </section>
      <section className='flex items-center justify-center w-full min-h-screen '>
        Contact
      </section>
      <section className='flex items-center justify-center w-full min-h-screen '>
        About
      </section>
      <section className='flex items-center justify-center w-full min-h-screen'>
        Footer
      </section>
    </div>
  );
}

export default Landing;