import axios from 'axios';

export const clientSearchRequest = async(value, token) => {
    let response = await axios.get(`/api/search?q=${value}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response) {
        return response
    }
}


export const clientEditProfileRequest = async(data, token) => {
    let response = await axios.post(`/api/editProfile`, data ,{
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response) {
        return response
    }
}
