import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '@mui/material/Button';
import '../../styles/Landing.css';

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
          background-color: #000000;
        }
    `}</style>
      </Helmet>
      <div id='landing-header'>
        <div className='middle'>
          <h1>LOW CORE</h1>
          <p id='sub-header'>Welcome to the Best Class</p>
          <Button className='enter-btn' variant='contained'>
            <Link className='enter-link' to='/home'>
              ENTER
            </Link>
          </Button>
        </div>
      </div>

      {/* ORIGINAL SLIDESHOW */}
      {/* <ul className='slideshow'>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}

      {/* NOTE: When Sanity is setup, use the dynamic variables down below for the URL so that the image can be managed as desired in Sanity.
      If it doesn't work, then use ORIGINAL SLIDESHOW code above (don't forget to also uncomment out the commented out slideshow code in the CSS file) */}

      <ul className='slideshow'>
        <li
          style={{
            backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/7407372/pexels-photo-7407372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
          }}
        ></li>
        <li
          style={{
            backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/710743/pexels-photo-710743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            animationDelay: '10s',
          }}
        ></li>
        <li
          style={{
            backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/8613319/pexels-photo-8613319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            animationDelay: '20s',
          }}
        ></li>
        <li
          style={{
            backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            animationDelay: '30s',
          }}
        ></li>
        <li
          style={{
            backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/11395101/pexels-photo-11395101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            animationDelay: '40s',
          }}
        ></li>
      </ul>
    </div>
  );
};

export default Landing;
