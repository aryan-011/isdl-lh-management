import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, redirect,useNavigate } from "react-router-dom";
import "./index.css";
import Login from "./Pages/Login";
import Request from "./Pages/Request";
import BookLt from "./Pages/BookLt";
import { SnackbarProvider } from "./Components/SnackBar";
import axios from "axios";
import Home from "./Components/Home/Home";
import { Cookies, useCookies } from "react-cookie";
import Logout from "./Components/Logout/Logout";
import ReqLogs from "./Components/RequestLog/ReqLogs";

const auth= axios.create({
  baseURL:process.env.REACT_APP_BACKEND_URL,
  withCredentials: true
})
auth.interceptors.request.use((request)=>{
  console.log(request)
  // if(request.headers.cookie){
  //   redirect('/login')
  // }
  return request
},(error)=>{
  return Promise.reject(error)
})
function App() {
  const navigate = useNavigate()
  const cookie=useCookies()
  const [auth,setAuth]=useState(false)
  const validateToken= async ()=>{
    try{
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user`,{withCredentials:true}).then((resp)=>{
        setAuth(true)
        if(localStorage){
          localStorage.setItem('role',resp?.data.user.role)
          localStorage.setItem('id',resp?.data.user.userId)
          localStorage.setItem('email',resp?.data.user.email)
        }
      }).catch(function (err){
        navigate('/login')
      })
    }
    catch(err){
      navigate('/login')
      console.log(err)
    }
  }

  useEffect( ()=>{
      validateToken()
      // console.log(cookie)
      // if(cookie.includes('jwt')){
      //   setAuth(true)
      // }
      // else{
      //   navigate('/login')
      // }
  },[])
  return (
    <SnackbarProvider>
        <Routes>
          {auth && <Route path="/" element={<Home />} />  }
          {auth &&  <Route path="/requests" element={<Request />} /> }
          {auth && <Route path="/book" element={<BookLt />} /> }
          {auth && <Route path="/reqLogs" element={<ReqLogs />} /> }
          <Route path="/login" element={<Login />} />

          <Route path="/logout" element={<Logout/>} />
         
          
        </Routes>
    </SnackbarProvider>
  )
}

export default App
