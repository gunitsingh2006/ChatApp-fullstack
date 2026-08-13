import { Routes, Route, Navigate } from "react-router";
import HomePage from "./Pages/HomePage";
import CallPage from "./Pages/CallPage";
import ChatPage from "./Pages/ChatPage";
import NotificationPage from "./Pages/NotificationPage";
import LoginPage from "./Pages/LoginPage";
import OnboardingPage from "./Pages/OnboardingPage";
import SignupPage from "./Pages/SignupPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "./lib/axios.js";
import PageLoader from "./components/PageLoader.jsx";
import { getAuthUser } from "./lib/api.js";
import useAuthUser from "./hooks/useAuthUser.js";

function App() {
  const { isLoading, authUser } = useAuthUser();
  // const authUser = authData?.user;  // optional chaining to avoid error if authData is undefined
  // console.log(data);

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  // while loading
  if (isLoading) return <PageLoader />;

  return (
    <div className=" h-screen " data-theme="coffee">
      {/* <h1>Welcome to ChatApp</h1>
      <button className="btn glass">Glass button</button> */}
      {/* <button onClick={()=> toast.success("Bhechooooo")}>Create the toast</button> */}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/home"
          element={
            isAuthenticated && isOnboarded ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/home" />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? <OnboardingPage /> : <Navigate to="/home" />
          }
        />

        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />
          }
        />
      </Routes>

      {/* to use the toaster  */}
      <Toaster />
    </div>
  );
}
export default App;
