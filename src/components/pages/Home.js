import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdPlayArrow } from 'react-icons/md';

import BackToTop from '../misc/BackToTop';

import data from '../../data';

const Home = () => {
  const [students, setStudents] = useState(data);

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
        {/* <div>
          <h2 style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Welcome to the best class!
          </h2>
        </div> */}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {students.map((student) => {
          return (
            <div key={student.id} style={{ margin: '40px' }}>
              <Card variant='outlined'>
                <CardContent>
                  <h3 style={{ width: '300px' }}>{student.name}</h3>
                  <img
                    style={{ width: '300px', height: '300px' }}
                    src={student.img}
                    alt={student.name}
                  />
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
                          {/* <div>
                            <p style={{ lineHeight: '1.5' }}>
                              <strong>Country: </strong>
                              {student.country}
                            </p>
                          </div>
                          <div>
                            <p style={{ lineHeight: '1.5' }}>
                              <strong>Likes: </strong>
                              {student.likes}
                            </p>
                          </div>
                          <div>
                            <p style={{ lineHeight: '1.5' }}>
                              <strong>Dislikes: </strong>
                              {student.dislikes}
                            </p>
                          </div> */}
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
                        <Button variant='outlined'>
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
