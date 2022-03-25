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
import { PrivateRoute } from './components/PrivateRoute';




function App () {
  return (
    <div className={styles.app}>

      <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/profile/:id' exact component={Profile} />
        <PrivateRoute path='/feed' exact component={Feed} />
        <PrivateRoute path='/explore' exact component={Explore}/>
        {/* <PrivateRoute path='/content' exact component={Content}/> */}
        {/* <PrivateRoute path='/content/:id' exact component={SingleVideo}/> */}
        <Route path='*' component={() => (<div><center>404 Not Found</center></div>)} />
      </Switch>
      </Router>
      
      <Footer />
    </div>
  );
}

export default App;
