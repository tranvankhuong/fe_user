import axios from "../utils/axios"
export function login(username, password){
    return axios.post('/auth/login',{
        username,
        password
    });
}

export function registerAccount(user){
    return axios.post('/auth/register',{
        user_username: user.username,
        user_password: user.password,
        user_name: user.fullname,
        user_firstname:user.firstname,
        user_lastname:user.lastname,
        user_email:user.email
    });
}
export function verifyEmail(otp){
    return axios.post('/auth/verify',{
        user_username: localStorage.getItem("usernameVerify"),
        user_otp:otp
    });
}

export function resendOTP(username){
    return axios.post('/auth/resend',{
        user_username: username
    });
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
};
