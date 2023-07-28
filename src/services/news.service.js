import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getCategories = () => {
    return axios.get(API_URL + "/categories");
};
const getSources = () => {
    return axios.get(API_URL + "/sources");
};
const getAuthors = () => {
    return axios.get(API_URL + "/authors");
};
const getNewsByCategory = (category) => {
    return axios.get(API_URL + "/categories/" + category);
};


export default {
    getCategories,
    getNewsByCategory,
    getSources,
    getAuthors
};
