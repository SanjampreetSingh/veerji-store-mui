import axios from "axios"

import * as actionTypes from "./actions"
import { API } from "../utils/constants"

export const instance = axios.create({
  baseURL: API,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : null,
  },
})

instance.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (typeof error.response === "undefined") {
      console.log(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      )
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === API + "token/refresh/"
    ) {
      window.location.href = "/login/"
      return Promise.reject(error)
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token")

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]))

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000)

        if (tokenParts.exp > now) {
          return instance
            .post("/token/refresh/", {
              refresh: refreshToken,
            })
            .then(response => {
              localStorage.setItem("access_token", response?.data?.access)
              localStorage.setItem("refresh_token", response?.data?.refresh)

              instance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access

              return instance(originalRequest)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now)
          window.location.href = "/login/"
        }
      } else {
        console.log("Refresh token not available.")
        window.location.href = "/login/"
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  }
)

export default async function ApiCall(action, url, data = {}) {
  let response = {}
  switch (action) {
    case actionTypes.GET:
      response = await instance.get(url)
      return response
    case actionTypes.POST:
      response = await instance.post(url, data)
      return response
    case actionTypes.PUT:
      response = await instance.put(url, data)
      return response
    case actionTypes.PATCH:
      response = await instance.patch(url, data)
      return response
    case actionTypes.DELETE:
      response = await instance.delete(url)
      return response
    default:
      return response
  }
}
