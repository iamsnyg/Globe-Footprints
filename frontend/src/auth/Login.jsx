import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "../components/Input/PasswordInput";
import { validateEmail } from "../utils/helper";
import  axiosInstance  from '../utils/axiosInstance'

function Login() {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [error, setError]= useState('')

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError('Please enter a valid email');
      return;
    }
    if(!password){
      setError('Please enter a valid password');
      return;
    }

    setError('');
    console.log("-------------------")

    try {
      const response= await axiosInstance.post("/login", { 
        email: email,
        password: password
      });
      console.log(response);

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
        <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img  bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
            Capture your <br /> Journey
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
            Record your Travel Experiences and memories in your personal
            Journal.
            </p>
          </div>
        </div>
        <div className="w-2/4 h-[75vh]  bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form action="" onSubmit={handleLogin}>
            <h4 className="text-2xl semi-bold mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email or Username"
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
              Login
            </button>

            <p
            className="text-xs text-slate-500 text-center my-4"
            >Or</p>

            <button
              type="submit"
              //error occurs here
              onClick={() => {
                navigate("/signUp");
              }}
              className="btn-primary btn-light"
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
