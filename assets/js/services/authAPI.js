import axios from "axios";
import jwtDecode from "jwt-decode";
import {LOGIN_API} from "../config";

const logout = () => {
    window.localStorage.removeItem('authToken');
    delete axios.defaults.headers['Authorization'];
};

const authenticate = (credentials) => {
    return axios.post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem('authToken', token);
            axios.defaults.headers['Authorization'] = 'Bearer ' + token;
        });
};

const setup = () => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + token;
            console.log("Connexion établie avec axios !")
        }
    }
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime())
            return true
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}