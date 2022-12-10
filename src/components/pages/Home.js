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
import ScrollUpButton from 'react-scroll-up-button';
import classes from '../../styles/Home.module.css';
// import BackToTop from '../misc/BackToTop';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Home = () => {
  const [allStudentsData, setAllStudents] = useState(null);

  // Fetch data and order by 'createdAt' date in ascending order: 'order(_createdAt asc)'
  // Note: Since '_createdAt' is built in to Sanity, and not something that was added to the schema,
  // and underscore is used: '_createdAt'.
  // If this were a value added to the, such as 'publishedAt' in 'Blog.js', no underscore is used: 'publishedAt'.
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
        isActive,
        audio{
          asset->{
          _id,
          url
        }
      },
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
    <div>
      <Helmet>
        <title>Low Core | Home</title>
        <style type='text/css'>{`        
        html,
        body {
          overflow-x: hidden;
        }
      `}</style>
      </Helmet>
      <div className={classes.HeaderContainer}>
        <h1 className={classes.MainHeader}>Class Roster</h1>
        <div>
          <p className={classes.SubHeader}>
            Current students and former students who remained in this level when
            leaving the school.
          </p>
        </div>
      </div>

      {!allStudentsData ? <Spinner /> : null}

      <div className={classes.MainContainer}>
        {allStudentsData &&
          allStudentsData.map((student, index) => {
            return (
              <div key={index}>
                {student.isActive ? (
                  // <div style={{ margin: '40px' }}>
                  <div className={classes.CardDiv}>
                    <Card variant='outlined'>
                      <CardContent>
                        <img
                          className={classes.CardImage}
                          src={urlFor(student.image).url()}
                          alt={student.name}
                        />
                        <h3 className={classes.CardHeader}>{student.name}</h3>
                        <div>
                          <div className={classes.BioDiv}>
                            <p className={classes.BioText}>
                              <strong>Bio: </strong> {student.bio}
                            </p>
                          </div>
                          <div className={classes.AccordionDiv}>
                            <Accordion
                              sx={{
                                width: '300px',
                                boxShadow: 'none',
                                color: '#1a2027',
                              }}
                            >
                              <AccordionSummary
                                sx={{ padding: '0' }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                              >
                                <Typography
                                  sx={{
                                    fontFamily: `var(--paragraphFont)`,
                                    color: `var(--textColor)`,
                                  }}
                                >
                                  <strong>Details</strong>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: '0' }}>
                                <div className={classes.AccordionDetailsDiv}>
                                  <p className={classes.AccordionDetailsText}>
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
                              {!student.audio ? (
                                <Button
                                  disabled
                                  size='small'
                                  variant='outlined'
                                >
                                  Listen <MdPlayArrow />
                                </Button>
                              ) : (
                                <Button
                                  className={classes.ListenBtn}
                                  size='small'
                                  variant='outlined'
                                  onClick={() => {
                                    let audio = new Audio(
                                      student.audio.asset.url
                                    );
                                    audio.play();
                                  }}
                                >
                                  Listen <MdPlayArrow />
                                </Button>
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>

      <div className={classes.HeaderContainer}>
        <h1 className={classes.MainHeader}>Graduates</h1>
        <div>
          <p className={classes.SubHeader}>
            Students who have graduated and moved up to the next level.
          </p>
        </div>
      </div>

      <div className={classes.MainContainer}>
        {allStudentsData &&
          allStudentsData.map((student, index) => {
            return (
              <div key={index}>
                {!student.isActive ? (
                  // <div style={{ margin: '40px' }}>
                  <div className={classes.CardDiv}>
                    <Card variant='outlined'>
                      <CardContent>
                        <img
                          className={classes.CardImage}
                          src={urlFor(student.image).url()}
                          alt={student.name}
                        />
                        <h3 className={classes.CardHeader}>{student.name}</h3>

                        <div>
                          <div className={classes.BioDiv}>
                            <p className={classes.BioText}>
                              <strong>Bio: </strong> {student.bio}
                            </p>
                          </div>
                          <div className={classes.AccordionDiv}>
                            <Accordion
                              sx={{
                                width: '300px',
                                boxShadow: 'none',
                                color: '#1a2027',
                              }}
                            >
                              <AccordionSummary
                                sx={{ padding: '0' }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                              >
                                <Typography
                                  sx={{
                                    fontFamily: `var(--paragraphFont)`,
                                    color: `var(--textColor)`,
                                  }}
                                >
                                  <strong>Details</strong>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: '0' }}>
                                <div className={classes.AccordionDetailsDiv}>
                                  <p className={classes.AccordionDetailsText}>
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
                              {!student.audio ? (
                                <Button
                                  disabled
                                  size='small'
                                  variant='outlined'
                                >
                                  Listen <MdPlayArrow />
                                </Button>
                              ) : (
                                <Button
                                  className={classes.ListenBtn}
                                  size='small'
                                  variant='outlined'
                                  onClick={() => {
                                    let audio = new Audio(
                                      student.audio.asset.url
                                    );
                                    audio.play();
                                  }}
                                >
                                  Listen <MdPlayArrow />
                                </Button>
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>

      <ScrollUpButton
        style={{
          marginBottom: '40px',
          marginRight: '-15px',
          // background: '#545454',
          background: `var(--primaryColor)`,
          borderRadius: '5px',
        }}
        ShowAtPosition={500}
      />
    </div>
  );
};

export default Home;
