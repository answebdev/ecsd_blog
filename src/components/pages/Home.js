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
import IconSpeakerLoud from '../misc/IconSpeakerLoud';
import Spinner from '../misc/Spinner.js';
import ScrollUpButton from 'react-scroll-up-button';
import classes from '../../styles/Home.module.css';

// import nothing from '../../assets/img/no_students.webp';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Home = () => {
  const [allStudentsData, setAllStudents] = useState(null);

  // Fetch data and order by 'createdAt' date in ascending order
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "student"] | order(_createdAt asc){
        name,
        country,
        likes,
        dislikes,
        interesting_fact,
        future_plans,
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
                      <CardContent className={classes.CardContentDiv}>
                        <img
                          className={classes.CardImage}
                          src={urlFor(student.image).url()}
                          alt={student.name}
                        />
                        <div style={{ lineHeight: '0' }}>
                          <h3 className={classes.CardHeader}>{student.name}</h3>
                          <div style={{ paddingTop: '0' }}>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontFamily: `var(--paragraphFont)`,
                              }}
                              color='text.secondary'
                              gutterBottom
                            >
                              {student.country}
                            </Typography>
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
                                  <span className={classes.BioSpan}>Bio</span>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: '0' }}>
                                <div className={classes.AccordionDetailsDiv}>
                                  <p className={classes.AccordionDetailsText}>
                                    <strong>Likes: </strong> {student.likes}
                                    <br />
                                    <strong>Dislikes: </strong>
                                    {student.dislikes}
                                    <br />
                                    <strong>Interesting Fact: </strong>
                                    {student.interesting_fact}
                                    <br />
                                    <strong>Future Plans: </strong>
                                    {student.future_plans}
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
                                  Listen&nbsp;
                                  <IconSpeakerLoud />
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
                                  Listen&nbsp;
                                  <IconSpeakerLoud />
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

      {/* <div className={classes.HeaderContainer}>
        <h1 className={classes.MainHeader}>Graduates</h1>
        <div>
          <p className={classes.SubHeader}>
            Students who have graduated and moved up to the next level.
          </p>
        </div>
      </div> */}

      {/* {allStudentsData &&
        allStudentsData.slice(0, 1).map((student) => {
          if (!student.isActive !== undefined) {
            return (
              <div className={classes.HeaderContainer}>
                <h1 className={classes.MainHeader}>Graduates</h1>
                <div>
                  <p className={classes.SubHeader}>
                    Students who have graduated and moved up to the next level.
                  </p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })} */}

      {/* {allStudentsData &&
        allStudentsData.slice(0, 1).map((student, index) => {
          return (
            <div key={index}>
              {!student.isActive ? (
                <div className={classes.HeaderContainer}>
                  <h1 className={classes.MainHeader}>Graduates</h1>
                  <div>
                    <p className={classes.SubHeader}>
                      Students who have graduated and moved up to the next
                      level.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })} */}

      {/* Render header if there are students with 'isActive' value of 'null' (i.e., they are not active and have graduated).
      If there are 0 students with 'isActive' value of 'null', do not show header; as soon as there is at least one student with 'isActive' value of 'null',
      show the header.
      Use the 'slice' message to show header once; otherwise, it will get mapped and show as many times as there are students.
      The optional chaining (?.) operator below short-circuits if the reference is nullish (null or undefined):
      https://bobbyhadz.com/blog/react-get-first-element-of-array */}

      {allStudentsData &&
        allStudentsData
          .slice(allStudentsData.length - 1)
          .map((student, index) => {
            return (
              <div key={index}>
                {student?.isActive === null ? (
                  <div className={classes.HeaderContainer}>
                    <h1 className={classes.MainHeader}>Graduates</h1>
                    <div>
                      <p className={classes.SubHeader}>
                        Students who have graduated and moved up to the next
                        level.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

      {/* {allStudentsData &&
        allStudentsData.filter(function (student) {
          if (student === true) {
            return (
              <div className={classes.HeaderContainer}>
                <h1 className={classes.MainHeader}>Graduates</h1>
                <div>
                  <p className={classes.SubHeader}>
                    Students who have graduated and moved up to the next level.
                  </p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })} */}

      <div className={classes.MainContainer}>
        {allStudentsData &&
          allStudentsData.map((student, index) => {
            return (
              <div key={index}>
                {!student.isActive ? (
                  // <div style={{ margin: '40px' }}>
                  <div className={classes.CardDiv}>
                    <Card variant='outlined'>
                      <CardContent className={classes.CardContentDiv}>
                        <img
                          className={classes.CardImage}
                          src={urlFor(student.image).url()}
                          alt={student.name}
                        />

                        <div style={{ lineHeight: '0' }}>
                          <h3 className={classes.CardHeader}>{student.name}</h3>
                          <div style={{ paddingTop: '0' }}>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontFamily: `var(--paragraphFont)`,
                              }}
                              color='text.secondary'
                              gutterBottom
                            >
                              {student.country}
                            </Typography>
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
                                  <span className={classes.BioSpan}>Bio</span>
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: '0' }}>
                                <div className={classes.AccordionDetailsDiv}>
                                  <p className={classes.AccordionDetailsText}>
                                    <strong>Likes: </strong> {student.likes}
                                    <br />
                                    <strong>Dislikes: </strong>
                                    {student.dislikes}
                                    <br />
                                    <strong>Interesting Fact: </strong>
                                    {student.interesting_fact}
                                    <br />
                                    <strong>Future Plans: </strong>
                                    {student.future_plans}
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
                                  Listen&nbsp;
                                  <IconSpeakerLoud />
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
                                  Listen&nbsp;
                                  <IconSpeakerLoud />
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
