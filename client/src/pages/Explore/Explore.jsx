import React, { useEffect, useState } from 'react';
import { clientSearchRequest } from '../../api/user';
import { selectUser, login, selectToken } from '../../features/userSlice';
import { Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../../components/Loading/Loading';
import ViewPost from '../../components/ViewPost/ViewPost';
import styles from './Explore.module.css';
import { clientGetPexelsImages } from '../../api/pexels';
import { clientGetUnsplashImages } from '../../api/unsplash';

const Explore = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const history = useHistory();

    const [exploreStories, setExploreStories] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [userData, setUserData] = useState([]);
    const [pexelsPhotos, setPexelsPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewPhoto, setViewPhoto] = useState({
        state: false,
        photo: {}
    })

    const handleSearchRequest = (value) => {
        setSearchValue(value)
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            setUserData([])
            return
        }

        if (trimmed.length > 0) {
            clientSearchRequest(value, token).then((response) => {
                if (response) {
                    const data = response.data.data;
                    if (data.length > 0) {
                        setUserData(response.data.data)
                    }

                }
            })
        }

    }

    useEffect(() => {
        setLoading(true)

        clientGetUnsplashImages().then((res) => {
            console.log('unsplash res', res)
        })
        clientGetPexelsImages().then((res) => {
            setPexelsPhotos(res.data.photos)
            setLoading(false)
        }
        )
        // const exploreStoriesItems = Array(8).fill({ caption: 'america the rgeatest', attachment: 'https://cdn.cheapism.com/images/011618_most_beautiful_views_in_the_world_sli.max-784x410_ZXOqfVp.jpg', username: 'cue banks' })
        // setExploreStories(exploreStoriesItems)
        // exploreStories.forEach((story, i) => {
        //     const comp = (
        //         <img src={story.attachment} alt={story.caption} />
        //     )

        //     const colNumber = i % 4;
        //     gridCols[colNumber].push(comp);


        // });
    }, [])
    console.log(pexelsPhotos)
    return (
        <div className={styles.explore}>
            {viewPhoto.state === true ? <div className={styles.explore_singlePexelsPhotoWrapper}>
                <IconButton onClick={() => setViewPhoto(false)}>
                    <ArrowBackIcon fontSize='large' style={{ color: 'white' }} />
                </IconButton>
                <center><img className={styles.explore_singleImg} src={viewPhoto.photo.src.original} alt={viewPhoto.photo.alt} />
                </center>
                <a href={viewPhoto.photo.photographer_url}><p>By: {viewPhoto.photo.photographer}</p></a>

                <p>{viewPhoto.photo.alt}</p>
            </div> : <>
                <div className={styles.explore_search}>
                    <label>Find Other Users</label>
                    <input type='text' onChange={(e) => {
                        handleSearchRequest(e.target.value)
                    }} placeholder='Explore' />
                </div>
                <div className={styles.explore_contentRow}>
                    {userData.length > 0 && searchValue.trim().length > 0 ? userData.map((user) => {
                        return <div className={styles.exploreUser} onClick={() => history.push(`/profile/${user._id}`)}>
                            <Avatar src={user.profileImg} alt='avatar image' />
                            <p>{user.username}</p>
                        </div>
                    }) : null}
                </div>
                {loading ? <Loading /> : <div className={styles.explore_Tags}>

                    {pexelsPhotos.length > 0 && pexelsPhotos.map((photo) => {
                        return <img src={photo.src.medium} onClick={() => setViewPhoto({ state: true, photo: photo })} />
                    })}
                </div>}
            </>}

        </div>
    )
}

export default Explore
