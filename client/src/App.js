import React from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './pages/Home/Home';
import Content from './pages/Content/Content';
import Footer from './components/Footer/Footer';
import SingleVideo from './components/SingleVideo/SingleVideo';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Request from './pages/Request/Request';


function App () {
  return (
    <div className={styles.app}>

      <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/profile/:id' exact component={Profile} />
        <Route path='/feed' exact component={Feed} />
        <Route path='/explore' exact component={Explore}/>
        <Route path='/content' exact component={Content}/>
        <Route path='/content/:id' exact component={SingleVideo}/>
        
      </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
