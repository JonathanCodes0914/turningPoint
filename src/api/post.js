import axios from 'axios';

export const clientCreatePostRequest = async(data, token) => {
    let response = await axios.post('/api/createPost', data, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}


export const clientGetProfilePostsRequest = async(userId, token) => {
    let response = await axios.get(`/api/getUserPosts/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}

export const clientGetOnePostRequest = async(postId, token) => {
    let response = await axios.get(`/api/getUserPost/${postId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}

export const clientGetFeedRequest = async(userId, token) => {
    let response = await axios.get(`/api/getFeedPosts/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}



export const clientInteractPost = async(data, token) => {
    let response = await axios.post(`/api/interactPost`, data , {
        headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
          }
    });
    if(response.status === 200) {
        return response
    }
}
