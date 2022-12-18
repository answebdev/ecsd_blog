import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import robot from '../../error-page.webp';
import classes from '../../styles/Error.module.css';

// Robot image: https://icons8.com/icon/JB5lRIhzKC0y/broken-robot

const Error = () => {
  return (
    <div>
      <Helmet>
        <title>Low Core | Error</title>
        <style type='text/css'>{`        
        .navbar,
        .footer {
          display: none;
        }

        body {
          height: 100%;
        }
    `}</style>
      </Helmet>
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={robot} className={classes.AppLogo} alt='logo' />
          {/* <p>
            <code>Oops! Page Not Found.</code>
          </p> */}
          <p className={classes.ErrorMsg}>Oops! Page Not Found.</p>
          <Link className={classes.AppLink} to='/home'>
            Home
          </Link>
        </header>
      </div>
    </div>
  );
};

export default Error;
