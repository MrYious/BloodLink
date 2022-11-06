import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';

const Landing = () => {

  return (
    <div className='bg-blue-50'>
      <section id='home' className='flex flex-col w-full min-h-screen bg-cover bg-hero-banner'>
        <NavigationBar />
        <div className='flex justify-center items-center flex-col min-h-[100vh] '>
        </div>
      </section>
      <section id='features' className='flex items-center justify-center w-full min-h-[90vh] '>
        Features
      </section>
      <section id='contact' className='flex items-center justify-center w-full min-h-[90vh] bg-cover bg-contact bg-center'>
        
      </section>
      <section id='about' className='flex items-center justify-center w-full min-h-[90vh] '>
        About
      </section>
      <section id='footer' className='flex items-center justify-center w-full h-[30vh]'>
        Footer
      </section>
    </div>
  );
}

export default Landing;