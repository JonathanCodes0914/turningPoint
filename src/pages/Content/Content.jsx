import React, {useState, useEffect} from 'react';
import styles from './Content.module.css';
import VideoCard from '../../components/VideoCard/VideoCard';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { motion , AnimatePresence} from 'framer-motion'

const Content = () => {
useEffect(() => {
    axios.get('https://api.nasa.gov/EPIC/api/natural/images?api_key=xAMMFe0XhCMCfme9Wn5DL13cxpTtHUcEuxOX7vkP')
    .then((response) => console.log(response))
    
}, [])

    const history = useHistory();
    return (
        <div className={styles.Videos}>
            <VideoCard onClick={() => history.push(`/content/123`)} videoAuthor='John Doe' videoTitle='1st Amendment Audit Officers denied ID' videoUrl='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' description='' datePosted='Septmeber 20, 10pm'/>
            <VideoCard  videoAuthor='John Doe' videoTitle='1st Amendment Audit Officers denied ID' videoUrl='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' description='' datePosted='Septmeber 20, 10pm'/>
            <VideoCard  videoAuthor='John Doe' videoTitle='1st Amendment Audit Officers denied ID' videoUrl='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' description='' datePosted='Septmeber 20, 10pm'/>
            <VideoCard  videoAuthor='John Doe' videoTitle='1st Amendment Audit Officers denied ID' videoUrl='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' description='' datePosted='Septmeber 20, 10pm'/>
            <VideoCard  videoAuthor='John Doe' videoTitle='1st Amendment Audit Officers denied ID' videoUrl='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' description='' datePosted='Septmeber 20, 10pm'/>
            <VideoCard  videoAuthor='John Doe' videoTitle='1st Amendment Audit Officers denied ID' videoUrl='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' description='' datePosted='Septmeber 20, 10pm'/>
            <VideoCard  videoAuthor='John Doe' videoTitle='1st Amendment Audit Officers denied ID' videoUrl='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' description='' datePosted='Septmeber 20, 10pm'/>

        </div>
    )
}

export default Content

