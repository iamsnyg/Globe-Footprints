import React from 'react'
import { getInitials } from '../../utils/helper'

function ProfileInfo({userInfo, onLogout}) {

    
  return (
    userInfo && (<div className='flex items-center gap-3'>
        <div
        className='h-10 w-10 bg-blue-300 text-blue-950 rounded-full flex items-center justify-center'
        >
            {/* {userInfo?.fullName?.charAt(0).toUpperCase() || ""} */}
            {getInitials(userInfo?.fullName) || ""}
        </div>

        <div className=''>
            <p className='text-sm font-medium'>{userInfo?.fullName || ""}</p>
            {/* <p className='text-sm font-medium'>{userInfo}</p> */}
            <button className='text-sm text-slate-700 underline' onClick={onLogout}>Logout</button>
        </div>
    </div>)
  )
}

export default ProfileInfo