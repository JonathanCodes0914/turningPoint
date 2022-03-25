import axios from 'axios';


export const clientGetNasaPicOfDay = async () => {
    let response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASAAPIKEY}`, {
    });
    if (response) {
        return response
    }
}