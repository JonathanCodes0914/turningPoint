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
        
        </div>
       
      </div>
      <div className={styles.homeMiddle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#008b8b" fill-opacity="1" d="M0,0L80,48C160,96,320,192,480,213.3C640,235,800,181,960,181.3C1120,181,1280,235,1360,261.3L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
         
      <h1>Connect from all over the world!</h1>
      <p>Learn other People's Culture, their Nature, Way of thinking, Knowledge, Talents, Lifestyles and much more through us!</p>
         
         <img src='https://3.bp.blogspot.com/-RzsAO993gtw/W1dFHnTUrGI/AAAAAAAAp-M/2_lCCA7eKJMWMqP2hOM794dEcLZGjoMewCEwYBhgL/s1600/world_flags_globe_2.gif' />
         </div>


    </div>
  )
}

export default Home
