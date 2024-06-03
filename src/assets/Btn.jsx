import React from 'react';

function Btn({ item }) {
  return (
    <button className='py-2 px-7 m-5 bg-[#1f2937] text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#3b4252] border-2 border-transparent hover:border-[#88c0d0] hover:shadow-[#88c0d0] hover:shadow-lg'>
      {item}
    </button>
  );
}

export default Btn;

