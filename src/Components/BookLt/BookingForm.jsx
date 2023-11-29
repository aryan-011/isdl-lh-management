import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { lt, clubs, options } from "./data";
import Datepicker from "tailwind-datepicker-react";
import axios from "axios";
import { useSnackbar } from "../SnackBar";

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { startDate: new Date(), endDate: new Date() },
    timeIn: "18:30",
    timeOut: "22:30",
  });

  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const startTime = getValues("timeIn");
  const outTime = getValues("timeOut");
  const { showSnackbar } = useSnackbar();
  const [isAfterInTime, setIsAfterInTime] = useState(false);
  const [show, setShow] = useState(false);
  const [showend, setShowEnd] = useState(false);

  const handleStartChange = (selectedDate) => {
    // console.log(selectedDate);
    setValue("startDate", selectedDate.toString());
    setValue("endDate", selectedDate.toString());
  };
  const handleEndChange = (selectedDate) => {
    // console.log(selectedDate);
    setValue("endDate", selectedDate.toString());
  };
  //   console.log(getValues('startDate'))
  const handleClose = (state) => {
    setShow(state);
  };
  const handleendClose = (state) => {
    setShowEnd(state);
  };
  const handleTimeChange = (event) => {
    const endTime = event.target.value;
    // console.log(endTime >= "22:45" || endTime < "6:00");
    setIsAfterInTime(endTime >= "22:45" || endTime < "06:00" ? true : false);
    // setIsAfterInTime()
  };

  const onSubmit = (data) => {
    const bookingDetails = {
      ltNumber: data.lectureHall,
      startDate: new Date(`${data.startDate}`).toDateString(),
      endDate: new Date(`${data.endDate}`).toDateString(),
      reason: data.reason,
      clubName: data.club,
      bookedBy: localStorage.getItem("role"),
      avSupport: data.av ? "yes" : "no",
      startTime: data.timeIn,
      endTime: data.timeOut,
      facultyMentorEmail: "21ucs018@lnmiit.ac.in",
    };

    // Parse the endDate string into a Date object
    const endDate = new Date(bookingDetails.endDate)
    
    const [hours, minutes, seconds] = bookingDetails.endTime.split(":").map(Number);
    console.log(hours,minutes,seconds)
    // Set the time components to the endDate
    endDate.setHours(hours);
    endDate.setMinutes(minutes);
    endDate.setSeconds(0);
    // console.log(endDate)

    const startDate = new Date(bookingDetails.startDate)
    
    const [hrs, min, sec] = bookingDetails.startTime.split(":").map(Number);

    // Set the time components to the endDate
    startDate.setHours(hrs);
    startDate.setMinutes(min);
    startDate.setSeconds(0);
    bookingDetails.startDate=startDate
    bookingDetails.endDate=endDate
    console.log(bookingDetails)
    // console.log(endDate>startDate);
    
    try{
      
          axios.post(`${baseURL}/gsec/makerequest`,{...bookingDetails},{withCredentials:true}).then((resp)=>{
            if(resp.status===200){
              if(resp.data.success){
                showSnackbar({message:'Booking Request sent succesfully',useCase:'success'})
              }
              else{
                showSnackbar({message:resp.data.msg,useCase:'info'})
              }
            }
            else{
              showSnackbar({message:'try again',useCase:'error'})
            }
          }).catch(function (err){
            showSnackbar({message:'try again',useCase:'error'})
          })
    }
    catch(err){

    }
  };
  // console.log(getValues('timeIn'))
  return (
    <form
      className="flex flex-col items-center gap-4 w-fit border border-gray-300 dark:border-gray-500 rounded-lg  h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col max-w-[700px] p-5">
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Dates Range
          </label>
          <div className="flex w-full items-center">
            <Datepicker
              options={{ ...options, title: "Start Date" }}
              onChange={handleStartChange}
              show={show}
              setShow={handleClose}
            />
            <input
              hidden
              type="text"
              defaultValue={new Date()}
              {...register("startDate", { required: true })}
            />
            <span className="mx-4 text-gray-500">to</span>
            <Datepicker
              options={{
                ...options,
                minDate: new Date(getValues("startDate")),
                title: "End Date",
              }}
              value={
                new Date(getValues("startDate")) >
                new Date(getValues("endDate"))
                  ? new Date(getValues("startDate"))
                  : new Date(getValues("endDate"))
              }
              onChange={handleEndChange}
              show={showend}
              setShow={handleendClose}
            />
            <input
              hidden
              type="text"
              defaultValue={new Date()}
              {...register("endDate", { required: true })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Time range*
          </label>
          <div className="flex flex-row gap-4 items-center">
            <div>
              <input
                type="time"
                defaultValue="18:30:00"
                placeholder="18:30"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("timeIn", {
                  required: true,
                })}
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div>
              <input
                type="time"
                defaultValue="22:30:00"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("timeOut", {
                  onChange: handleTimeChange,
                  required: true,
                })}
              />
            </div>
          </div>
        </div>
        {isAfterInTime && (
          <div className="mb-4">
            <label className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Night extension list*
            </label>
            <input
              type="file"
              className="rounded-md border p-2"
              accept="application/pdf"
              {...register("pdf", {
                required: isAfterInTime ? true : false,
              })}
            />
          </div>
        )}
        {/* <div className="flex flex-row gap-2">
        <label>Date range</label>
        <DatePicker
          name="dateRange"
          {...register("dateRange", {
            required: true,
          })}
        />
      </div> */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Lecture hall*
          </label>
          <select
            name="lectureHall"
            {...register("lectureHall", {
              required: true,
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {lt.map((lt) => {
              return (
                <option value={lt.value} key={lt.value}>
                  {lt.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Reason*
          </label>
          <input
            type="text"
            {...register("reason", {
              required: true,
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Club*
          </label>
          <select
            name="Club"
            {...register("club", {
              required: true,
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {clubs.map((club) => {
              return (
                <option value={club.value} key={club.value}>
                  {club.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-row gap-2 items-center mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {" "}
            Av support Required?{" "}
          </label>
          <input
            name="avSupport"
            type="checkbox"
            {...register("av")}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <button type="submit" className="bg-blue-500 rounded-md p-2">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;