import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectToken } from '../../features/userSlice';
import { Avatar, Icon, IconButton } from '@mui/material';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from '../Post/Post.module.css';
import { clientInteractPost } from '../../api/post';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteModal from '../Modal/DeleteModal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Post = ({ story, handleShowComments , setReload}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [likeCount, setLikeCount] = useState(story.likes.length);
    const [postLiked, setPostLiked] = useState(false);
    const [showPostSettings, setShowPostSettings] = useState(false)
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [audios, setAudios] = useState([]);

    useEffect(() => {
        //check if userid exist if so postlike is true
        const idExist = story.likes.includes(user._id)
        if (idExist) {
            setPostLiked(true)
        }

        setAttachments(story.content.attachments)
    }, [])
    console.log(story)
    const handlePostInteraction = (postId, userId, type) => {
        const data = { postId, userId, type };

        if (type === 'Post Delete') {

            if (window.confirm('Are you sure ?')) {
                clientInteractPost(data, token).then((res) => {
                    if (res.status === 200) {
                       setReload(true)

                       // still gotta delete attachments from fireabse
                    }
                })
            } else {
                return 
            }
        } else {
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

    }

    // const handleDisplayAttachments = (attachments) => {
    //     if (attachments.length === 1 && attachments[0].contentType === 'image') {
    //         return <div className={styles.slider}>
    //             <img src={attachments[0].url} alt='Content' />
    //         </div>
    //     } else if (attachments.length === 1 && attachments[0].contentType === 'video') {
    //         return <div className={styles.slider}>
    //             <video muted autoPlay>
    //                 <source src={attachments[0].url} />
    //             </video>
    //         </div>
    //     } else if (attachments.length === 1 && attachments[0].contentType === 'audio') {
    //         return <div className={styles.slider}>
    //             <audio>
    //                 <source src={attachments[0].url} />
    //             </audio>
    //         </div>
    //     } else if (attachments.length > 1) {
    //         console.log(attachments.length)
    //         for (let i = 0; i < attachments.length; i++) {
    //             if (attachments[i].contentType === 'image') {
    //                 return <div className={styles.slider}>
    //                     <img src={attachments[i].url} alt='Content' />
    //                 </div>
    //             } else if (attachments[i].contentType === 'video') {
    //                 return <div className={styles.slider}>
    //                     <video>
    //                         <source src={attachments[i].url} />
    //                     </video>
    //                 </div>
    //             } else if (attachments[i].contentType === 'audio') {
    //                 return <div className={styles.slider}>
    //                     <audio>
    //                         <source src={attachments[i].url} />
    //                     </audio>
    //                 </div>
    //             }
    //         }
    //     }
    // };

    const setAttachments = (attachments) => {
        if (attachments.length === 1 && attachments[0].contentType === 'image') {
            setImages(attachments)
        } else if (attachments.length === 1 && attachments[0].contentType === 'video') {
            setVideos(attachments)
        } else if (attachments.length === 1 && attachments[0].contentType === 'audio') {
            setAudios(attachments)
        }
        if (attachments.length > 1) {
            for (let i = 0; i < attachments.length; i++) {
                if (attachments[i].contentType === 'image') {
                    setImages(oldArray => [attachments[i], ...oldArray])
                } else if (attachments[i].contentType === 'video') {
                    setVideos(oldArray => [attachments[i], ...oldArray])

                } else if (attachments[i].contentType === 'audio') {
                    setAudios(oldArray => [attachments[i], ...oldArray])
                }
            }
        }

    }

    return (
        <div className={styles.post}>
            {showPostSettings === true ? <div className={styles.postSettings}>
                <IconButton onClick={() => setShowPostSettings(false)}>
                    <ArrowBackIcon fontSize='large' />
                </IconButton>
                <div className={styles.postSettingsButtons}>
                    <button onClick={() => handlePostInteraction(story._id, user._id, 'Post Delete')}>Delete Post</button>
                </div>
            </div> : <>
                <span className={styles.feed_contentUserInfo}>
                    <Avatar className={styles.feed_contentAvatar} src={story.user._id.profileImg} />
                    <p>{story.user._id.username}</p>
                </span>


                {story.user._id._id === user._id && <IconButton className={styles.settingIcons} onClick={() => setShowPostSettings(true)}>
                    <MoreVertIcon fontSize='medium' />
                </IconButton>
                }
                <div className={styles.blur}></div>
                <div className={styles.feed_contentItem}>
                    {/* <img src={story.content.attachments[0].url} alt='feed content' /> */}

                    <Carousel swipeable autoplay autoFocus showStatus={false} showThumbs={false} transitionTime={700} showIndicators={false} >

                        {images.length > 0 ? images.map((img) => {
                            return <div className={styles.slider}>
                                <img src={img.url} alt='label' width='100px' height='500px' />
                            </div>
                        }) : null}
                        {videos.length > 0 ? videos.map((vid) => {
                            return <div className={styles.slider}>
                                <video className={styles.sliderAttachment} muted autoPlay playsInline loop width='100px' height='500px'>
                                    <source src={vid.url} type="video/mp4" />
                                </video>
                            </div>
                        }) : null}
                        {audios.length > 0 ? audios.map((audio) => {
                            return <div className={styles.slider}>
                                <img className={styles.sliderAttachment} src='https://4.bp.blogspot.com/-uhjF2kC3tFc/U_r3myvwzHI/AAAAAAAACiw/tPQ2XOXFYKY/s1600/Circles-3.gif' />
                                <audio controls autoplay>
                                    <source src={audio.url} type='audio/mp3' />
                                </audio>
                            </div>
                        }) : null}
                    </Carousel>
                    <div className={styles.feed_contentItemInfo}>
                        <div className={styles.feed_contentItemInfoButtons}>
                            {postLiked ? <IconButton onClick={() => handlePostInteraction(story._id, user._id, 'Unlike')}>
                                <FavoriteIcon />
                            </IconButton> : <IconButton onClick={() => handlePostInteraction(story._id, user._id, 'Like')}>
                                <FavoriteBorderOutlined />
                            </IconButton>}
                            <IconButton>
                                <ChatBubbleOutlineOutlined onClick={() => handleShowComments(story._id)} />
                            </IconButton>
                            <IconButton>
                                <SendOutlinedIcon />
                            </IconButton>
                        </div>
                        <div className={styles.feed_storyfeed_contentItemInfoDesc}>
                            <p>{likeCount} likes</p>
                            <p>{story.user._id.username}{" "}{story.content.caption}</p>
                            <p></p>
                            <a onClick={() => handleShowComments(story._id)}>View all {story.comments.length} comments</a>
                        </div>

                    </div>
                </div>
            </>}

        </div>
    )
}

export default Post