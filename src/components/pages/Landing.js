import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import sanityClient from '../../client.js';
import imageUrlBuilder from '@sanity/image-url';
import Button from '@mui/material/Button';
import '../../styles/Landing.css';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Landing = () => {
  const [allLandingData, setAllLanding] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "landing"]{
        name,
        header,
        sub_header,
        image_01,
        image_02,
        image_03,
        image_04,
        image_05,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => setAllLanding(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Low Core</title>
        <style type='text/css'>{`        
        .navbar,
        .footer {
          display: none;
        }

        body {
          height: 100%;
          background-color: #232526;
        }
    `}</style>
      </Helmet>

      {allLandingData &&
        allLandingData.map((item, index) => {
          return (
            <div key={index}>
              <div id='landing-header'>
                <div className='middle'>
                  <h1>{item.header}</h1>
                  <p id='sub-header'>{item.sub_header}</p>
                  <Button className='enter-btn' variant='contained'>
                    <Link className='enter-link' to='/home'>
                      ENTER
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

      {allLandingData &&
        allLandingData.map((item, index) => {
          return (
            <div key={index}>
              <ul className='slideshow'>
                <li
                  style={{
                    backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
                      item.image_01
                    ).url()})`,
                  }}
                ></li>
                <li
                  style={{
                    backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
                      item.image_02
                    ).url()})`,
                    animationDelay: '10s',
                  }}
                ></li>
                <li
                  style={{
                    backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
                      item.image_03
                    ).url()})`,
                    animationDelay: '20s',
                  }}
                ></li>
                <li
                  style={{
                    backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
                      item.image_04
                    ).url()})`,
                    animationDelay: '30s',
                  }}
                ></li>
                <li
                  style={{
                    backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
                      item.image_05
                    ).url()})`,
                    animationDelay: '40s',
                  }}
                ></li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default Landing;
