import React, { useContext } from 'react';
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";

function Header() {
  const { header, backgenre } = useContext(Contextpage);

  return (
    <>
      <header className={`flex items-center ${backgenre ? 'justify-start gap-4 md:gap-6' : 'justify-center'} text-2xl md:text-3xl font-semibold text-gray-900 py-4 px-6 md:px-12 bg-white shadow-md rounded-md`}>

        {backgenre &&
          <a href='/' className='bg-gray-100 text-gray-900 p-2 md:p-3 rounded-full text-lg md:text-xl transition-all duration-300 ease-in-out hover:bg-gray-200 hover:shadow-lg'>
            <HiChevronLeft />
          </a>
        }

        <span className='flex-grow text-center md:text-left'>{header}</span>
      </header>
    </>
  );
}

export default Header;

