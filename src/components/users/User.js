import React, { Component, Fragment } from 'react'
import Spinner from '../Layout/spinner';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }
  static propTypes = {
    loading: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
  }
  render() {
    const {
      name, 
      avatar_url, 
      location, 
      bio, 
      blog,
      company,
      website,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      login,
    } = this.props.user;
    const { loading  } = this.props;
    if(loading)
      return <Spinner />
    return (
      <Fragment>
        <Link to='/' className="btn btn-light">
          Back to search
        </Link>
        Hireable: {' '}
        {hireable ? (<i className="fas fa-check text-success"/>) 
          : (<i className="fas fa-times-circle text-danger"/>)}
          <div className="card grid-2">
            <div className="all-center">
              <img src={avatar_url} alt="" className="round-img" style={{width: '150px'}}/>
              <h1>{name}</h1>
              <p>{location}</p>
            </div>
            <div>
              <div>
                <a href={html_url} className='btn btn-dark my-1'>
                  Visit Github profile
                </a>
              </div>
              {bio && 
              <Fragment>
                <strong>Bio: </strong>{bio}
              </Fragment>
              }
              <ul>
                <li>
                  {login && 
                    <Fragment>
                      <strong>Username: </strong>{login}
                    </Fragment>
                  }
                </li>
                <li>
                  { company && 
                    <Fragment>
                      <strong>Company: </strong>{company}
                    </Fragment>
                  }
                </li>
                <li>
                  {blog && 
                    <Fragment>
                      <strong>Blog: </strong>{blog}
                    </Fragment>
                  }
                </li>
                <li>
                  {website && 
                    <Fragment>
                      <strong>Website: </strong>{website}
                    </Fragment>
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="card text-center" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-danger">Public repos: {public_repos}</div>
            <div className="badge badge-dark">Public gists: {public_gists}</div>
          </div>
      </Fragment>
    )
  }
}

export default User
