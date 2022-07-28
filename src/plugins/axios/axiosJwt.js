import axios from "axios";

import interceptorFunc from "./interceptors";

const axiosJWT = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

interceptorFunc(axiosJWT);

export default axiosJWT;
