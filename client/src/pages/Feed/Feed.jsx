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
import Post from '../../components/Post/Post';
import { gsap } from "gsap";



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
    const postRef = useRef();

    useEffect(() => {
        //scroll to top of page 
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        clientGetFeedRequest(user._id, token).then((res) => {
            if (res.status === 200) {
                setFeedPosts(res.data.data)
            }
        })
        clientGetNewsHeadlines().then((res) => {
            const filterArticles = res.data.articles.slice(0, 6);
            setNews(filterArticles)
        })
        gsap.to(postRef.current, { rotation: "+=360" });
    }, [showCreatePost, showComments])

    const handleShowComments = (postId) => {
        //filter post by id and extract comments from it after populated
        const foundPost = feedPosts.filter((post) => post._id === postId)
    //setcurrentpostcomments array to from the extraction
        setShowComments({
            state: true,
            postId: postId,
            comments: foundPost[0].comments
        })

    }
    return (
        <div className={styles.feed}>
            {showComments.state === false && showCreatePost === false && showRequests === false && (
                <>

                    <div className={styles.requestButtons}>
                        <IconButton>
                            <AssignmentSharpIcon onClick={() => setShowRequest(true)} fontSize='large' style={{ color: 'black' }} />
                        </IconButton>
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
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Education</small></span>
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Nature</small></span>
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Exploration</small></span>
                                        <span  className={styles.feedLeftContentTag}><TagIcon fontSize='small' /> <small>Life</small></span>

                                    </div>
                                    <br />
                                    <p>Groups</p>
                                    <div className={styles.feed_LeftContentBottomGroups}>
                                        <span><GroupIcon fontSize='small' /> <small>Entrepreneurship</small></span>
                                        <span><GroupIcon fontSize='small' /> <small>Development</small></span>
                                        <span><GroupIcon fontSize='small' /> <small>Space Exploration</small></span>
                                        <span><GroupIcon fontSize='small' /> <small>Artificial Intelligence</small></span>


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
                                {feedPosts.map((story) => <Post story={story} handleShowComments={handleShowComments}/>)}
                            </div>

                        </div>

                        <div className={styles.feed_Right}>
                            <div className={styles.feed_RightContentWrapper}>
                                <p>Astronomy Picture Of The Day</p>
                                <small>September 14 , 2021</small>
                                <div className={styles.feed_RightContentPic}>
                                    <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGBgaHB8cGhwaGhwcHhwcGhoaHBwaGhwcIS4lHB4rHxwaJjgmKy8xNTU1JCQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJSs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKMBNgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgADBAUGB//EADUQAAEDAgQFAgYDAAIBBQAAAAEAAhEhMQMSQVEEYXGB8JGhBRMiscHRMuHxFEIjFVJykqL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAIxEBAQEAAgIBBAMBAAAAAAAAAAERAiESQTEDUWGBEyJxQv/aAAwDAQACEQMRAD8A+RAV29rVQCKL8QkNaTIbOUbZjJ91oLyTNi8/g6qSTAkkCYHMxMDnA9AruH4Zzw8tLRkZmdLspLdQ0H+R5BBRCkKEoICANf3X1si5tAaXIvWgaa8q+soevL8/hEAa2956enugBP6t+r3QTRRRpA69iLHQi/NAGPIMi4M/q6fFkuJ7ms+8lAYhgVFJAEAxN7j3SygvxWshpYXO+kF+ZoaGumIbBOZv8amKmypooGyogKYPIBEmDcSYMWkIRtpzUIQGUQmcxuVpDpcQczYIywaCf+0itLJQpYC2JE21jbko49Y083RhQqAJvl0JBECJk1MzUC5FKxam6DRv+tKKPZETtKBSoUYV/BMYXtGI4sYZlzW5iKGIbImohDGYqQmKkm3pyQAKHmmAtNuo8CjnE6k9fRAhTN9kEzBvaaohmMBaYDi8SaVblDSXEi8iJm0Skw8MuIa0FziYAAknoEJpCfh8F7zDGuc4Au+kEkBokmmgFZVgqi2qmZFRBKRzntH7Snqnb0mn4ofyllUIiQJMW0p9xNE7nUjTSdN42qqyoIooD36qIqAIwQZp3g86goucSANADHKSST5sECa1nnuZrNfutAtdUXFqi/UQmxmgEihE0IM0uD1ggdkrRNzArFOVkgKgICiBV+BgOecrGlxgmAKwGkuNNAASqFxMBzWtcWwHCWndVzp5r+0xMgVoNz6xsEpUBpX2jt7RKmWTSfRQDXyfAUW+iAAIgIhaeI4DEY1jnsc1uIMzCRAcJiRuEGYNrvqi0CNZ025yU7GSQCYBIk7TrGsJnsAJAMgEgOggEDWDUIpB556JsKA4SJbIkWkSJEi3VHJWg8hW4DGHMXuin0wJl2x2HNIpOLcxz3uYzIwuJayc2VujcxvG6rhWZPO6Jb1VFZMqQrWt5I5FMFJbCitOGoWKYioWt39vz9kCFe1hGgqIqJ7jmgMNMMUwoQtDWRoD1tWQkLEwxVCIbJAAqad7BWOFqCg9akydzWPRTLCIbjuDfhPOHiMLHt/k03EifsVnV+LiOeS5xLibkmSe5VWTVXAseidmK5pLmOLCZH0kgwRBFNCKQhlUyViY6oEIoK9trRX19EOqeCEHHlHnsiFzRUedFBY/v8a6pnRYTG8V7wd0qAvFbEDSdtEhTQgQgRRFRAM1AK7nrWI7flRRrZisczbRAKgh3Ib17KPdJtEmYFh0CsGGMhdmAcCAGwZIrLptAoErotrWTvtA0RSlO2RaQevqrOHAIeMmY5aHNGWCJIH/AHpSO6raa29DFNlEM5smlvLpCuv8G+IYeF8z5mC3EzMLG5iRkcbPEaiq5jwTodY6Vntf0RVYKYBN8swCRQzFtDBTNYmBIWzH4p+IGte9zmsEMBNGg1ho0EpWkj0iwNO4vzTMwZBiKCTJApQUBNTJsFcVWMI0sSdBU3Igga/0oWEUIg6g6K4TIdJzXmszvKLgSZJJJMmees6pgpDEflq/5adrFcNZ2sVgw1eMNWsw0w1lbhaJvlLWMKiIwzsmKyHAsdDzGnLRD5S2HCTPwxNAe/Svugx4eGKyJpTqo5nJaxhJxhIOecO3nl0pw11AzYAdpSnAnRXE1yjh8kMh9V0/kQbTy3SHDjn5qpOJrnHCKVzIXTdh+ctFU/CWvEc8tSlq2uwhWsKp2GN/PPss+KMxEpC1a3YQ3H39DZUvYpgpI9EzGAOGcEtkEgENJaSLE0EjVR7eUJCERHsjyaESPZKAnyUmvOliTQX2BSBQAKIlRUAkkzEk3AERzgevhSE7oToiG7c+VBXXogZwNRpM6HeKjkUoCLopBmkmljtW6hM7egH2UATJmRBvNNojWdZt7qSVVTzurGCJoDNK1ixkbGijGK5jFMCNZT9ddaV/tXBnJOxiuYxbkFTcNOMNamYJOnfoPsrsLhy4wInr++q1OJrI3CFI1FZihnTtCsbhx4VuHCgAzTkna2TUCPRXxxnWFvDk6K1nCkmDAA10WpzBKIYrkXtmHDhXs4UnuFe3C5K9nDuilOimcfZdZDw4AvP4U+Uukz4eStA+GqWGuN8oJhhikAk+W7rsf+nJTwQ3p5RMWORk5JmYMmAF0f8AjxoleXgRpyV8fdTWRnCPNm78qASVG8MSFownNGbPm/iQ0CDLtM02Av6LPnMKzEv4I/hDsVnxOHhaS880BiwD7J/U7jA5kKl7FucqXg1gkSIMailDyspi6xOCqLfAtD2quFFZ3s9a3HlVUWHzmt+M8vcXOcXOJJJJJJO5JqVT8tTBjcwhUOaupiMzWAtaugqam+qw4oqKdf62WLBmUpBrWbRpWTM00pz5IkI56RpMigNVEVIokT4B7KIEIpNNo9K9/wAFQHzdFpNhrT1pCA/r2qgBCICieYoe6qg1WNGn6+6ACtw20TBexrMrYac/1ZpP01/jlAqIrrsrWMlLhsWpmGtSA4TKig7zB61WnDwRcyem/NNhYe6vDoEb/hdJxZ0ozRlNR206ItCgVjQrpiBtEwby83VjWq1jEVUzBlaGYKvZheui2YeGKH1p5zScU0uDwswTTT0XS4fhWjr5dI1wbJidhNTNPVdbgGNBqZ1PXVYuR3nHymq2/DibDbRa8P4PqZp5Zd7gsbBN3DoLp+NxMOJbIMTJELjfqzflfGzrHEfwbGH62OtQ0/yVj4jFYZDWNbvLW6fdbeIxAS4F0i37grj4xA1kdPQLfld/DfDhfV7YOJJDqgV/9ojpRZOLwngjKJaRNfW9NFux2l0mx06rDx7qxteNTuu3GW8bd/xy+pf7TZ37ZnYciojyyycSyAKis61pSuytfiQsuM9Yt+znFc+aKFqqcnB0U0sK9pGiqcrs52RMEVWpNRkexV4sEyBFKxvFT3v3WstB1VTMOT5VMGfIjlFqz5VW4piotuRrSR7rH8wgyHQRqFL0vyGMW5b181XP4gRdW4rwbrPiOk1WLRWfdIUxH7/1Aur5b/FlClREEa/hBArRsYINPxVHz+/yi0xWa/0lBpbv5SEBATNPv69lAIIitvxI/CgNUinNzEfj3V2EEjGTbZW4fp+luQdFnD2ALTIOsW6q7h2zRZPmMmGin5t7xPeOa0tx4giJvZsRO34I9lqWJjbh6bhWfLkUNzYx91lwuKsdj4Oi1sxGuiJG9aa2XXjlSq8sGFY1WjCpemkfnZNh5RMi4jWk1kQanrRZsxUY1asHDNxVUtYnY2N/OS3xkYuuph8O82bJAmh07qzNFw5s0q2a7Quax5Aofdam/EngRMgTQxqIN+VFq58Rrhn/AE6eEKQ0EkgUGo7rZwzmMFQc2s399Fw2fESaZWU5etb6Jm8eBBt5atVx5cZfbrx5507j+NgfSwCoMxWOyGLxrgKgkxqNKLju+ImCGj8SqX8W7ryn8Lj/AAzddP5vu744qWim0kS6RzWPisQfSGgzP1Hrb/aLnN42kV5AWF5p6aofOMkim5W7PRx+pncaX42UVibnrrVcXicaSrMbGn/t2/xYsZ4Oljff+lqW5jlz5eXLyI987pHAmu6cHnCQ4piK09lGSuEIEpcRyrFU9i0POite0FsyAJtr1sqMNk6dITuAFytcZUqNa2DJr+ws7sT8/ZPiPGix42IpbhOy4j4WN+JsjjYiqx2ZWMeHtJfmBYJzMDSB9YiK3ETZc7WlWK+g37yNIKqJ5qOclv53UZSdjf3UZqZgi0c/sEPslJUEUT770/M16x77KIEe+TJ3lCEzHkEEGCII0rI9xudkXvmORJ6zEk+iKfCa0ghzspgwA2ZOgNRAmk1jYoGoHL99EgCfDfCQMyVa3zqjhy8gCJMCg/WqYMJ7eXW4otOg999VfhPIg/5zFfKqvGYzN/48xbA/mADMDNQE0mY5QkH2T4Rvw3tcamCdoj8LpY5wxhMLC75kuzglmQNEZcuUzO64DXbq5mJHRXdMdJnGGxNFpZxw1Plf2uMwk2Vwo6IB6GRbcHnuuk5VnHcZxDSDInvHVbuHDSIkGm5GXeaVovNtY6FbhvdeaTuOtlry77hjvktAksyl1oJIgagz/qoY8vnK2gMSY9t1zn8Q6fqmR29k7eLLTT7fdXYXv06Iw3G4iPdK7FItbdc9uM9xoSTpdK3Gdb7rPKz4hJfbpseXfuaftJi4locDOwp6rnuxTY9kXYxAFI1WfS/p1HYuR0SCNXNqI5c+qqxOJnU2NlznYvP0THFCfLW58NQcTQKrEBEh1I97Kj5+sLVgcK9+G/EaBlw4zVE/UYEC5sbK3JO2Yoc8Hf0S05x91A5waDUAyNRyKDTHNMBazNZaGMYxuYmXbDTeRukPFEMyAw2SYprE17BYsXiWjWVeom/Zo+eW1FP7osT8aszVZcXijpRZn4i58uSxqfj7rJi4p6Kp71U/EJJJqTXuudq6LnqsuUQlREHNRBSUEcFIVoIa5pcA9v0khrokR/HMBQ6Hmqybx5qio4UFwdZ11p2IUQmtp75fuD6KIhdPLa89vdWODfqM/wDxmpg78wLqvNQAU351mvt6KOIpBNq9Z05RHuimDlbwr2tcC9mdou2S2e4qFS1snbqfuUW7qo1txWZHgsOckFjs30sEnMMsVmRFaRqg3EVTIMAkDmbAc4EqNKarSHiNL/pTNyVTHgG0jn9xsU7HNMVI3N9NO61KLCazeqZ73O+pxJJ1JrQfqFq4H4Xi4rMTEYzMzDGZ5kUBp3WAuU0WByIcpwwYXQ9+QQa5S6sUEDcqsOp5CaNLHwE7XrFmR+ar5DrjivpAJtYHSTJhD/l0iPvb1vdcs4vPz/FHYncaHyyvlR1BxQg6E+aqv/kbGPyud8xTOnkOgOK79aqDH1PkLnh/NTMnkuuth8UANyOaqPESuZnTNxIV80dD54RdxZOt79lzjiJcyeQ6J4rmlPFFc8v12T8QMji3M11vqYczTIBofb1UvKi/Ex518/Koc9UvekDhNTTX+li0WueqXPla/i7MFuIRgPc/DgQ57criYrLetFjECZBtSsVI+kmlRWY1UoGZQEdKfnXtRKEEQ4k9ewoB/SUJ2Mk1V7OHJsEkGZwGn21QDSeq0P4YhVZCgQpQU5HnJBjZN4v6gEgU3NEAI9FEFEUrkG9EziKnSaf76K3G4VzH5H0cImsxmAIqORCBGtkG5dSItGs67K08M6Jgrd8La0H6rrqcViMDabe63OPWo82QR55uhKfEeCSaeGyQCQSLU9/8KxVW4jxNG5YAESTWIc6Tuaxoq86QuTOxCZ0m4FBebDmg0YHGPYHNa5zQ6jgDAI57qNezKZLs8jLQZYrmzG8/xjuswKkoLA9EPSTpTzmlNDVBaXoZ0mb9V/CBPugua/kSdI5G9q0BQD1UoEFmdHOq0EFxegHqsKA389E0WOf55ZAv7f1+1WidkD51C+FWEqaLS9LmUc8mpMn36oAXr/aAh3dNhsLnANBJJgAak6BKXTfwAR+EcPELSC0wQZBFIIqCOalDcTgOY4seC1wJDmuBBaRoQUhbBgjsn4jiHPeXvcXucZc4mS7eSdVW8iTFpoOWiAEImvndEedqoAebIi7DIpSDqZvW8aUgdl3vhrQaLz+QgTBgmJ5gCR7rdwXE5dVqXFemxfhGZuZokC64PFfDyDaF6H4R8aLDeQaEGxGxXT47AwcQZmENoSQdDEwIXTNh6fN8XDhUuC7nxXhYlcR5/wBqudmIbh+LfhnNhvLHRBIMGKGOlB6KKhRT9L39wRaaRoYQUc3Yyqh24pEQT/fJO17jMSaHnTU+ioMQLzr+IRa6FFWPBB7T6j9FLKGZQIgpoIuK8/LpSESd69VFFFoEEyBGhmtQIEDvWLJZTEClTOtKDaDP1egQKjKg7efdQIJKiCMICDv7KSlTNrTXT10QBOGHLmj6c0TFJiYnpolY2f7oLTfsg06IIoUSggihH9q7/lPGH8rN/wCMuz5YH8oy5pvamyoP+/0gLVAUXUJHYwZnuKFAiLghUAphEEzWlN966aIItdExqIsDTvY80AhBEKFREJURkRau8/hF7CIkRIDhaxsaIpUxf/u9ZqkJRLvx7fZAS7/UxJFwRIkTSQdRuFVKLnk3JOgkzQadFUasLiiDddbh/iVBU2r/AF2heelMX+BWVXf+I8c0tjVcFzufhSl/NDQpbqLOK4ovyZo+loY2AB9ImJgVNTU1USPYQSHAgihBoQdiFFGuyO/f3Rd+T+EFFWQUUUUoc1SqKIH8/wD0goopRDZXfEWBuI4NEAEiL/dRRRr0qFj2/KKiiqAooogiOg5g/chRRFgIlRREQKKKIFTFRRANFFFFQU+JfoKf/Y337oqIEZryj7gflBRRQqGyUKKKBtD0/ICDlFFQpQUURAKKiioIsoVFEUFFFEH/2Q==' />
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

            )}
            {showComments.state === true && (
                <div className={styles.feed_showComments}>
                    <IconButton onClick={() => setShowComments({
                        state: false,
                        postId: ''
                    })}>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                  
                   <Comments token={token} userId={user._id} postId={showComments.postId} comments={showComments.comments}/>
                </div>
            )}

            {showCreatePost === true && (
                <div className={styles.feed_showCreatePost}>

                    <IconButton onClick={() => setShowCreatePost(false)}>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                    <CreatePost setShowCreatePost={setShowCreatePost}/>

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
