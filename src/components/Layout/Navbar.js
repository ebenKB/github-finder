import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // not a default import

const Navbar =({icon, title}) => { // destructure properties from props
  return (
    <nav className="navbar bg-primary">
      <h1>
        <span>
          <i className={icon} />
        </span>
          {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
}

// used to check and validate prop types
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Navbar
