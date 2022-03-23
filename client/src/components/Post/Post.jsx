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
import { storage } from '../../api/Firebase';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';


const Post = ({ story, handleShowComments, setReload }) => {
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


        const attachments = story.content.attachments;
        attachments.forEach((attachment) => {
            if (attachment.contentType === 'image') {
                setImages(oldArray => [...oldArray, attachment])
            }
            if (attachment.contentType === 'video') {
                setVideos(oldArray => [...oldArray, attachment])
            }
            if (attachment.contentType === 'audio') {
                setAudios(oldArray => [...oldArray, attachment])
            }


        })
    }, [])

    const handlePostInteraction = (postId, userId, type) => {
        const data = { postId, userId, type };

        if (type === 'Post Delete') {

            if (window.confirm('Are you sure ?')) {
                clientInteractPost(data, token).then((res) => {
                    if (res.status === 200) {
                        let postAttachments = story.content.attachments;

                        for (let i = 0; i < postAttachments.length; i++) {
                            let fileRef = storage.refFromURL(postAttachments[i].url);
                            fileRef.delete();

                            console.log('filed deleted')
                        }

                        setReload(true)
                        toast('Post Deleted')
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
                        toast('Post Liked')
                    } else if (type === 'Unlike') {
                        setPostLiked(false)
                        setLikeCount(likeCount - 1)
                        toast('Post Unliked')
                    }

                }
            })
        }

    }

    const allAttachments = [...images, ...videos, ...audios];

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

                    <Carousel swipeable={allAttachments.length > 1 ? true : false} autoplay autoFocus showStatus={false} showThumbs={false} transitionTime={700} showIndicators={false} showArrows={allAttachments.length === 1 ? false : true} >

                        {allAttachments.map((attach, i) => {
                            if (attach.contentType === 'image') {
                                return <div className={styles.slider} key={i}>
                                    <img src={attach.url} alt='label' width='100px' height='500px' />
                                </div>
                            } else if (attach.contentType === 'video') {
                                return <div className={styles.slider} key={i}>
                                    <video controls muted autoPlay playsInline loop width='400px' height='500px'>
                                        <source src={attach.url} type="video/mp4" />
                                    </video>
                                </div>
                            } else {
                                return <div className={styles.slider} key={i}>
                                    <img className={styles.sliderAttachment} src='https://c.tenor.com/OiwgU0MtwOcAAAAM/213.gif' />
                                    <audio controls autoplay>
                                        <source src={attach.url} type='audio/mp3' />
                                    </audio>
                                </div>
                            }
                        })}
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
                            {likeCount > 0 && <p>{likeCount} likes</p>}

                            <p>{story.user._id.username}{" "}{story.content.caption}</p>
                            <p></p>
                            {story.comments.length > 0 && <a onClick={() => handleShowComments(story._id)}>View all {story.comments.length} comments</a>}

                        </div>
                        <hr />
                    </div>
                </div>
            </>}

        </div>
    )
}

export default Post