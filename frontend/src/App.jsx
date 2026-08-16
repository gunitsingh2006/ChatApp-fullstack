import { Routes, Route, Navigate } from "react-router";
import HomePage from "./Pages/HomePage";
import CallPage from "./Pages/CallPage";
import ChatPage from "./Pages/ChatPage";
import NotificationPage from "./Pages/NotificationPage";
import LoginPage from "./Pages/LoginPage";
import OnboardingPage from "./Pages/OnboardingPage";
import SignupPage from "./Pages/SignupPage";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import Layout from "./components/Layout.jsx";
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
    <div className=" h-screen " data-theme="business">
      {/* <h1>Welcome to ChatApp</h1>
      <button className="btn glass">Glass button</button> */}
      {/* <button onClick={()=> toast.success("Bhechooooo")}>Create the toast</button> */}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/home"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate
                to={!isAuthenticated ? "/login" : "/onboarding"}
                replace
              />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : isOnboarded ? (
              <Navigate to="/home" replace />
            ) : (
              <OnboardingPage />
            )
          }
        />
      </Routes>

      {/* to use the toaster  */}
      <Toaster />
    </div>
  );
}
export default App;
