import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Landing = () => {
  return (
    <div>
      <Helmet>
        <title>Low Core</title>
        <style type='text/css'>{`        
        .navbar{
          display: none;
        }

        body {
          height: 100%;
        }
    `}</style>
      </Helmet>
      <div>
        <h1>Landing Page</h1>
        <Link to='/home'>ENTER</Link>
      </div>
    </div>
  );
};

export default Landing;
