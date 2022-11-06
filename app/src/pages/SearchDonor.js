import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';

const SearchDonor = () => {

  return (
    <div className='bg-blue-50'>
      <section className='flex flex-col w-full min-h-screen '>
        <NavigationBar />
        <div className='flex justify-center items-center flex-col min-h-[100vh] '>
          SearchDonor
        </div>
      </section>
      <section className='flex items-center justify-center w-full min-h-screen '>
        SearchDonor
      </section>
    </div>
  );
}

export default SearchDonor;