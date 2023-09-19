import axios from "axios";
import { logout } from "./shared/util/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
});

apiClient.interceptors.request.use((config) => {
  const userDetails = localStorage.getItem("user");
  if (userDetails) {
    const token = JSON.parse(userDetails).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},(err)=>{
  return Promise.reject(err)
});

export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (error) {
    return {
      error: true,
      exception: error,
    };
  }
};

const checkResponseCode = (exception) =>{
  const responseCode = exception?.response?.status;
  if(responseCode === 401 || responseCode === 403){
    logout();
  }

}