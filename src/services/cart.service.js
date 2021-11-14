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

export function addToCart(courseId) {
  return axios.post(`/cart/${courseId}`, {}, config);
}

export function getCartList() {
  return axios.get(`/cart/me`, config);
}

export function deleteCartItem(courseId) {
  return axios.delete(`/cart/${courseId}`, config);
}
