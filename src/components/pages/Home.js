import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import sanityClient from '../../client.js';
import imageUrlBuilder from '@sanity/image-url';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdPlayArrow } from 'react-icons/md';

import Spinner from '../misc/Spinner.js';
import BackToTop from '../misc/BackToTop';

// import data from '../../data';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Home = () => {
  // const [students, setStudents] = useState(data);

  const [allStudentsData, setAllStudents] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "student"] | order(_createdAt asc){
        name,
        bio,
        country,
        likes,
        dislikes,
        interesting_fact,
        audio,
        image,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => setAllStudents(data))
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
      }}
    >
      <Helmet>
        <title>Low Core | Home</title>
      </Helmet>
      <div style={{ padding: '2em 2em 0 2em' }}>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Current Students
        </h1>
        <div>
          <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Current students and those who have left the school at this level.
          </p>
        </div>
      </div>

      {!allStudentsData ? <Spinner /> : null}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {allStudentsData &&
          allStudentsData.map((student, index) => {
            return (
              <div key={index} style={{ margin: '40px' }}>
                <Card variant='outlined'>
                  <CardContent>
                    <img
                      src={urlFor(student.image).url()}
                      style={{ width: '300px', height: '300px' }}
                      alt={student.name}
                    />
                    <h3 style={{ width: '300px' }}>{student.name}</h3>
                    <div>
                      <div style={{ lineHeight: '2', marginTop: '20px' }}>
                        <p style={{ width: '300px', lineHeight: '1.5' }}>
                          <strong>Bio: </strong> {student.bio}
                        </p>
                      </div>
                      <div style={{ lineHeight: '1.5' }}>
                        <Accordion sx={{ width: '300px', boxShadow: 'none' }}>
                          <AccordionSummary
                            sx={{ padding: '0' }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                          >
                            <Typography>
                              <strong>Details</strong>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ padding: '0' }}>
                            <div style={{ lineHeight: '2' }}>
                              <p style={{ width: '300px', lineHeight: '2' }}>
                                <strong>Country: </strong> {student.country}
                                <br />
                                <strong>Likes: </strong> {student.likes}
                                <br />
                                <strong>Dislikes: </strong>
                                {student.dislikes}
                              </p>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                        <p>
                          <Button
                            size='small'
                            variant='outlined'
                            onClick={() => {
                              let audio = new Audio(student.audio);
                              audio.play();
                            }}
                          >
                            Listen <MdPlayArrow />
                          </Button>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
      </div>
      <div
        style={{
          textAlign: 'center',
          padding: '40px 0 20px 0',
        }}
      >
        <BackToTop />
      </div>
    </div>
  );
};

export default Home;
