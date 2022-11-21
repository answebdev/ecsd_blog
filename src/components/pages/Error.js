import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from '../../logo.svg';
import classes from '../../styles/Error.module.css';

const Error = () => {
  return (
    <div>
      <Helmet>
        <title>Low Core Blog | Error</title>
        <style type='text/css'>{`        
        .navbar{
          display: none;
        }

        body {
          height: 100%;
        }
    `}</style>
      </Helmet>
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt='logo' />
          <p>
            <code>Oops! Page Not Found.</code>
          </p>
          <Link className={classes.AppLink} to='/home'>
            Home
          </Link>
        </header>
      </div>
    </div>
  );
};

export default Error;
