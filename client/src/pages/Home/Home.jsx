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

            
            <h2>Social Space</h2>
            

          </div>
        </Carousel>

        {/* <div className={styles.overlay}></div> */}
        <div className={styles.text}>
          
{/*             
             <h3  >
               Never Stop Exploring
             </h3>
             
             <p>
             Lets Explore The Universe One Picture At A Time.
             </p>
            <a href='/content'><button initial={{x: -200}} animate={{  color: 'white', x: 0, y: 0, }}><button >Explore</button></button></a> */}
        </div>
      </div>
      {/* <div className={styles.newsletter}>
             <h4>Signup To Receive Updates.</h4>
          
           <span>
           <input type='text'  placeholder='Email'/>
           <motion.button initial={{x: -550}} animate={{ fontSize: 50, color: 'white', x: 0, y: 0}}><button >Send -></button></motion.button>
          
           </span>
         </div> */}


    </div>
  )
}

export default Home
