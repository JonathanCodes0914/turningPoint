import React, { useState, useEffect } from 'react';
import { clientEditProfileRequest } from '../../api/user';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {updateUser } from '../../features/userSlice';
import firebase from 'firebase';
import styles from '../EditProfile/EditProfile.module.css';



const EditProfile = ({ user, token }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setFile] = useState();
  const [profileValues, setProfileValues] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    password: '',
    profileImg: user.profileImg,
  })

  useEffect(() => {

  }, [])

  const utils = {
    asyncForEach: async (array, callback) => {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < array.length; index++) {
        // eslint-disable-next-line no-await-in-loop
        await callback(array[index], index, array);
      }
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    const ref = await firebase.storage().ref(`uploads/profileimages/${user._id}/${Date.now()}`);
    const snapshot = await ref.put(file, {
      contentType: file.type
    });
    const url = await snapshot.ref.getDownloadURL();
    const data = {
      userId: user._id,
      firstname: profileValues.firstname,
      lastname: profileValues.lastname,
      username: profileValues.username,
      email: profileValues.email,
      profileImg: url
    }
    clientEditProfileRequest(data, token).then((res) => {
      if (res.status === 200) {
        dispatch(updateUser({
          user: res.data.returnUser
        }))
        alert("profile updated")
        history.push(`/feed`)
      }
    })
  }

  console.log(file)
  return <div className={styles.EditProfile}><h2>Edit Profile</h2>
    <div className={styles.EditProfile_FormWrapper}>
      <form onSubmit={(e) => handleEditProfileSubmit(e)}>
        <span><input onChange={(e) => setFile(e.target.files[0])} name='file' type='file' placeholder='Change Profile Image' /> <img src={profileValues.profileImg} alt='current profile image' /></span>
        <input onChange={(e) => handleInputChange(e)} name='firstname' type='text' value={profileValues.firstname} placeholder='First Name' />
        <input onChange={(e) => handleInputChange(e)} name='lastname' type='text' value={profileValues.lastname} placeholder='Last Name' />
        <input onChange={(e) => handleInputChange(e)} name='username' type='text' value={profileValues.username} placeholder='User Name' />
        <input onChange={(e) => handleInputChange(e)} name='email' type='text' value={profileValues.email} placeholder='Email' />
        <input onChange={(e) => handleInputChange(e)} name='password' type='text' value={profileValues.password} placeholder='Password' />
        <button>Update Profile</button>

      </form>
    </div>
  </div>;
};

export default EditProfile;
