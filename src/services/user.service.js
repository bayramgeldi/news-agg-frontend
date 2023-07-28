import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getNews = () => {
    return axios.get(API_URL + "/news", {headers: authHeader()});
};

const getSources = () => {
    return axios.get(API_URL + "/sources", {headers: authHeader()});
};

const getUserSettings = () => {
    return axios.get(API_URL + "/user/settings", {headers: authHeader()});
};

const saveSettings = (sources, categories, authors) => {
    return axios
        .post(API_URL + "/user/settings", {
            sources,
            categories,
            authors
        }, {headers: authHeader()})
};

export default {
    getNews,
    getSources,
    getUserSettings,
    saveSettings
};
