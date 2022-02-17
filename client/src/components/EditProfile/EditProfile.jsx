import React, {useState, useEffect} from 'react';
import { clientEditProfileRequest } from '../../api/user';
import {useHistory} from 'react-router-dom';
import styles from '../EditProfile/EditProfile.module.css';



const EditProfile = ({user, token}) => {
  const history = useHistory();
  const [profileValues, setProfileValues] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    password:'',
    profileImg: user.profileImg
  })
  useEffect(() => {

  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    const data  = {
      userId: user._id,
      firstname: profileValues.firstname,
      lastname: profileValues.lastname,
      username: profileValues.username,
      email: profileValues.email
    }
    clientEditProfileRequest(data, token).then((res) => {
      if(res.status === 200) {
        alert("profile updated")
        history.push(`/profile/${user._id}`)
      }
    })
  }

  console.log(profileValues)
  return <div className={styles.EditProfile}><h2>Edit Profile</h2>
  <div className={styles.EditProfile_FormWrapper}>
    <form onSubmit={(e) => handleEditProfileSubmit(e)}>
      <span><input onChange={()=> console.log('yes')}type='file' placeholder='Change Profile Image'/> <img src={profileValues.profileImg} alt='current profile image' /></span>
      <input onChange={(e)=> handleInputChange(e)} name='firstname'type='text' value={profileValues.firstname} placeholder='First Name'/> 
       <input onChange={(e)=> handleInputChange(e)} name='lastname' type='text'  value={profileValues.lastname} placeholder='Last Name'/>
       <input onChange={(e)=> handleInputChange(e)} name='username'  type='text' value={profileValues.username} placeholder='User Name'/>
       <input onChange={(e)=> handleInputChange(e)} name='email'  type='text' value={profileValues.email} placeholder='Email'/>
       <input onChange={(e)=> handleInputChange(e)} name='password'  type='text' value={profileValues.password} placeholder='Password'/>
        <button>Update Profile</button>   
    
    </form>
  </div>
  </div>;
};

export default EditProfile;
