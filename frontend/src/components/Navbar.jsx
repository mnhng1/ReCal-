import React, {useState} from 'react'
import { CgDarkMode } from "react-icons/cg";
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {

    const [nav, setNav] = useState(true)


    const handleNav = () => {
      setNav(!nav)
    } 
    return (
      <div className=' flex  just h-24 items-center max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className=' w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1>
        <ul className='hidden md:flex'>
            <li  className='p-4'>Home</li>
            <li  className='p-4'>About</li>
            <li  className='p-4'>Contact</li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {!nav ? <AiOutlineClose size = {20}/>: <AiOutlineMenu size = {20}/> }
            
        </div>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'  : 'fixed left-[-100%] ease-in-out duration-500'}>
            <h1 className=' w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>
            <ul className = ' uppercase p-4'>
                <li  className='p-4 border-b border-gray-600'>Home</li>
                <li  className='p-4 border-b border-gray-600'>About</li>
                <li  className='p-4 border-b border-gray-600' >Contact</li>
            </ul>
        </div>
      </div>
      
    );
  };
  
export default Navbar;