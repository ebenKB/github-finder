import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({canClear, searchUsers, clearUsers, setAlert}) => {
  
  // useState - react hook
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
     //[e.target.name]: e.target.value
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(text === ''){
      setAlert('Please enter text', 'light')
    } else {
      searchUsers(text);
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
      {canClear &&
        <button 
          className="btn btn-light btn-clock"
          onClick={clearUsers}
        >
        Clear users
      </button>
      }
    </div>
  )
}

// Define the prop types
Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  canClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default Search
