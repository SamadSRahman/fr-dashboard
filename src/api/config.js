import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const apiClient = axios.create({
  baseURL: "https://toyota-lakshya-onlineassessment.in/dashboard_api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const apiClientlogin = axios.create({
  baseURL: "https://toyota-lakshya-onlineassessment.in/dashboard_api/dashboard_login/",
  headers: {
    "Content-Type": "application/json",
  },
});


export const apiClientWithToken = axios.create({
  baseURL: "http://139.5.190.56:17909",
  headers: {
    "Content-Type": "application/json",
    authorization: `${accessToken}`,
  },
});

export const userName = localStorage.getItem("userName")
export const permission = (localStorage.getItem("permission"))