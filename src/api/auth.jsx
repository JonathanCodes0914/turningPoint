import axios from 'axios';

export const clientRegisterRequest = async (data) => {
    let response = await axios.post('/api/signup', data);
    if (response.status === 200) {
        return response
    }
}

export const clientLoginRequest = async (data) => {
    let response = await axios.post('/api/login', data);
    if (response.status === 200) {
        return response
    }
}


export const clientLogoutRequest = async () => {
    let response = await axios.get('/api/signout');
    if (response.status === 200) {
        return response
    }
}
