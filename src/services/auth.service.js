import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const register = (name, email, password) => {
    return axios.post(API_URL + "/register", {
        name,
        email,
        password,
        password_confirmation: password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "/login", {
            email: email,
            password,
            token_name: process.env.REACT_APP_NAME
        })
        .then((response) => {
            if (response.data.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }

            return response.data;
        });
};


const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
