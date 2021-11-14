import axios from "../utils/axios";

export function getAllSubject() {
  return axios.get("/subject/all");
}
export function getAllCat() {
  return axios.get("/category/all");
}