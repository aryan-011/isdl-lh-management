import axios from "axios";
import React, { useEffect } from "react";
import { useSnackbar } from "../SnackBar";
import { redirect, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Cookies } from "react-cookie";
function LoginSection() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const {showSnackbar}=useSnackbar()
  const navigate= useNavigate()
  const baseURL=process.env.REACT_APP_BACKEND_URL
  useEffect(()=>{
    
  },[])
  const login = (data)=>{
    const loginPayload={
      email:data.email,
      password:data.password
    }
    axios.post(`${baseURL}/auth/login`,loginPayload,{withCredentials:true}).then((resp)=>{
      if(resp.status===401){
        showSnackbar({message:'Invalid Credentials',useCase:'error'})
      }
      else if(resp.status===500){
        showSnackbar({message:'There seems to be some issues from our side.Please try agin later',useCase:'info'})
      }
      else{
        console.log(resp)
        if(resp?.data.user.role==='assistantRegistrar'|| resp?.data.user.role==='systemAdministrator'||resp?.data.user.role==='facultyMentor'){
          if(localStorage){
            localStorage.setItem('role',resp?.data.user.role)
            localStorage.setItem('id',resp?.data.user.id)
            localStorage.setItem('email',resp?.data.user.email)
          }
          navigate('/requests')
          showSnackbar({message:'logged in succesfully',useCase:'success'})
        }
        else if(resp?.data.user.role==='gsec'){
          localStorage.setItem('role',resp?.data.user.role)
          localStorage.setItem('id',resp?.data.user.id)
          localStorage.setItem('email',resp?.data.user.email)
          navigate('/book')
          showSnackbar({message:'logged in succesfully',useCase:'success'})
        }
        else{
          navigate('/')
        }
      }
    }).catch(function (err){
      showSnackbar({message:'try again',useCase:'error'})
    })
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          /> */}
          LNMIIT LH Management
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(login)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginSection;
