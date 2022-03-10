import axios from 'axios';
const PEXELSAPIKEY = '563492ad6f917000010000015cce2edf1daa45bba89449b334f44f2b';

export const clientGetPexelsImages = async () => {
    let response = await axios.get(`https://api.pexels.com/v1/search?query=florida&per_page=50`, {
        headers: {
            Authorization: PEXELSAPIKEY
        }
    });
    if (response) {
        return response
    }
}