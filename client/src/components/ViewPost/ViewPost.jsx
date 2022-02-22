import React, { useEffect, useState } from 'react';
import styles from './ViewPost.module.css';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Avatar, Icon, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { clientGetOnePostRequest } from '../../api/post';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Comments from '../Comments/Comments';
import { clientInteractPost } from '../../api/post';


const ViewPost = ({ postId, token , user}) => {
    const [currentPost, setCurrentPost] = useState({});
    const [comments, setComments] = useState([]);
    const [viewComments, setViewComments] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [postLiked, setPostLiked] = useState(false);
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [audios, setAudios] = useState([]);

    useEffect(() => {
        clientGetOnePostRequest(postId, token).then((res) => {
            setCurrentPost(res.data.data[0])
            setLikeCount(res.data.data[0].likes.length)
            // grab attachments and call setattachments
            const attachments = res.data.data[0].content.attachments;
            setAttachments(attachments)
            
            const idExist = res.data.data[0].likes?.includes(user?._id)
            if (idExist) {
                setPostLiked(true)
            }
    
        })
    }, [likeCount])

    const setAttachments = (attachments) => {

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

    
    const handlePostInteraction = (postId, userId, type) => {
        const data = { postId, userId, type };
        clientInteractPost(data, token).then((res) => {
            if (res.status === 200) {
                if (type === 'Like') {
                    setPostLiked(true)
                    setLikeCount(likeCount + 1)
                    alert("post liked")
                } else if (type === 'Unlike') {
                    setPostLiked(false)
                    setLikeCount(likeCount - 1)
                    alert("post unliked")
                }

            }
        })
    }

    return <div className={styles.viewpost}>
        {viewComments === true ?   <Comments token={token} userId={user._id} postId={postId} comments={currentPost?.comments} /> : 
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
                {postLiked ? <IconButton onClick={() => handlePostInteraction(currentPost._id, user._id, 'Unlike')}>
                            <FavoriteIcon />
                        </IconButton> : <IconButton onClick={() => handlePostInteraction(currentPost._id, user._id, 'Like')}>
                            <FavoriteBorderOutlined />
                        </IconButton>}
                    <IconButton onClick={() => setViewComments(true)}>
                        <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <IconButton>
                        <SendOutlinedIcon />
                    </IconButton>
                </div>
                <div className={styles.viewpost_contentItemInfoDesc}>
                    <p>{likeCount} likes</p>
                    <p className={styles.viewpost_caption}>{currentPost.content?.caption.substring(0, 55)}</p>
                   {currentPost?.comments?.length > 0 &&  <a>View all {currentPost?.comments.length} comments</a>}
                </div>

            </div>
        </div></>
        }
      
    </div>;
};

export default ViewPost;
