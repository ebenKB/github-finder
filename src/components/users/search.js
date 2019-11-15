import React, { Component } from 'react'
import PropTypes from 'prop-types';

class search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    clearUsers: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    canClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value,
      //[e.target.name]: e.target.value
    });
  }

  onSubmit = (e) =>{
    e.preventDefault();
    if(this.state.text === ''){
      this.props.setAlert('Please enter text', 'light')
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({
        text: '',
      })
    }
  }
  render() {
    // destructure the properties from the props
    const {canClear, clearUsers} = this.props
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input 
            type="text" 
            name="text" 
            value={this.state.text} 
            placeholder="Search users..."
            onChange={this.onChange}
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
}

export default search
