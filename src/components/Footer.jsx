import React from 'react'

const Footer = () => {
  return (
    <div className='mt-3 bg-slate-800 text-white  flex flex-col justify-center items-center  bottom-0 w-full'>

        <div className="logo font-bold text-white text-2xl ">
        <span className='text-green-700'> &lt;</span>Pass<span></span> 
        <span className='text-green-700'> OP/&gt;</span>
        </div>
      <div className="flex justify-center items-center ">Created with <img className='w-5 mx-2' src="icons/heart.png" alt="" /> by Shivam</div>
    </div>
  )
}

export default Footer
