import axios from "../utils/axios";
import { parseJwt } from "./auth.service";

const config = localStorage.getItem("accessToken")
  ? {
      headers: {
        Authorization: `Bearer ${parseJwt(
          localStorage.getItem("accessToken")
        )}`,
        "x-access-token": localStorage.getItem("refreshToken"),
      },
    }
  : null;

export function addToWatchList(courseId) {
  return axios.post(`/watchlists/${courseId}`, {}, config);
}

export function getWatchList() {
  return axios.get("/watchlists/me", config);
}

export function deleteWatchItem(course_id) {
  return axios.delete(`/watchlists/${course_id}`, config);
}
