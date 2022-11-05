import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';

const Landing = () => {

  return (
    <div className='bg-red-50'>
      <section id='home' className='flex flex-col w-full min-h-screen '>
        <NavigationBar />
        <div className='flex justify-center items-center flex-col h-[90vh] '>
          Home
        </div>
      </section>
      <section id='features' className='flex items-center justify-center w-full min-h-screen '>
        Features
      </section>
      <section id='contact' className='flex items-center justify-center w-full min-h-screen '>
        Contact
      </section>
      <section id='about' className='flex items-center justify-center w-full min-h-screen '>
        About
      </section>
      <section id='footer' className='flex items-center justify-center w-full min-h-screen'>
        Footer
      </section>
    </div>
  );
}

export default Landing;