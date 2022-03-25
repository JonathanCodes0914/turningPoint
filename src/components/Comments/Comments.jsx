import React, { useState, useEffect } from 'react'
import styles from '../Comments/Comments.module.css';
import { Avatar, Icon, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { clientInteractPost } from '../../api/post';
import CommentSettings from '../CommentSettings/CommentSettings';
import { toast } from 'react-toastify';
const Comments = ({ comments, postId, userId, token, setLoading, setReloadType, setReload }) => {
    const [commentValue, setCommentValue] = useState('');
    const [postComments, setPostComments] = useState([]);
    const [viewCommentSettings, setViewCommentSettings] = useState({
        state: false,
        commentId: ''
    });
    const feedStories = Array(8).fill({ caption: 'america the rgeatest', attachment: 'https://cdn.cheapism.com/images/011618_most_beautiful_views_in_the_world_sli.max-784x410_ZXOqfVp.jpg', username: 'cue banks' })


    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setPostComments(comments.reverse())
    }, [])

    const handleSubmitComment = (e, type) => {
        e.preventDefault();

        if (commentValue.trim().length === 0) {
            toast.error('Please input a comment')
            return
        }
        const data = {
            postId, userId, commentValue, type
        }
        clientInteractPost(data, token).then((res) => {
            if (res.status === 200) {
                setReloadType('comment', postId)
                setCommentValue('')
                toast('Comment Created')


            }
        })
    }

    const handleDeleteComment = () => {
        if (window.confirm('Want To Delete This Comment')) {
            const data = {
                type: 'Comment Delete',
                commentId: viewCommentSettings.commentId,
                postId
            }
            //make call
            clientInteractPost(data, token).then((res) => {
                if (res.status === 200) {
                    setReloadType('comment', postId)
                    alert('Comment Deleted')
                }
            })
        }
    }


    console.log(commentValue, postComments)
    return (
        <div className={styles.comments}>
            {viewCommentSettings.state === true && <CommentSettings handleDeleteComment={handleDeleteComment} />}
            {postComments.length > 0 ? postComments.map((comment) => (
                <div className={styles.comment}>
                    <span>
                        <Avatar src={comment.user.profileImg} />
                        <small>{comment.user.username}</small>
                    </span>
                    <p>{comment.content.body}</p>
                    <span>
                        {comment.user._id === userId && <IconButton onClick={() => setViewCommentSettings({
                            state: true,
                            commentId: comment._id
                        })}>
                            <MoreVertIcon />
                        </IconButton>}

                    </span>
                       
                </div>
            )) : <center><p>No Comments Yet</p></center>}
            <div className={styles.commentsBarWrapper}>
                <input type='text' placeholder='Leave a comment' onChange={(e) => setCommentValue(e.target.value)} />
                <IconButton>
                    <SendIcon onClick={(e) => handleSubmitComment(e, 'Comment')} />
                </IconButton>
            </div>
        </div>
    )
}

export default Comments