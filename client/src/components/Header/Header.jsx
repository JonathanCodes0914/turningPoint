import React, { useState , useRef, useEffect} from 'react';
import styles from './Header.module.css';
import { Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../features/userSlice';
import { Link, useHistory } from 'react-router-dom';
import { clientLogoutRequest } from '../../api/auth';
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
                    <Link  className={styles.menuLink} to='/'><li> <IconButton><HomeOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Home</li></Link>
                    {user && <>
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink}to='/feed' > <li> <IconButton><HomeOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Feed</li></Link>
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink}to='/content' > <li> <IconButton><HomeOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Content</li></Link>
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink}to='/explore' > <li> <IconButton><HomeOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Explore</li></Link>
                        <Link onClick={() => setMenuActive(false)} className={styles.menuLink}to={`/profile/${user._id}`} ><li> <IconButton><HomeOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Profile</li></Link>
                    </>}

                    {user ?  <li onClick={() => handleLogout()}> <IconButton><HomeOutlinedIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Sign Out</li> : <Link className={styles.menuLink}to='/login'><li> <IconButton><LoginIcon fontSize='medium' className={styles.headerIcon} /></IconButton>Login/Signup</li></Link> }
                </ul>
                <div className={styles.blur}></div>
            </div>}
            <div className={styles.headerLeft}>
                {/* <Avatar /> */}
            </div>
            <div className={styles.headerRight}>
                {menuActive  === false && <IconButton onClick={() => setMenuActive(true)}>
                    <MenuIcon  className={styles.headerIcon} />
                </IconButton>}

            </div>
        </div >
    )
}

export default Header
