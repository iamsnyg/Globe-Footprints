import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function PasswordInput({value, onChange, placeholder}) {

  const [showPassword, setShowPassword] = React.useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div
    className='flex items-center bg-cyan-600/5 px-5  rounded mb-3  focus:border-primary border-solid border-2'
    //px-5
    >
        <input 
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Password'}
        type={showPassword ? 'text' : 'password'}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
        />
        {
      showPassword ? 
       
      (<FaEye 
      onClick={() => toggleShowPassword()}
      className='text-gray-500 cursor-pointer'
      />):
      (<FaEyeSlash 
        onClick={() => toggleShowPassword()}
        className='text-cyan-500 cursor-pointer'
        /> )
    }
    </div>
    
  )
}

export default PasswordInput