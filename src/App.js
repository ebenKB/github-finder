import React, {useState, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/search';
import Alert from './components/Layout/alert';
import About from './components/pages/about';
import axios from 'axios';
// import PropTypes from 'prop-types'

const App =() => {
  // set default parameters
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos]=useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // search github users
const searchUsers = async(text) => {
  setLoading(true);
  const res = await axios
    .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
}

// Get a single github user
const getUser = async (username) => {
  setLoading(true);
  const res = await axios
    .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
}

const getUserRepos=async (username) => {
  setLoading(true);
  const res = await axios
    .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=create:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(res.data);
    setLoading(false);
}

// clear users from state
const clearUsers =() => {
  setUsers([]);
  setLoading(false);
}
// set alert
const showAlert =(msg, type) => {
  setAlert({msg, type})

  setTimeout(() => {
    setAlert(null);
  }, 5000);
}
  // const {users, user, repos, loading} = this.state;
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder"/>
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
              <Search 
                searchUsers={searchUsers} 
                clearUsers={clearUsers} 
                canClear={users.length > 0 ? true: false}
                setAlert={showAlert}
              />
              <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User 
                {...props} 
                getUser={getUser} 
                user={user} 
                getUserRepos={getUserRepos}
                repos={repos}
                loading={loading}
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
