//npm i axios@0.18.0
import axios from "axios";
import logger from "./logService";
//npm i react-toastify@4.1.0 // After the installation add it in App component
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// Commenting the following line because httpService and authService are creating bidirectorional dependencies so we need to remove auth service
//axios.defaults.headers.common["x-auth-token"] = auth.getJwt(); // Our web api requires authentication so we need to add the token to our axios service header.

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error has occured");
  }

  return Promise.reject(error);
});

// to remove bi-directional dependencies we have created this method and call it from authService
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
