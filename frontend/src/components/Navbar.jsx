import React from 'react'
import LOGO from '../assets/images/logo.png'
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom';
import SearchBar from './Input/SearchBar';

function Navbar({userInfo, setSearchQuery, searchQuery, onSearchNote, handleClearSearch}) {

    const isToken=localStorage.getItem('token');
    // console.log("isToken", isToken)
    

    const navigator=useNavigate();
    const onLogout=()=>{
        localStorage.clear();
        navigator('/login')
    }

    const handleSearch=()=>{
      if(searchQuery){
        onSearchNote(searchQuery);
      }
    }

    const onClearSearch=()=>{
      handleClearSearch();
      setSearchQuery("");
    }
  return (
    <div className='bg-white flex items-center justify-between h-20 shadow-md sticky top-0 px-6  z-50'>
        <img src={LOGO} alt="Travel-logo" className='h-36' />

        {isToken && 
          <div 
          className='flex items-center gap-7 w-1/2 justify-end'
          >
            <SearchBar 
            value={searchQuery}
            onChange={({target})=>{setSearchQuery(target.value)}}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            />
            <ProfileInfo  userInfo={userInfo} onLogout={onLogout}/>
          </div>
        } 
    </div>
  )
}



export default Navbar