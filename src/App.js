import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/search';
import Alert from './components/Layout/alert';
import About from './components/pages/about';
import Home from './components/pages/home';
import NotFound from './components/pages/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/Alert/AlertState';

const App =() => {

  // const {users, user, repos, loading} = this.state;
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github Finder"/>
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User}/>
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}


export default App;
