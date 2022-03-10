import React from 'react';
import styles from './Home.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  return (
    <div className={styles.home}>

      <div className={styles.showCase}>

        <Carousel  autoplay infiniteloop autoFocus showStatus={false} showThumbs={false} transitionTime={700} showIndicators={false} >
          <div className={styles.slider}>
            <video muted autoPlay playsInline loop>
              <source src='https://player.vimeo.com/external/480834220.hd.mp4?s=0d609dd4aceae6076d48bb6e815ef55cd7c91ee4&profile_id=175&oauth2_token_id=57447761' type='video/mp4' />
            </video>

            
          
            
           
          </div>
        </Carousel>

        <div className={styles.overlay}>
        <h2>Welcome To </h2>
        <h2> Social Space!</h2>
        
        <p>Explore The Web And World Through Us</p>

        
        </div>
       
      </div>
      {/* <div className={styles.newsletter}>
             <h4>Signup To Receive Updates.</h4>
          
           <span>
           <input type='text'  placeholder='Email'/>
         
           </span>
         </div> */}


    </div>
  )
}

export default Home
