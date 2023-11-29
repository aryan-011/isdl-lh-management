import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useSnackbar } from '../SnackBar';
import axios from 'axios';
import Card from '../Requests/Card';

function ReqLogs() {
    const [view, setView] = useState("pending");
    const { showSnackbar } = useSnackbar();
    const [reqs, setReqs] = useState({ pending: [], rejected: [], approved: [] });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      fetchReqs();
    }, []);
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    function fetchReqs() {
      const role = localStorage.getItem("role");
      const id = localStorage.getItem("id");
      setLoading(true)
      axios
        .get(`${baseURL}/${role}/myapprovedrequests`, {
          withCredentials: true,
          params: { id },
        })
        .then((resp) => {
          // console.log(resp.data)
          const pending = resp.data.pendingRequests ?? [];
          const rejected = resp.data.rejectedRequests ?? [];
          const approved = resp.data.approvedRequests ?? [];
  
          setReqs((prevState) => ({
            ...prevState,
            pending,
            rejected,
            approved,
          }));
          setLoading(false)
        }).catch(function (err){
          setLoading(false)
        })
    }
    useEffect(()=>{
        fetchReqs()
    },[])
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center w-full h-[80%] ">
      <div className="text-sm font-medium text-center mb-6 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <div
              onClick={() => {
                setView("pending");
              }}
              className={`${
                view === "pending"
                  ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              } p-4 inline-block`}
            >
              Pending
            </div>
          </li>
          <li className="mr-2">
            <div
              onClick={() => {
                setView("approved");
              }}
              className={`${
                view === "approved"
                  ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              } p-4 inline-block`}
              aria-current="page"
            >
              Approved
            </div>
          </li>
          <li className="mr-2">
            <div
              onClick={() => {
                setView("rejected");
              }}
              className={`${
                view === "rejected"
                  ? " text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  : "  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              } p-4 inline-block`}
            >
              Rejected
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 w-full max-h-[90%] overflow-y-auto ">
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {reqs[view].length > 0 ? (
              reqs[view].map((req) => {
                return (
                  <Card
                    data={req}
                    view={view}
                    key={req._id}
                    use="gsec"
                  />
                );
              })
            ) : (
              <div>none to show</div>
            )}
          </>
        )}
      </div>
    </div>
        </div>
    )
}

export default ReqLogs
