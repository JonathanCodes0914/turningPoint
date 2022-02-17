import axios from 'axios';
const APIKEY = '2707e1f1ea51436088a0dae341ba14bb';

export const clientGetNewsHeadlines = async () => {
    let response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIKEY}`);
    if (response) {
        return response
    }
}