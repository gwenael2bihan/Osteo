import axios from 'axios'

export const getUser = () => {
    const user = sessionStorage.getItem('/api/user');
    console.log('USER: ', sessionStorage);
    if (user) return JSON.parse(user);
    else return null;
}

export const getToken = () => {
    return sessionStorage.getItem('token');
}

export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user',JSON.stringify(user));
}

