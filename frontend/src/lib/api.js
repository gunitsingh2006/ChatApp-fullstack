import { axiosInstance } from "./axios";

export const signup =  async(signupData) => {
    const response = await axiosInstance.post("/auth/signup" , signupData);  // we are sending this signup data to backend
    return response.data;
};