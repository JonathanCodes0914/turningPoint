import React, {useState} from 'react'
import styles from '../Comments/Comments.module.css';
import { Avatar, Icon, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { clientInteractPost } from '../../api/post';
const Comments = ({comments, postId, userId, token}) => {
    const [commentValue, setCommentValue] = useState('');
    const [postComments, setPostComments] = useState(comments);
    const feedStories = Array(8).fill({ caption: 'america the rgeatest', attachment: 'https://cdn.cheapism.com/images/011618_most_beautiful_views_in_the_world_sli.max-784x410_ZXOqfVp.jpg', username: 'cue banks' })
  
    const handleSubmitComment = (e, type) => {
        e.preventDefault();
        const data = {
            postId, userId, commentValue, type
        }
        clientInteractPost(data, token).then((res) => {
            if(res.status === 200) {
                alert('comment created')
                
            }
        })
    }
    console.log(commentValue, postComments)
    return (
    <div className={styles.comments}>
    {postComments.length > 0 && postComments.map((comment) => (
        <div className={styles.comment}>
            <span>
            <Avatar src={comment.user.profileImg}/>
            <small>{comment.user.username}</small>
            </span>
            <small>{comment.content.body}</small>
           <span>
           <IconButton>
                <MoreVertIcon />
            </IconButton>
           
           </span>
            
        </div>
    ))}
    <div className={styles.commentsBarWrapper}>
        <input type='text' placeholder='Leave a comment' onChange={(e) => setCommentValue(e.target.value)}/>  
        <IconButton>
        <SendIcon onClick={(e) => handleSubmitComment(e, 'Comment')}/>
        </IconButton>
    </div>
    </div>
  )
}

export default Comments