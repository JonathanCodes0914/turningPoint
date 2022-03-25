import React from 'react';
import styles from './SingleVideo.module.css';
import { Avatar } from '@mui/material';

const SingleVideo = () => {
    return (
        <div className={styles.singleVideo}>
            <div className={styles.singleVideoVid}>
                <video className={styles.singleVideoTag} controls autoPlay  >
                    <source src='https://player.vimeo.com/external/410194786.hd.mp4?s=c559e2509eb7a124ca452a17d2374a27e86aa499&profile_id=175&oauth2_token_id=57447761' ></source>
                </video>

                <div className={styles.singleVideoInfo}>
                 <Avatar />
                <p>John Doe</p>
                <p>Septmebr 21st, 2021</p>
                </div>

                
                    <h3 className={styles.singleVideoInfoTitle}>1st Amednment Audit id refusal</h3>
                    <p className={styles.singleVideoInfoDesc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                
            </div>

            <div className={styles.singleVideoRelated}>
                    
            </div>
        </div>
    )
}

export default SingleVideo
