import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData); // we are sending this signup data to backend
  return response.data;
};

export const login = async (logindata) => {
  const response = await axiosInstance.post("/auth/login", logindata); // we are sending this signup data to backend
  return response.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completeOnboarding = async (userData) =>{
  const response = await axiosInstance.post("/auth/onboarding", userData)
  return response.data;
}