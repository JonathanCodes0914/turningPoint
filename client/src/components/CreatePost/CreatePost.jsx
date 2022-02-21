import React, { useState } from 'react';
import styles from './CreatePost.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ImageIcon from '@mui/icons-material/Image';
import { IconButton } from '@mui/material';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, selectToken } from '../../features/userSlice';
import {storage } from '../../api/Firebase';
import firebase from 'firebase';
import { clientCreatePostRequest } from '../../api/post';
import {useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';


const CreatePost = ({setShowCreatePost}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const history = useHistory();
  const [files, setFiles] = useState([ [], [], []]);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');

  console.log('files', files[0])

  console.log('caption', caption)

  console.log('token', token)

  const utils = {
    asyncForEach: async (array, callback) => {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < array.length; index++) {
        // eslint-disable-next-line no-await-in-loop
        await callback(array[index], index, array);
      }
    },
  };

  const createPost = async (e) => {
    e.preventDefault();
    const limitedFiles = [...files[0], ...files[1], ...files[2]]

    console.log('limited',limitedFiles)
    if (limitedFiles.length <= 3) {
      const newFiles = [];

      await utils.asyncForEach(limitedFiles, async (file) => {
        const ref = firebase.storage().ref(`uploads/${user._id}/${Date.now()}`);
        console.log(file)
        const snapshot = await ref.put(file);
        const url = await snapshot.ref.getDownloadURL();
        const fileType = file.type.split('/')[0];
        const fileInfo = { contentType: fileType, url };
        newFiles.push(fileInfo)
      })
      const data = {
        user_id: user._id,
        caption: caption,
        attachments: newFiles,
        tags: tags,
      }
        console.log('newFiles', newFiles)

        //create client api call to backend to create post
        clientCreatePostRequest(data, token).then((response) => {
          if(response.status === 200) {
            setShowCreatePost(false)
          }
        })
    }

  }

  return <div className={styles.createpost}>
    <div className={styles.createpost_form}>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <center> <h2>CREATE A NEW POST</h2></center>
        <Form.Control onChange={(e) => setCaption(e.target.value)} as="textarea" rows={5} placeholder='Write a caption...' />
      </Form.Group>

      <div className={styles.createPost_uploadButtons}>

        <label for='uploadFile'>

          <ImageIcon fontSize='large' />

        </label>
        <input onChange={(e) => {
          if (e.target.files.length === 0) return
          setFiles(oldArray => [e.target.files, ...oldArray])
        }}
          type="file"
          title=""
          accept="image/"
          multiple
          id='uploadFile'
          hidden
          className={styles.uploadFile}
        />

        <label for='uploadFile'>

          <VideoFileIcon fontSize='large' />

        </label>
        <input onChange={(e) => {
          if (e.target.files.length === 0) return
          setFiles(oldArray => [e.target.files, ...oldArray])
        }} type="file"
          title=""
          accept=" video/"
          multiple
          id='uploadFile'
          hidden
          className={styles.uploadFile}
        />

        <label for='uploadFile'>

          <MusicVideoIcon fontSize='large' />

        </label>
        <input onChange={(e) => {
          if (e.target.files.length === 0) return
          setFiles(oldArray => [e.target.files, ...oldArray])
        }} type="file"
          title=""
          accept="audio/"
          multiple
          id='uploadFile'
          hidden
          className={styles.uploadFile}
        />
        {/* <Button size="sm" active>
          <IconButton style={{ color: 'white' }} size='large'>
            <ImageIcon />
            <input onChange={(e) => setImages(e.target.files)} type="file"
          title=""
          accept="image/"
          multiple
          id={styles.uploadFile}

        />
          </IconButton>
        </Button>{' '}
        <Button size="sm" active>
          <IconButton className={styles.iconButton} style={{ color: 'white' }} size='large'>
            <VideoFileIcon />
            <input onChange={(e) => setVideos(e.target.files)} type="file"
          title=""
          accept="video/"
          multiple
          id={styles.uploadFile}

        />
          </IconButton>
        </Button>{' '}
        <Button size="sm" active>
          <IconButton style={{ color: 'white' }} size='large'>
        

            <label for='uploadFile'>
            <MusicVideoIcon />
            </label>
            <input onChange={(e) => setImages(e.target.files)} type="file"
          title=""
          accept="image/"
          multiple
          id={styles.uploadFile}

        />
          </IconButton>
        </Button>{' '} */}
      </div>
      <br />
      <div className="d-grid gap-2">
        <Button variant="dark" size="lg" onClick={(e) => createPost(e)}>
          CREATE POST
        </Button>

      </div>
    </div>
  </div>;
};

export default CreatePost;
