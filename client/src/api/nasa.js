import axios from 'axios';
const NASAAPIKEY = 'ssJNGJv3US0XMwQYqfAR5VvSZdbDyXlb3tEx0bOH';

export const clientGetNasaPicOfDay = async () => {
    let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASAAPIKEY}`, {
    });
    if (response) {
        return response
    }
}