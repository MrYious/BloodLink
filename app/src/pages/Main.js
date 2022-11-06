import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';

const Main = () => {

  return (
    <div className='bg-blue-50'>
      <section className='flex flex-col w-full min-h-screen '>
        <NavigationBar />
        <div className='flex justify-center items-center flex-col min-h-[100vh] '>
          Main
        </div>
      </section>
      <section className='flex items-center justify-center w-full min-h-screen '>
        Main
      </section>
    </div>
  );
}

export default Main;