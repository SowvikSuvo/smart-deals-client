import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-api-server-liard.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
