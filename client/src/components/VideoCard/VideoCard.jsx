import React from 'react';
import styles from './VideoCard.module.css';
import { Avatar } from '@mui/material';

const VideoCard = ({videoUrl, videoAuthor ,videoTitle,  description, datePosted, policeInvolved, onClick}) => {
    return (
        <div onClick={onClick} className={styles.videoCard}>
            <video  className={styles.videoCardVideo} >
                <source src={videoUrl} type='video/mp4'></source>
            </video>
            <div className={styles.videoCardInfo}>
                <span> <Avatar /> <p>{videoAuthor}</p>
                <p>{datePosted}</p></span>

                <h3 className={styles.videoCardTitle} >{videoTitle}</h3>
            </div>
            
        </div>
    )
}

export default VideoCard
