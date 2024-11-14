import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "../components/Input/PasswordInput";
import { validateEmail } from "../utils/helper";
import  axiosInstance  from '../utils/axiosInstance'

function SignUp() {
  const [name , setName]= useState('')
  const [username, setUsername]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [error, setError]= useState('')

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError('Please enter your name');
      return;
    }

    if(!username){
      setError('Please enter your username');
      return;
    }

    if(!validateEmail(email)){
      setError('Please enter a valid email');
      return;
    }

    

    if(!password){
      setError('Please enter a valid password');
      return;
    }

    setError('');
    

    try {
      const response= await axiosInstance.post("/create-account", { 
        fullName: name,
        username: username,
        email: email,
        password: password
      });
      

      if(response.data && response.data.AccessToken){
        localStorage.setItem("token", response.data.AccessToken);
        
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError('Something went wrong in axios. Please try again');
      }
      console.log("<------------------------>")
    }
  }

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-10" />
      <div className="login-ui-box bg-cyan-200 right-2/3 -bottom-40" />
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end bg-signup-bg-img  bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              
              Join the <br /> Advanture
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              
              Create an account to start documenting your travels and preserving your memories in your personal travel journal.
            </p>
          </div>
        </div>
        <div className="w-2/4 h-[80vh]  bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form action="" onSubmit={handleSignUp}>
            <h4 className="text-2xl semi-bold mb-7">Signup</h4>
            <input
              type="text"
              placeholder="Full Name"
              className="input-box focus:border-primary border-solid border-2 "
              value={name}
              onChange={({target}) => setName(target.value)}
            />

            <input
              type="text"
              placeholder="Username"
              className="input-box focus:border-primary border-solid border-2 "
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
            

            <input
              type="text"
              placeholder="Email"
              className="input-box focus:border-primary border-solid border-2 "
              value={email}
              onChange={({target}) => setEmail(target.value)}
            />

            <PasswordInput
            value={password}
            onChange={({target}) => setPassword(target.value)}
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}    

            <button type="submit" className="btn-primary">
            CREATE ACCOUNT 
            </button>

            <p
            className="text-xs text-slate-500 text-center my-4"
            >Or</p>

            <button
              type="submit"
              //error occurs here
              onClick={() => {
                navigate("/login");
              }}
              className="btn-primary btn-light "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
