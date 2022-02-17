import React, { useEffect, useState } from 'react';
import styles from './ViewPost.module.css';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Avatar, Icon, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { clientGetOnePostRequest } from '../../api/post';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const ViewPost = ({ postId, token }) => {
    const [currentPost, setCurrentPost] = useState({})
    const [comments, setComments] = useState([{caption: 'Wow cool maniebjfbejkfbejbfjebfjebfkbejfbekfbejbfkjb', profileImg: '', username: 'pedrotocool123'},{caption: 'Wow cool man', profileImg: '', username: 'pedrotocool123'},{caption: 'Wow cool man', profileImg: '', username: 'pedrotocool123'},{caption: 'Wow cool man', profileImg: '', username: 'pedrotocool123'}])
    const [viewComments, setViewComments] = useState(false)
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [audios, setAudios] = useState([]);

    useEffect(() => {
        clientGetOnePostRequest(postId, token).then((res) => {
            console.log(res)
            setCurrentPost(res.data.data[0])
            // grab attachments and call setattachments
            const attachments = res.data.data[0].content.attachments;
            console.log(res.data.data[0].content.attachments)
            setAttachments(attachments)
        })
    }, [])
    const setAttachments = (attachments) => {

        console.log(attachments)
        for (let i = 0; i < attachments.length; i++) {
            if (attachments[i].contentType === 'image') {
                setImages(oldArray => [attachments[i], ...oldArray])
            }else  if (attachments[i].contentType === 'video') {
                setVideos(oldArray => [attachments[i], ...oldArray])

            }else if (attachments[i].contentType === 'audio') {
                setAudios(oldArray => [attachments[i], ...oldArray])
            }
        }
    }

    console.log('videos', videos)
    console.log('images', images)
    console.log('audios', audios)
    console.log('currentpost', currentPost?.content?.attachments[0])
    return <div className={styles.viewpost}>
        {viewComments === true ? <div className={styles.comments}>
        {comments.map((comment) => {
            return <div className={styles.comment}>
               
                <Avatar src={comment.profileImg} alt='comment avatar'/>
               <span>
               <p>{comment.username}</p>
                <p>{comment.caption}</p>
               </span>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        })}
        </div> : 
        <>
          <span className={styles.viewpost_userInfo}>
            <Avatar className={styles.viewpost_avatar} src={currentPost.user?._id.profileImg} />
            <p>{currentPost.user?._id.username}</p>
        </span>
        <div className={styles.blur}></div>
        <div className={styles.viewpost_contentItem}>
            <Carousel swipeable autoplay autoFocus showStatus={false} showThumbs={false} transitionTime={700} showIndicators={false} >
            {images.length > 0 ? images.map((img) => {
                return <div className={styles.slider}>
                <img src={img.url} alt='label' width='100px' height='500px' />
            </div>
            }) : null}
              {videos.length > 0 ? videos.map((vid) => {
               return <div className={styles.slider}>
                  <video muted autoPlay playsInline loop width='100px' height='300px'>
                        <source src={vid.url} type="video/mp4" />
                    </video>
            </div>
            }): null}
              {audios.length > 0 ? audios.map((audio) => {
               return <div className={styles.slider}>
                <audio>
                        <source src={audio.url} />
                    </audio>
            </div>
            }): null}
            </Carousel>


            <div className={styles.viewpost_contentItemInfo}>
                <div className={styles.viewpost_contentItemInfoButtons}>
                    <IconButton>
                        <FavoriteBorderOutlined />
                    </IconButton>
                    <IconButton onClick={() => setViewComments(true)}>
                        <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <IconButton>
                        <SendOutlinedIcon />
                    </IconButton>
                </div>
                <div className={styles.viewpost_contentItemInfoDesc}>
                    <p>1,837 likes</p>
                    <p className={styles.viewpost_caption}>{currentPost.content?.caption.substring(0, 55)}</p>
                   {currentPost?.comments?.length > 0 &&  <a>View all {currentPost?.comments.length} comments</a>}
                </div>

            </div>
        </div></>
        }
      
    </div>;
};

export default ViewPost;
