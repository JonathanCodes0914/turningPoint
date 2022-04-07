import axios from 'axios';
const APIURL = process.env.REACT_APP_SITEURL;

export const clientCreateFriendRequest = async (data, token) => {
    let response = await axios.post(`${APIURL}/api/createRequest`, data, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    });
    if (response.status === 200) {
        return response
    }
}

export const clientGetRequests = async (userId, token) => {
    let response = await axios.get(`${APIURL}/api/getRequests/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    });
    if (response.status === 200) {
        return response
    }
}


export const clientRequestResult = async (data, token) => {
    let response = await axios.post(`${APIURL}/api/requestResult`, data ,{
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    });
    if (response.status === 200) {
        return response
    }
}
