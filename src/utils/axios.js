import Axios from "axios";

let axios = Axios.create({
  baseURL: "https://bct-onlinecourses-be.herokuapp.com",
  // baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  //get token
  let token = localStorage.getItem("accessToken");
  // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxNDkxNDA2LTgxZTAtNDAwYy1iYTI0LWMzMTMyMTVlOTM1MCIsImNyZWF0ZWRBdCI6IjIwMjEtMDEtMTNUMDg6NDE6MzEuMzU1WiIsInVwZGF0ZWRBdCI6IjIwMjEtMDEtMTNUMDg6NDE6MzEuMzU1WiIsInZlcnNpb24iOjEsInRlbkRhbmdOaGFwIjoic3RyaW5nIiwiZW1haWwiOiJzdHJpbmdAcy5jb20iLCJzb0RpZW5UaG9haSI6InN0cmluZyIsImRpYUNoaSI6InN0cmluZyIsInZhaVRybyI6InF1YW5fbHkiLCJpYXQiOjE2MTA2MTMyMzAsImV4cCI6MTYyMzU3MzIzMH0.kehSMq8h_8taCXQBqvDBgr2LhQvIYw_UKPULwT0g1l0";
  config.headers["x-access-token"] = token ? `${token}` : "";
  return config;
});
// Add a response interceptor
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          let accessToken = localStorage.getItem("accessToken");
          let refreshToken = localStorage.getItem("refreshToken");
          const rs = await axios.post("auth/refresh", {
            accessToken:accessToken,
            refreshToken: refreshToken,
          });

          localStorage.accessToken = rs.data.accessToken;  

          return axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
export default axios;
