import axios from 'axios';
const UNSPLASHAPIKEY = '8cXjRaQqCAlXmjbS5UvzjuyNQUii55Lb7HTxXqR6Xlo';

export const clientGetUnsplashImages = async () => {
    let response = await axios.get(`https://api.unsplash.com/search/photos?query=space?per_page=50`, {
        headers: {
            Authorization: `Client-ID ${UNSPLASHAPIKEY}`
        }
    });
    if (response) {
        return response
    }
}