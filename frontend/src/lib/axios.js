import axios from "axios";

export const axiosInstance = axios.create({
    // already api is there in url
    baseURL: "http://localhost:5001/api/",
    withCredentials: true,  // to send cookies to backend
})