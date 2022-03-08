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
            attachments.forEach((attachment) => {
                if(attachment.contentType === 'image') {
                    setImages(oldArray => [ ...oldArray, attachment])
                }
                if(attachment.contentType === 'video') {
                    setVideos(oldArray => [ ...oldArray, attachment])
                }
                if(attachment.contentType === 'audio') {
                    setAudios(oldArray => [ ...oldArray, attachment])
                }


            })
            console.log(res.data.data[0])
            const idExist = res.data.data[0].likes?.includes(user?._id)
            if (idExist) {
                setPostLiked(true)
            }
            return () => {
                setImages([])
                setVideos([])
                setAudios([])
            }
        })
    }, [])
console.log(currentPost)
console.log('images', images)
console.log('video', videos)
console.log('audios', audios)


    
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
    const postAttachments = [...images, ...videos, ...audios];
    
    return <div className={styles.viewpost}>
        {viewComments === true ?   <Comments token={token} userId={user._id} postId={postId} comments={currentPost?.comments} /> : 
        <>
          <span className={styles.viewpost_userInfo}>
            <Avatar className={styles.viewpost_avatar} src={currentPost.user?._id.profileImg} />
            <p>{currentPost.user?._id.username}</p>
        </span>
        <div className={styles.blur}></div>
        <div className={styles.viewpost_contentItem}>
            <Carousel swipeable={postAttachments.length > 1 ? true : false} autoplay autoFocus showStatus={false} showThumbs={false} transitionTime={700} showIndicators={false} showArrows={postAttachments.length === 1 ? false : true}>
            {images.length > 0 && images.map((img, i) => {
                return <div className={styles.slider} key={i}>
                <img src={img.url} alt='label' width='100px' height='500px' />
            </div>
            })}
              {videos.length > 0 && videos.map((vid, i) => {
               return <div className={styles.slider} key={i}>
                  <video muted autoPlay playsInline loop >
                        <source src={vid.url} type="video/mp4" />
                    </video>
            </div>
            })}
              {audios.length > 0 && audios.map((audio, i) => {
               return <div className={styles.slider} key={i}>
                   <img className={styles.sliderAttachment} src='https://static.displate.com/280x392/displate/2020-08-06/affd1a71295669950308eaa30e6c5473_6099a3a9daf8faaa5e63ada15b63731b.jpg' alt='slider audio' />
                <audio  controls autoplay>
                        <source src={audio.url} />
                    </audio>
            </div>
            })}
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
