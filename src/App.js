import React, {Component, Fragment} from 'react';
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

class App extends Component{
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  }

  static propTypes = {
    // searchUsers: PropTypes.func.isRequired,
  }

  render() { // render is a life cycle method that runs at a certain point when the component is loading  
  const {users, user, loading} = this.state;
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder"/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
              <Search 
                searchUsers={this.searchUsers} 
                clearUsers={this.clearUsers} 
                canClear={users.length > 0 ? true: false}
                setAlert={this.setAlert}
              />
              <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading}/>
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// search github users
searchUsers = async(text) => {
  this.setState({loading: true});
  const res = await axios
    .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  this.setState({
    users: res.data.items,
    loading: false,
  })
}

// Get a single github user
getUser = async (username) => {
  console.log('Getting user...')
  this.setState({loading: true});
  const res = await axios
    .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  this.setState({
    user: res.data,
    loading: false,
  })
}
// clear users from state
clearUsers =() => {
  this.setState({
    users: [],
    loading: false
  })
}
// set alert
setAlert =(msg, type) => {
  this.setState({
    alert: {msg, type}
  });

  setTimeout(() => {
    this.setState(({
      alert: null,
    }))
  }, 5000);
}
}


export default App;
