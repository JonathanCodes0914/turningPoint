import React from 'react';
import styles from '../CommentSettings/CommentSettings.module.css';

const CommentSettings = ({handleDeleteComment}) => {

  
  return (
    <div className={styles.CommentSettings}>
        <div className={styles.CommentSettings_Buttons}>
            <button onClick={() => handleDeleteComment()}>Delete Comment</button> 
            <hr />
            <button>Report Comment</button>
        </div>
    </div>
  )
}

export default CommentSettings