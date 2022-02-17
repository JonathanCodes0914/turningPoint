import React, { useEffect, useState } from 'react';
import { clientSearchRequest } from '../../api/user';
import { selectUser, login, selectToken } from '../../features/userSlice';
import { Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './Explore.module.css';

const Explore = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const history = useHistory();

    const [exploreStories, setExploreStories] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [userData, setUserData] = useState([]);
    const gridCols = [[], [], [], []];

    const results = Array(50).fill({ caption: 'america the rgeatest', attachment: 'https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80', username: 'cue banks' });


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
    return (
        <div className={styles.explore}>
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
            <div className={styles.explore_Tags}>
                {results.map((tag) => {
                    return <img src={tag.attachment} />
                })}
            </div>
        </div>
    )
}

export default Explore
