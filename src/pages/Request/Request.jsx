import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { clientGetRequests, clientRequestResult } from '../../api/request';
import { selectUser, login, selectToken } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from '../Request/Request.module.css'

const Request = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const token = useSelector(selectToken)
  const [allRequests, setAllRequests] = useState([]);
  const [reload, setReload] = useState(false);
  const friendRequests = Array(8).fill({ caption: 'america the rgeatest', attachment: 'https://cdn.cheapism.com/images/011618_most_beautiful_views_in_the_world_sli.max-784x410_ZXOqfVp.jpg', username: 'cue banks' })

  useEffect(() => {
    //make request for user requests

    clientGetRequests(user._id, token).then((res) => {
      if (res.status === 200) {
        console.log(res.data.foundRequests)
        setAllRequests(res.data.foundRequests)
        setReload(false)
      }
    })
  }, [reload])

  const handleRequestResult = (type, requestId, userRequestingId, userId) => {
    //make request call
    const data = {
      requestId, type, userId, userRequestingId
    }
    clientRequestResult(data,token).then((res) => {
      if(res.status === 200) {
        setReload(true)

        toast(`Request ${type}`)
        clientGetRequests(user._id, token).then((res) => {
          if (res.status === 200) {
            console.log(res.data.foundRequests)
            setAllRequests(res.data.foundRequests)
            setReload(false)
          }
        })

      }
    })
  }
  return <div className={styles.requests}>
    {allRequests.length === 0 && <h2>No Requests Available</h2>}
    {allRequests.length > 0 && allRequests.map((request) => {
      return <div className={styles.singleRequest}>
        <Avatar src={request.userA.profileImg} alt='request image' />
        <span>{request.userA.username}<p>requested to follow you. </p></span>
        <span className={styles.request_ActionButtons}><button onClick={() => handleRequestResult('Accept', request._id, request.userA._id, user._id)}>Accept</button>{" "}<button onClick={() => handleRequestResult('Decline', request._id, request.userA._id, user._id)}>Decline</button></span>
      </div>
    })}
  </div>;
};

export default Request;
