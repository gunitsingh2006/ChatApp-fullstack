import { Routes, Route } from 'react-router'
import HomePage from './Pages/HomePage'
import CallPage from './Pages/CallPage'
import ChatPage from './Pages/ChatPage'
import NotificationPage from './Pages/NotificationPage'
import LoginPage from './Pages/LoginPage'
import OnboardingPage from './Pages/OnboardingPage'
import SignupPage from './Pages/SignupPage'

import toast, { Toaster } from 'react-hot-toast'
function App(){
  return(
    <div className=" h-screen " data-theme="coffee">
      {/* <h1>Welcome to ChatApp</h1>
      <button className="btn glass">Glass button</button> */}
      <button onClick={()=> toast.success("Bhechooooo")}>Create the toast</button>

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