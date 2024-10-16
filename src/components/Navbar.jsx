

import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white  w-full top-0 md:mx-0,p-0 sm:mx-0,px-0 sm:w-full'>
      <div className="mycontainer  flex justify-between items-center py-3 h-14 px-1">
        {/* Logo */}
        <div className="logo font-bold text-white text-2xl ">
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'> OP/&gt;</span>
        </div>

        {/* Button */}
        <button className='text-white bg-slate-900 rounded-full items-center  '>
          <img className='invert w-8 p-1 sm:w-10 ' src="icons/github.png" alt="GitHub" />
          {/* <span className='font-bold px-2  md:text-base'>GitHub</span> */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
