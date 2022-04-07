import axios from 'axios';
const APIURL = process.env.REACT_APP_SITEURL;

export const clientCreatePostRequest = async(data, token) => {
    let response = await axios.post(`${APIURL}/api/createPost`, data, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}


export const clientGetProfilePostsRequest = async(userId, token) => {
    let response = await axios.get(`${APIURL}/api/getUserPosts/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}

export const clientGetOnePostRequest = async(postId, token) => {
    let response = await axios.get(`${APIURL}/api/getUserPost/${postId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}

export const clientGetFeedRequest = async(userId, token) => {
    let response = await axios.get(`${APIURL}/api/getFeedPosts/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}



export const clientInteractPost = async(data, token) => {
    let response = await axios.post(`${APIURL}/api/interactPost`, data , {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}
