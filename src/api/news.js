import axios from 'axios';


export const clientGetNewsHeadlines = async () => {
    let response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWSAPIKEY}`);
    if (response) {
        return response
    }
}