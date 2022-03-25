import axios from 'axios';


export const clientGetPexelsImages = async () => {
    let response = await axios.get(`https://api.pexels.com/v1/search?query=florida&per_page=50`, {
        headers: {
            Authorization: process.env.REACT_APP_PEXELSAPIKEY
        }
    });
    if (response) {
        return response
    }
}