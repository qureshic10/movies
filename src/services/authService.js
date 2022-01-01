import jwtdecode from "jwt-decode"; // npm i jwt-decode@2.2.0
import http from "./httpService";
//import { apiUrl } from "../config.json";

//const apiEndPoint = apiUrl + "/auth";
const apiEndPoint = "/auth";
const tokenKey = "token";

// to get rid of bi-directional dependencies we are setting token here.
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  // if the token is not available it will give error so to handle it add try catch block.
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtdecode(jwt);
    //console.log(user);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
