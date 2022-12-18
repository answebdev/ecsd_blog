import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import sanityClient from '../../client.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Spinner from '../misc/Spinner.js';
import ScrollUpButton from 'react-scroll-up-button';
import nothingHereYet from '../../assets/img/no_writing.webp';
import classes from '../../styles/Blog.module.css';

const Blog = () => {
  const [allPostsData, setAllPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data and order by 'publishedAt' date in descending order
  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc){
        title,
        author,
        publishedAt,
        slug,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => setAllPosts(data))
      .finally(() => setIsLoading(false))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Low Core | Blog</title>
      </Helmet>
      <div className={classes.MainContainer}>
        {/* ORIGINAL HEADER CODE */}
        {/* <h1 className={classes.Header}>Blog</h1>
        <div>
          <p className={classes.SubHeader}>Student Writing Samples</p>
        </div> */}

        {allPostsData && allPostsData.length < 1 ? (
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
              <h1 className={classes.Header}>Blog</h1>
              <div>
                <p className={classes.SubHeader}>Student Writing Samples</p>
              </div>
            </div>
          )
        )}

        {/* {!allPostsData ? <Spinner /> : null} */}
        {isLoading ? <Spinner /> : null}

        <div className={classes.MainDiv}>
          {allPostsData &&
            allPostsData.map((post, index) => (
              <div className={classes.CardDiv} key={index}>
                <Card variant='outlined'>
                  <CardContent>
                    <img
                      className={classes.CardImage}
                      src={post.mainImage.asset.url}
                      alt={post.title}
                    />
                    <div>
                      <div className={classes.CardTextDiv}>
                        <p className={classes.CardText}>
                          <span className={classes.CardHeader}>
                            <strong>{post.title}</strong>
                          </span>
                          <br />
                          {post.author}
                          <br />
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontFamily: `var(--paragraphFont)`,
                              //   fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                              // 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                              // sans-serif;`,
                            }}
                            color='text.secondary'
                            gutterBottom
                          >
                            {format(
                              new Date(post.publishedAt),
                              'MMMM dd, yyyy'
                            )}
                          </Typography>
                        </p>
                      </div>
                    </div>
                    <Link
                      className={classes.ReadBtnLink}
                      to={'/blog/' + post.slug.current}
                      key={post.slug.current}
                    >
                      <Button
                        className={classes.ReadBtn}
                        size='small'
                        variant='outlined'
                      >
                        Read
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
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

export default Blog;
