import axios from 'axios';

export const clientCreateFriendRequest = async (data, token) => {
    let response = await axios.post('/api/createRequest', data, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    });
    if (response.status === 200) {
        return response
    }
}

export const clientGetRequests = async (userId, token) => {
    let response = await axios.get(`/api/getRequests/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    });
    if (response.status === 200) {
        return response
    }
}


export const clientRequestResult = async (data, token) => {
    let response = await axios.post(`/api/requestResult`, data ,{
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
    });
    if (response.status === 200) {
        return response
    }
}
