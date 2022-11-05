import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll'

const NavigationBar = () => {

  return (
    <section className='flex items-center justify-start w-full h-[10vh] bg-red-100'>
      
      <div className='font-bold '>
        BloodLink
      </div>

      <ScrollLink
        activeClass="active"
        to={'home'}
        spy={true}
        smooth={true}
        duration={500}
        className="flex items-center gap-1 px-3 py-1 text-lg font-medium cursor-pointer hover:bg-red-800 hover:text-white w-fit"
      >
        Home
      </ScrollLink>
    </section>
  );
}

export default NavigationBar;