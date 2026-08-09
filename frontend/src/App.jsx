import { Routes, Route } from 'react-router'
import HomePage from './Pages/HomePage'
import CallPage from './Pages/CallPage'
import ChatPage from './Pages/ChatPage'
import NotificationPage from './Pages/NotificationPage'
import LoginPage from './Pages/LoginPage'
import OnboardingPage from './Pages/OnboardingPage'
import SignupPage from './Pages/SignupPage'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { axiosInstance } from './lib/axios.js'


function App(){
  const {data , isLoading, error} = useQuery({queryKey:["todos"],
    // it alows us to fetch data from backend more then 1 time if it gets fails cause it think that the data is not fetched and some problem from server side ,, thats why we use this queryfn tanstack  BEYOND  useState useEffect and useReducer
    queryFn: async() => {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry:false, // it will not retry to fetch the data if it fails
  });  
  console.log(data);
  
  return(
    <div className=" h-screen " data-theme="coffee">
      {/* <h1>Welcome to ChatApp</h1>
      <button className="btn glass">Glass button</button> */}
      {/* <button onClick={()=> toast.success("Bhechooooo")}>Create the toast</button> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>

      {/* to use the toaster  */}
      <Toaster/>
    </div>
  )
}
export default App