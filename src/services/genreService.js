import http from "./httpService";
//import config from "../config.json";
//import { apiUrl } from "../config.json"; // Object destructuring

export function getGenres() {
  //return http.get((config.apiURL = "/genres"));
  //return http.get(apiUrl + "/genres");
  return http.get("/genres");
}
