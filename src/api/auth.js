import axios from 'axios';
const APIURL = process.env.REACT_APP_SITEURL;


export const clientRegisterRequest = async (data) => {
    let response = await axios.post(`${APIURL}/api/signup`, data);
    if (response.status === 200) {
        return response
    }
}

export const clientLoginRequest = async (data) => {
    let response = await axios.post(`${APIURL}/api/login`, data);
    if (response.status === 200) {
        return response
    }
}


export const clientLogoutRequest = async () => {
    let response = await axios.get(`${APIURL}/api/signout`);
    if (response.status === 200) {
        return response
    }
}
