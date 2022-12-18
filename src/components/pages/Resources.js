import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import sanityClient from '../../client.js';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Spinner from '../misc/Spinner.js';
import ScrollUpButton from 'react-scroll-up-button';
import nothingHereYet from '../../assets/img/no_resources.webp';
import classes from '../../styles/Resources.module.css';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Resources = () => {
  const [allResouces, setAllResources] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `*[_type == "resources"] | order(_createdAt desc){
        name,
        url,
        description,
        }`
      )
      .then((data) => setAllResources(data))
      .finally(() => setIsLoading(false))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Low Core | Resources</title>
      </Helmet>
      <div className={classes.MainContainer}>
        {/* ORIGINAL HEADER CODE  */}
        {/* <h1 className={classes.Header}>Resources</h1>
        <div>
          <p className={classes.SubHeader}>Useful Online Resources</p>
        </div> */}

        {allResouces && allResouces.length < 1 ? (
          <div className={classes.NothingHereImageDiv}>
            <img
              className={classes.NothingHereImage}
              src={nothingHereYet}
              alt=''
            />
          </div>
        ) : (
          !isLoading && (
            <div className={classes.HeaderContainer}>
              <h1 className={classes.Header}>Resources</h1>
              <div>
                <p className={classes.SubHeader}>Useful Online Resources</p>
              </div>
            </div>
          )
        )}

        {/* {!allResouces ? <Spinner /> : null} */}
        {isLoading ? <Spinner /> : null}

        <div className={classes.MainDiv}>
          {allResouces &&
            allResouces.map((resource, index) => {
              return (
                <Box key={index} sx={{ flexGrow: 1, maxWidth: '100%' }}>
                  <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='stretch'
                  >
                    <Grid item xs={12} md={6}>
                      <Demo>
                        <List>
                          <ListItem>
                            <ListItemText secondary={resource.description}>
                              <a
                                className={classes.Link}
                                href={resource.url}
                                rel='noopener noreferrer'
                                target='_blank'
                              >
                                {resource.name}
                              </a>
                            </ListItemText>
                          </ListItem>
                        </List>
                      </Demo>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
        </div>
      </div>
      <ScrollUpButton
        style={{
          marginBottom: '40px',
          marginRight: '-15px',
          background: `var(--primaryColor)`,
          borderRadius: '5px',
        }}
        ShowAtPosition={500}
      />
    </div>
  );
};

export default Resources;
