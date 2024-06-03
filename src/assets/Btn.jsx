import React from 'react';

function Btn({ item }) {
  return (
    <button className='py-2 px-7 m-5 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-3xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:from-green-500 hover:to-blue-600'>
      {item}
    </button>
  );
}

export default Btn;
