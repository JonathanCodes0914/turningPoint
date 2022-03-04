import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AppsIcon from '@mui/icons-material/Apps';
import ShareIcon from '@mui/icons-material/Share';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, selectToken } from '../../features/userSlice';
import { Avatar, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Profile.module.css';
import ViewPost from '../../components/ViewPost/ViewPost';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { clientGetProfilePostsRequest } from '../../api/post';
import { clientCreateFriendRequest, clientRequestResult } from '../../api/request';
import Loading from '../../components/Loading/Loading'
import { current } from '@reduxjs/toolkit';
import EditProfile from '../../components/EditProfile/EditProfile';



const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const [featuredPhotos, setFeaturedPhotos] = useState(false);
    const [reload, setReload] = useState(false);
    const [myPosts, setMyPosts] = useState([]);
    const [pageUser, setPageUser] = useState({});
    const [pageUserRequests, setPageUserRequests] = useState([])
    const [editProfile, setEditProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewPost, setViewPost] = useState({
        state: false,
        postId: '',
    })
    const currentUserId = user._id === window.location.pathname.split('/')[2] ? user._id : window.location.pathname.split('/')[2];
    useEffect(() => {
        setLoading(true)
        clientGetProfilePostsRequest(currentUserId, token).then((response) => {
            if (response.status === 200) {
                const requestsIdArray = [];
                const data = response.data.data
                const requests = response.data.requests;
                requests.forEach((request) => requestsIdArray.push(request.userA._id))
                setPageUserRequests(requestsIdArray)
                setPageUser(data, requests)
                const filteredPosts = data.posts.filter((post) => {
                    return post.content.attachments.length !== 0
                });
                setMyPosts(filteredPosts)
                setLoading(false)
            }
        })
    }, [reload])
    console.log('my posts', myPosts)
    const displayAttachment = (postId, attachments) => {
        if (attachments[0].contentType === 'image') {
            return <img onClick={(e) => {
                setViewPost({
                    state: true,
                    postId: postId,
                })
            }} src={attachments[0].url} alt='label' />
        }
        if (attachments[0].contentType === 'video') {
            return <img src='https://girishboke.github.io/day01/assets/media/video-poster.jpg' onClick={(e) => {
                setViewPost({
                    state: true,
                    postId: postId,
                })
            }} />
        }
        if (attachments[0].contentType === 'audio') {
            return <img src='https://static.displate.com/280x392/displate/2020-08-06/affd1a71295669950308eaa30e6c5473_6099a3a9daf8faaa5e63ada15b63731b.jpg' onClick={(e) => {
                setViewPost({
                    state: true,
                    postId: postId,
                })
            }} />


        }
    };

    const sendFriendRequest = (userA, userB, type) => {
        const data = { userA, userB, type }
        clientCreateFriendRequest(data, token).then((res) => {
            if (res.status === 200) {
                alert("request succesfful")
                setReload(true)
            }
        })
    }

    const sendUnfollowRequest = (type, userFollowersId, userIdToDelete) => {
        const data = {
            type, userFollowersId, userIdToDelete
        }
        clientRequestResult(data, token).then((res) => {
            if (res.status === 200) {
                alert('User Unfollowed')
                setReload(true)
            }
        })
    }

    const checkFollowing = (idToFind) => {
        if (pageUser.followers?.includes(idToFind)) {
            return <IconButton onClick={() => sendUnfollowRequest('Unfollow', pageUser._id, user._id)} style={{ color: 'black', fontSize: '15px' }}>
                <EditIcon />
                UnFollow
            </IconButton>
        } else if (pageUserRequests?.includes(user._id)) {
            return <IconButton >
                <PendingActionsOutlinedIcon />
                Pending
            </IconButton>
        } else if (currentUserId === user._id) {
            return <IconButton onClick={() => setEditProfile(true)} style={{ color: 'black', fontSize: '15px' }}>
                <EditIcon />
                Edit Profile
            </IconButton>
        } else {
            return <IconButton onClick={(e) => sendFriendRequest(user._id, pageUser._id, 'Friend')} style={{ color: 'black', fontSize: '15px' }}>
                <EditIcon />
                Follow
            </IconButton>
        }
    }
    return (
        <div className={styles.profile}>
            {viewPost.state === true || editProfile === true ? <>
                <IconButton onClick={() => viewPost.state ? setViewPost(false) : setEditProfile(false)}>
                    <ArrowBackIcon fontSize='large' />
                </IconButton>
                {viewPost.state === true && <ViewPost user={user} postId={viewPost.postId} token={token} />}
                {editProfile && <EditProfile user={user} token={token} />}
            </> : <>
                <div className={styles.profile_background}>
                    {/* <img className={styles.profile_backgroundImg} src=' alt='profile background' /> */}
                    <div className={styles.profile_info}>
                        <span>
                            <img className={styles.profile_avatarImg} alt='' src={currentUserId === window.location.pathname.split('/')[2] ? pageUser.profileImg : user.profileImg} />
                            <p className={styles.profile_username}>@{currentUserId === window.location.pathname.split('/')[2] ? pageUser?.username : user.username}</p>
                        </span>
                        <span>{myPosts.length}<motion.p initial={{ x: -200 }} animate={{ fontSize: 50, x: 0, y: 0 }}>Posts</motion.p></span>
                        <span>{currentUserId === window.location.pathname.split('/')[2] ? pageUser.followers?.length : user.followers?.length}<motion.p initial={{ x: -200 }} animate={{ fontSize: 50, x: 0, y: 0 }}>Followers</motion.p></span>
                        <span>{currentUserId === window.location.pathname.split('/')[2] ? pageUser.following?.length : user.following?.length}<motion.p initial={{ x: -200 }} animate={{ fontSize: 50, x: 0, y: 0 }}>Following</motion.p></span>
                    </div>
                </div>
                <div className={styles.profile_buttons}>
                    {currentUserId === window.location.pathname.split('/')[2] ? checkFollowing(user._id) : <IconButton style={{ color: 'black', fontSize: '15px' }} className={styles.profile_editButton}>
                        <EditIcon />
                        Edit Profile

                    </IconButton>}

                    <IconButton style={{ color: 'black', fontSize: '15px' }} className={styles.profile_shareButton}>
                        <ShareIcon />
                        Share Profile

                    </IconButton>
                </div>

                <div className={styles.profile_postFeatured}>
                    <div onClick={() => setFeaturedPhotos(false)}>
                        <IconButton style={{ color: 'black', fontSize: '15px', paddingRight: '75px' }} className={styles.profile_editButton}>
                            <AppsIcon />
                        </IconButton>
                    </div>
                    <div onClick={() => setFeaturedPhotos(true)}>
                        <IconButton style={{ color: 'black', fontSize: '15px' }} className={styles.profile_shareButton}>
                            <AccountBoxOutlinedIcon />
                        </IconButton>
                    </div>
                </div>

                <div className={styles.profile_Content}>

                    {featuredPhotos ? (
                        <>
                            <img onClick={() => {
                                setViewPost({
                                    state: true
                                })
                            }} src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                            <img src='https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80' />
                        </>
                    ) : (
                        <>
                            {loading ? <Loading /> : myPosts.length !== 0 ? myPosts.map((post) => {
                                return post.content.attachments.length !== 0 ? displayAttachment(post._id, post.content.attachments) : <p>{post.content.caption}</p>
                            }) : <p>No Posts Yet</p>}


                        </>
                    )}


                </div>
            </>}


        </div>
    )
}

export default Profile
