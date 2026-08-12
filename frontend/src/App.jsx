import { Routes, Route, Navigate } from 'react-router'
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
import PageLoader from './components/PageLoader.jsx'


function App(){
  // it alows us to fetch data from backend more then 1 time if it gets fails cause it think that the data is not fetched and some problem from server side ,, thats why we use this queryfn tanstack  BEYOND  useState useEffect and useReducer
  const {data:authData , isLoading, error} = useQuery({queryKey:["authUser"],
    queryFn: async() => {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry:false, // it will not retry to fetch the data if it fails
  });  
  const data = authData?.user;  // optional chaining to avoid error if authData is undefined
  console.log(data);


  // while loading 
  if (true) return <PageLoader/>
  

  return(
    <div className=" h-screen " data-theme="coffee">
      {/* <h1>Welcome to ChatApp</h1>
      <button className="btn glass">Glass button</button> */}
      {/* <button onClick={()=> toast.success("Bhechooooo")}>Create the toast</button> */}

      <Routes>
          {/* TODO: make a webpage about application then link to login and signup */}
        {/* <Route path="/" element={authData? <HomePage /> : <Navigate to="/signup" />} />  */}
        
        <Route path="/" element={authData? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authData ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authData ? <LoginPage /> : <Navigate to="/" />} />
        {/* <Route path="/home" element={!authData ? <LoginPage /> : <Navigate to="/home" />} /> */}
        <Route path="/onboarding" element={authData ? <OnboardingPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authData ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authData ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={authData ? <NotificationPage /> : <Navigate to="/login" />} />
      </Routes>

      {/* to use the toaster  */}
      <Toaster/>
    </div>
  )
}
export default App