import axios from 'axios';

export const postCreateUser = (username: String, email: String, password: String) => {
    return axios.post(import.meta.env.VITE_API + "auth/create", 
    {
        username: username, 
        email: email,
        password: password
    });
}

export const postValidateOTP = (email: String, otp: String) => {
    return axios.post(import.meta.env.VITE_API + "auth/otp", 
    { 
        email: email,
        otp: otp
    });
}

export const postSendOTP = (email:String) => {
    return axios.post(import.meta.env.VITE_API + "auth/send", 
    { 
        email: email
    });
}

export const postChangePassword = (email: String, password: String, token: String) => {
    return axios.post(import.meta.env.VITE_API + "auth/change", 
    { 
        email: email,
        password: password
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postLogin = (username:String, password:String) => {
    return axios.post(import.meta.env.VITE_API + "auth/login", 
    {
        username: username, 
        password: password
    });
}