import axios from "axios"
import { config } from "../helpers/config"
import { getAuthHeader } from "../helpers/auth-header";

const API_URL = config.api.baseUrl; // https://mycampusmates.com/app

export const login = async (payload) => {//hangi kullanicnin login olg bilgilerini doner
    const resp = await axios.post(`${API_URL}/auth/login`, payload);
    const data = resp.data;
    return data;
}

export const getMe = async () => {//bu fonksiyon bize girilen tokenin hangi kullaniciya ait oldugunu doner
    const resp = await axios.get(`${API_URL}/user/me`, {
        headers: getAuthHeader()
    });
    const data = resp.data;
    return data;
}

//paylload --> username ve password   
