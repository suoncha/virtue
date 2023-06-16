import axios from 'axios';

export const postCreateInfo = (username: String, saveNo: number, token: String) => {
    return axios.post(import.meta.env.VITE_API + "info", 
    { 
        username: username,
        saveNo: saveNo
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const postDeleteInfo = (username: String, saveNo: number, token: String) => {
    return axios.post(import.meta.env.VITE_API + "info/delete", 
    { 
        username: username,
        saveNo: saveNo
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const putUpdateInfo = (username: String, saveNo: number, level: number, 
    death: number, coin: number, mapCleared: number,
    customData: Object, token: String) => {
    return axios.put(import.meta.env.VITE_API + "info", 
    { 
        username: username,
        saveNo: saveNo,
        level: level,
        death: death,
        coin: coin,
        mapCleared: mapCleared,
        customData: customData
    },
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}

export const getGetUserInfo = (token: String) => {
    return axios.get(import.meta.env.VITE_API + "info", 
    { 
        headers: {"Authorization" : `Bearer ${token}`}
    });
}
