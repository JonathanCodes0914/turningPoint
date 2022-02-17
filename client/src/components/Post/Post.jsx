import React, {useState, useEffect} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { selectUser, selectToken } from '../../features/userSlice';
import { Avatar, Icon, IconButton } from '@mui/material';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import styles from '../Post/Post.module.css';
import { clientInteractPost } from '../../api/post';


const Post = ({story, handleShowComments}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [likeCount , setLikeCount] = useState(story.likes.length);
    const [postLiked, setPostLiked] = useState(false);

    useEffect(() => {
        //check if userid exist if so postlike is true
        const idExist = story.likes.includes(user._id)
        if(idExist) {
            setPostLiked(true)
        }
    }, [])

    const handlePostInteraction = (postId, userId, type) => {
        const data = {postId, userId, type};
        console.log(data)
        clientInteractPost(data,token).then((res) => {
            if(res.status === 200){
                if(type === 'Like') {
                    setPostLiked(true)
                    setLikeCount(likeCount + 1)
                    alert("post liked")
                } else if(type === 'Unlike') {
                    setPostLiked(false)
                    setLikeCount(likeCount - 1)
                    alert("post unliked")
                }
              
            }
        })
    }
  return (
    <div className={styles.post}>
           <span className={styles.feed_contentUserInfo}>
                                            <Avatar className={styles.feed_contentAvatar} src={story.user._id.profileImg} />
                                            <p>{story.user._id.username}</p>
                                        </span>
                                        <div className={styles.blur}></div>
                                        <div className={styles.feed_contentItem}>
                                            <img src={story.content.attachments[0].url} alt='feed content' />
                                            <div className={styles.feed_contentItemInfo}>
                                                <div className={styles.feed_contentItemInfoButtons}>
                                                  {postLiked ?   <IconButton onClick={() => handlePostInteraction(story._id, user._id, 'Unlike')}>
                                                        <FavoriteIcon />
                                                    </IconButton> :   <IconButton onClick={() => handlePostInteraction(story._id, user._id, 'Like')}>
                                                        <FavoriteBorderOutlined />
                                                    </IconButton>}
                                                    <IconButton>
                                                        <ChatBubbleOutlineOutlined onClick={() => handleShowComments(story._id)}/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <SendOutlinedIcon />
                                                    </IconButton>
                                                </div>
                                                <div className={styles.feed_storyfeed_contentItemInfoDesc}>
                                                    <p>{likeCount} likes</p>
                                                    <p>{story.user._id.username}{story.content.caption}</p>
                                                    <a onClick={() => handleShowComments(story._id)}>View all {story.comments.length} comments</a>
                                                </div>

                                            </div>
                                        </div>
    </div>
  )
}

export default Post