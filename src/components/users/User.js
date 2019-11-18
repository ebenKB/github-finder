import React, { useEffect, Fragment, useContext } from 'react'
import Spinner from '../Layout/spinner';
import { Link  } from 'react-router-dom';
import Repos from '../Repos/repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) =>{
  const githubContext = useContext(GithubContext);
  
  const {getUser, loading, user, repos, getUserRepos} = githubContext;

  useEffect(() => {
   getUser(match.params.login);
   getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);


  
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
    login
  } = user;
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
          <Repos repos={ repos }/>
      </Fragment>
    )
}
export default User
