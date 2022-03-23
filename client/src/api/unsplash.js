import axios from 'axios';



export const clientGetUnsplashImages = async () => {
    let response = await axios.get(`https://api.unsplash.com/search/photos?query=space?per_page=50`, {
        headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASHAPIKEY}`
        }
    });
    if (response) {
        return response
    }
}