import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";


function SearchBar({value, onChange, handleSearch, onClearSearch}) {

  const handleKeyDown=(e)=>{
    if(e.key === "Enter"){
      handleSearch()
    }
}
  return (
    <div 
    className='w-80 flex items-center px-4 bg-blue-50 rounded-2xl'
    >
      <input type="text"
      placeholder='Search Notes...'
      className='w-full text-sm outline-none bg-transparent py-[11px] '
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      />

      {value &&
        <IoMdClose className='text-blue-500 text-lg cursor-pointer mr-3 hover:text-black' onClick={onClearSearch} />
      }

      <FaMagnifyingGlass className='text-blue-500 text-lg cursor-pointer ' onClick={handleSearch} />
    </div>
  )
}

export default SearchBar