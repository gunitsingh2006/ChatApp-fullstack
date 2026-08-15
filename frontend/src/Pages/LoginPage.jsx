import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../lib/api";
import { Link } from "react-router";
import { Earth } from "lucide-react";

const LoginPage=()=> {
const [loginData, setLoginData] = useState({
    email: "",
    password: "",
});
const queryClient = useQueryClient();
const{mutate:loginMutation , isPending, error} = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidate({ queryKey: ["authUser"]}),
});
const handleLogin = (e) =>{
    e.preventDefault();
    loginMutation(loginData);
}

    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="business">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">

        {/* SINGUP FROM - LEFT SIDE*/}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO*/}
                <div className="flex items-center justify-start mb-4 gap-2">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Earth className="w-12 h-12 text-primary" />
                  <span className="text-4xl font-extrabold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider" >
                  G-ChatApp
                  </span>
                </Link>
                </div>

                {/* ERROR MESSAGE IF ANY */}
                {error && (
                  <div className="alert alert-error mb-4">
                    <span>{error.response.data.message}</span>
                  </div>
                )}

                <div className="w-full">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="">
                      <h2 className="text-2xl font-semibold">Welcome Back Learner!</h2>
                      <p className="text-sm opacity-70">
                        SignIn to your G ChatApp to resume   your language learning!!
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
            
                      {/* EMAIL */}
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>

                        <input type="email"
                          placeholder="johndoe@gmail.com"
                          className="input input-bordered w-full" 
                          value={loginData.email}
                          onChange={(e)=> setLoginData({
                            ...loginData, email: e.target.value})} required
                        />                     
                      </div>
                      {/* PASSWORD */}
                      <div className="form-control w-full ">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>

                        <input type="password"
                          placeholder="*********"
                          className="input input-bordered w-full" 
                          value={loginData.password}
                          onChange={(e)=> setLoginData({
                            ...loginData, password: e.target.value})} required
                        />
                        <p>Password must be atleast 6 character long</p>               
                      </div>

                     
                    </div>

                    <button className="btn btn-primary w-full" type="submit">
                      {/* Create Account */}
                      {/* {isPending ? "Signing Up..." : "Create Account"} */}
                      {isPending ? 
                      (
                        <>
                        <span className="loading loading-spinner loding-xs"></span>
                        hold tight...
                        </>
                      )
                      : 
                      (
                        "Log In"
                      )
                      }

                    </button>

                    <div className="text-center mt-4">
                      <p className="text-sm">
                        Don't have an account? {" "}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign Up
                        </Link>
                      </p>
                    </div>
                </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
            <div className="max-w-md p-8">
              <div className="relative aspect-square max-w-sm mx-auto">
                <img src="login.png" alt="Language collection illustraction" className="w-full h-full" />
              </div>

              <div className="text-center space-y-3">
                <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
                <p className="opacity-70">Practice conversation, make friends, and improve your language skills together</p>
              </div>
            </div>
        </div>

      </div>
    </div>
    ) 
}

export default LoginPage;