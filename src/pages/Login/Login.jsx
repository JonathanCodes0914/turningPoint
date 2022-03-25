import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login } from '../../features/userSlice';
import { clientLoginRequest, clientRegisterRequest } from '../../api/auth';
import { useHistory, } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FormLabel';
import { toast } from 'react-toastify';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const [register, setRegister] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    retypepassword: ''
  });

  useEffect(() => {
    if(user) history.push('/feed')
  }, [])
  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  console.log(registerValues)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(registerValues)
    const loginValues = {email: registerValues.email, password: registerValues.password}
    if(register && registerValues.firstname.length > 0 && registerValues.lastname.length > 0 && registerValues.username.length > 5 && registerValues.email.length > 0 && registerValues.password.length > 6) {
        if(registerValues.password === registerValues.retypepassword) {
          let response = await (register ? clientRegisterRequest(registerValues) : clientLoginRequest(loginValues))
          if (response.status === 200) {
            const { _id, firstname, lastname, username, email, profileImg, followers, following, posts } = response.data.user;
            dispatch(login({
              token: response.data.token,
              user : {
                _id,
                firstname,
                lastname, 
                username,
                email,
                profileImg,
                followers,
                following,
                posts
              }
            
            }))
            history.push('/feed')
            toast('Welcome To Social Space!');
          }
        }
    } else if(registerValues.email.length  > 0 && registerValues.password.length > 0){
      let response = await (register ? clientRegisterRequest(registerValues) : clientLoginRequest(loginValues))
      if (response.status === 200) {
        const { _id, firstname, lastname, username, email, profileImg, followers, following, posts } = response.data.user;
        dispatch(login({
          token: response.data.token,
          user : {
            _id,
            firstname,
            lastname, 
            username,
            email,
            profileImg,
            followers,
            following,
            posts
          }
        
        }))
  
        history.push('/feed')
        toast('Welcome Back!');
      } else if(response.status === 400) {
        toast.error('Email or Password Incorrect') 
      }
    }
  }


  return (
    <div className={styles.login}>
      {register ? <div className={styles.register__Form}>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div>
            <label>First Name *</label>
            <input onChange={(e) => handleRegisterChange(e)} name='firstname' type='text' placeholder='First Name' />
          </div>
          <div>
            <label>Last Name *</label>
            <input onChange={(e) => handleRegisterChange(e)} name='lastname' type='text' placeholder='Last Name' />
          </div>
          <div>
            <label>User Name *</label>
            <input onChange={(e) => handleRegisterChange(e)} name='username' type='text' placeholder='User Name' />
          </div>
          <div>
            <label>Email *</label>
            <input onChange={(e) => handleRegisterChange(e)} name='email' type='text' placeholder='Email' />
          </div>
          <div>
            <label>Password *</label>
            <input onChange={(e) => handleRegisterChange(e)} name='password' type='text' placeholder='Password' />
          </div>
          <div>
            <label>Retype Password *</label>
            <input onChange={(e) => handleRegisterChange(e)} name='retypepassword' type='text' placeholder='Password' />
          </div>
          <span className={styles.links}>
            <a>Forgot Password</a>
            <a onClick={() => setRegister(false)}>Login</a>
          </span>
          <center><button>Register</button></center>
        </form>
      </div> : <div className={styles.login__Form}>
        <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
          <label>Email *</label>
          <input onChange={(e) => handleRegisterChange(e)} type='text' name='email' placeholder='Email' />
        </div>
        <div>
          <label>Password *</label>
          <input onChange={(e) => handleRegisterChange(e)} type='password' name='password' placeholder='Password' />
        </div>
        <span className={styles.links}>
          <a>Forgot Password</a>
          <a onClick={() => setRegister(true)}>Register</a>
        </span>
        <center><button>Login</button></center>
        </form>
      </div>}
    </div>
  )
}

export default Login
