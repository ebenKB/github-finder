import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/Alert/alertContext';

const Search = ({canClear, clearUsers, setAlert}) => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  // useState - react hook
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
     //[e.target.name]: e.target.value
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(text === ''){
      alertContext.setAlert('Please enter text', 'light')
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  }
  // destructure the properties from the props
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input 
          type="text" 
          name="text" 
          value={text} 
          placeholder="Search users..."
          onChange={onChange}
        />
        <input type="submit" value="search" className="btn btn-dark btn-block"/>
      </form>
      {/* check whether we can show the clear button  */}
      {githubContext.users.length > 0 &&
        <button 
          className="btn btn-light btn-clock"
          onClick={githubContext.clearUsers}
        >
        Clear users
      </button>
      }
    </div>
  )
}


export default Search
