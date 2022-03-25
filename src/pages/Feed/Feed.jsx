import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectToken } from '../../features/userSlice';
import styles from './Feed.module.css';
import { Avatar, Icon, IconButton } from '@mui/material';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import CreatePost from '../../components/CreatePost/CreatePost';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TagIcon from '@mui/icons-material/Tag';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Request from '../Request/Request';
import Comments from '../../components/Comments/Comments';
import { clientGetFeedRequest } from '../../api/post';
import { clientGetNewsHeadlines } from '../../api/news';
import { clientGetNasaPicOfDay } from '../../api/nasa';
import Post from '../../components/Post/Post';
import { gsap } from "gsap";
import Loading from '../../components/Loading/Loading';



const Feed = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const feedStories = Array(8).fill({ caption: 'america the rgeatest', attachment: 'https://cdn.cheapism.com/images/011618_most_beautiful_views_in_the_world_sli.max-784x410_ZXOqfVp.jpg', username: 'cue banks' })
    feedStories[0].attachment = 'https://i.insider.com/5f15f64c3f7370109a1d96c6?width=1136&format=jpeg'
    const [showComments, setShowComments] = useState({
        state: false,
        postId: '',
        comments: []
    });
    const [showRequests, setShowRequest] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [feedPosts, setFeedPosts] = useState([]);
    const [news, setNews] = useState([]);
    const [nasaPic, setNasaPic] = useState({});
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const postRef = useRef();

    useEffect(() => {
        //scroll to top of page 
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        setLoading(true)
        clientGetFeedRequest(user._id, token).then((res) => {
            if (res.status === 200) {
                setFeedPosts(res.data.data)
            }
        })
        clientGetNewsHeadlines().then((res) => {
            const filterArticles = res.data.articles.slice(0, 6);
            setNews(filterArticles)
            
        })


        clientGetNasaPicOfDay().then((res) => {
            console.log('here',res)

            setNasaPic(res.data)
        })
        setLoading(false)
      
      
    }, [reload, token, user._id])

    const setReloadType = (type, postId) => {
        if(type === 'comment') {
           
            clientGetFeedRequest(user._id, token).then((res) => {
                if (res.status === 200) {
                    setFeedPosts(res.data.data)
                    const newComments = res.data.data.filter((post) => post._id === postId)
                    
                    setShowComments({
                        state: false
                    })
                    setShowComments({
                        state: true,
                        postId: postId,
                        comments: newComments[0].comments
                    })
                    
                
                }
            })
        
        } else if(type === 'new post') {
            clientGetFeedRequest(user._id, token).then((res) => {
                if (res.status === 200) {
                    setFeedPosts(res.data.data)
                }
            })
        }
    }

    const handleShowComments = (postId) => {
        //filter post by id and extract comments from it after populated
        const foundPost = feedPosts.filter((post) => post._id === postId)
    //setcurrentpostcomments array to from the extraction
        setShowComments({
            state: true,
            postId: postId,
            comments: foundPost[0].comments
        })

        setLoading(false)

    }
    return (
        <div className={styles.feed}>
            {showComments.state === false && showCreatePost === false && showRequests === false && loading === false ? (
                <>

                    <div className={styles.requestButtons}>
                        <button onClick={() => setShowRequest(true)}>
                        <IconButton>
                            <AssignmentSharpIcon fontSize='small' style={{ color: 'white' }} />
                        </IconButton>
                            View Requests</button>
                       
                    </div>
                    <div className={styles.feed_stories}>
                        <IconButton size='small'>
                            <div className={styles.feed_myStory}>
                                <img className={styles.feed_storyImg} src={feedStories[0].attachment} alt='feed story' />
                                <p>Your Story</p>

                            </div>
                        </IconButton>
                        {feedStories.map((story) => (
                            <IconButton size='small' >
                                <div className={styles.feed_story}>
                                    <img className={styles.feed_storyImg} src={story.attachment} alt='feed story' />
                                    <p>{story.username}</p>
                                </div>
                            </IconButton>
                        ))}
                    </div>



                    <div className={styles.feedLayout}>

                        <div className={styles.feed_Left}>
                            <div className={styles.feed_LeftContentWrapper}>
                                <div className={styles.feed_LeftContentTop}>
                                    <img className={styles.feed_LeftContentTopBackground} src='https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80' />
                                    <img className={styles.feed_LeftContentTopAvatar} src={user.profileImg} />
                                    <p>{user.firstname} {user.lastname}</p>
                                </div>

                                <div className={styles.feed_LeftContentMiddle}>
                                    <small>Grow your followers</small>
                                    <br />
                                    <small>Invitations 0</small>
                                </div>
                                <hr />
                                <div className={styles.feed_LeftContentBottom}>
                                    <p>Interests</p>
                                    <div className={styles.feed_LeftContentBottomTags}>
                                        <div className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Software Development</small></div>
                                        <br />
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Education</small></span>
                                        <br />
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Nature</small></span>
                                        <br />
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Exploration</small></span>
                                        <br />
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Life</small></span>
                                           <hr />

                                    </div>
                                    <br />
                                    <p>Groups</p>
                                    <div className={styles.feed_LeftContentBottomGroups}>
                                        <span><GroupIcon fontSize='small' /> <small>Entrepreneurship</small></span>
                                        <br />
                                        <span><GroupIcon fontSize='small' /> <small>Development</small></span>
                                        <br />
                                        <span><GroupIcon fontSize='small' /> <small>Space Exploration</small></span>
                                        <br />
                                        <span><GroupIcon fontSize='small' /> <small>Artificial Intelligence</small></span>
                                        <hr />


                                    </div>
                                    <br />
                                    <p>Events</p>
                                    <div className={styles.feed_LeftContentBottomEvents}>
                                        <span><EventIcon fontSize='small' /> <small>Life Success</small></span>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles.feed_content}>
                            <div className={styles.feed_postButton}>
                                <IconButton size='large'>
                                    <PostAddOutlinedIcon onClick={() => setShowCreatePost(true)} style={{ color: 'white', fontSize: '35px' }} />
                                </IconButton>
                            </div>
                            <div className={styles.feedWrapper}>
                                {feedPosts.map((story) => <Post story={story} handleShowComments={handleShowComments} setReload={setReload}/>)}
                            </div>

                        </div>

                        <div className={styles.feed_Right}>
                            <div className={styles.feed_RightContentWrapper}>
                                <p>Astronomy Picture Of The Day</p>
                                <p>{nasaPic.date}</p>
                                <div className={styles.feed_RightContentPic}>
                                    <img src={nasaPic.url} alt='space pic of the day'/>
                                </div>
                                <p>Daily News</p>
                                <div className={styles.feed_RightContentNews}>
                                    {news.length > 0 && news.map((content) => (
                                        <article onClick={() => window.open(content.url, '_blank').focus()} className={styles.feed_RightNewsArticle}>
                                         
                                            <small><NewspaperIcon /> - {content.title}</small>
                                
                                            
                                            <hr />
                                         
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </>

            ) : loading && <Loading />}
            {showComments.state === true && (
                <div className={styles.feed_showComments}>
                    <IconButton onClick={() => setShowComments({
                        state: false,
                        postId: ''
                    })}>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                  
                   <Comments token={token} userId={user._id} postId={showComments.postId} comments={showComments.comments} setLoading={setLoading} setReload={setReload} setReloadType={setReloadType}/>
                </div>
            )}

            {showCreatePost === true && (
                <div className={styles.feed_showCreatePost}>

                    <IconButton onClick={() => setShowCreatePost(false)}>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                    <CreatePost setShowCreatePost={setShowCreatePost} showCreatePost={showCreatePost} setReloadType={setReloadType}/>

                </div>
            )}

            {showRequests === true && (
                <>
                    <IconButton onClick={() => {
                        setShowRequest(false)
                    }}>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                    <Request />
                </>
            )}
        </div>
    )
}

export default Feed
