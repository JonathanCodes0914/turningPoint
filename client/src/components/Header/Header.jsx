import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import FeaturedVideoOutlinedIcon from '@mui/icons-material/FeaturedVideoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../features/userSlice';
import { Link, useHistory } from 'react-router-dom';
import { clientLogoutRequest } from '../../api/auth';
import logo from '../Images/socialspacelogo.png';
import { gsap } from "gsap";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    const [menuActive, setMenuActive] = useState(false);
    const menuRef = useRef();



    const handleLogout = async () => {
        const response = await clientLogoutRequest();
        if (response.status === 200) {
            dispatch(logout())
            history.push('/')
        }
    }

    return (
        <div className={styles.header} >
            {menuActive && <div className={menuActive ? styles.menu_expand : styles.menu} >
                <ul ref={menuRef}>
                    <IconButton onClick={() => setMenuActive(false)}>
                        <CloseIcon fontSize='large' className={styles.headerCloseIcon} />
                    </IconButton>
                    <Link className={styles.menuLink} to='/' onClick={() => setMenuActive(false)}><li> <IconButton><HomeOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Home</li></Link>
                    <hr />
                    {user && <>
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink} to='/feed' > <li> <IconButton><DynamicFeedOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Feed</li></Link>
                        <hr />
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink} to='/content' > <li> <IconButton><FeaturedVideoOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Content</li></Link>
                        <hr />
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink} to='/explore' > <li> <IconButton><TravelExploreOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Explore</li></Link>
                        <hr />
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink} to={`/profile/${user._id}`} ><li> <IconButton><AccountBoxOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Profile</li></Link>
                        <hr />
                    </>}

                    {user ? <Link className={styles.menuLink} to={`/profile/${user._id}`} onClick={() => handleLogout()}><li > <IconButton><ExitToAppOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Sign Out</li> </Link> : <Link className={styles.menuLink} to='/login' onClick={() => setMenuActive(false)}><li> <IconButton><LoginIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Login/Signup</li></Link>}
                    <hr />
                </ul>
                <div className={styles.blur}></div>
            </div>}
            <div className={styles.headerLeft}>
                {/* <img src={logo} width='400px' height='100px' alt='web logo'/> */}
                <h1>Social Space</h1>
            </div>
            <div className={styles.headerRight}>
                {menuActive === false && <div className={styles.menuIcon}>
                    <IconButton   onClick={() => setMenuActive(true)}>
                    <MenuIcon style={{color: 'darkcyan'}} />
                </IconButton>
                    </div>}
                <div className={styles.headerRightDesktop}>

                    {user ? <>
                        <ul className={styles.listItemWrapper}>
                            <li onClick={() => history.push('/')}>  <IconButton><HomeOutlinedIcon fontSize='medium' style={{ color: 'white' }} /></IconButton>Home</li>
                            <li onClick={() => history.push(`/feed`)}> <IconButton><DynamicFeedOutlinedIcon fontSize='medium' style={{ color: 'white' }} /></IconButton>Feed</li>

                            <li onClick={() => history.push(`/content`)}> <IconButton><FeaturedVideoOutlinedIcon fontSize='medium' style={{ color: 'white' }} /></IconButton>Content</li>
                            <li onClick={() => history.push(`/explore`)}> <IconButton><TravelExploreOutlinedIcon fontSize='medium' style={{ color: 'white' }} /></IconButton>Explore</li>

                            <li onClick={() => history.push(`/profile/${user._id}`)}> <IconButton><AccountBoxOutlinedIcon fontSize='medium' style={{ color: 'white' }} /></IconButton>Profile</li>
                            <li > <IconButton><ExitToAppOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Sign Out</li>
                        </ul>
                    </> : <ul className={styles.listItemWrapper}>
                        <li onClick={() => history.push('/')}>  <IconButton  className={styles.listItemIcon} ><HomeOutlinedIcon fontSize='medium' style={{ color: 'white' }} /></IconButton>Home</li>
                        <li onClick={() => history.push('/login')}>  <IconButton><LoginIcon fontSize='medium' style={{ color: 'white' }} /></IconButton>Login/Signup</li>
                    </ul>}
                </div>
            </div>
        </div >
    )
}

export default Header
