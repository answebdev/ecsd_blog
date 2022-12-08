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
import classes from '../../styles/Blog.module.css';
// import BackToTop from '../misc/BackToTop';

const Blog = () => {
  const [allPostsData, setAllPosts] = useState(null);

  // Fetch data and order by 'publishedAt' date in descending order: 'order(publishedAt desc'
  useEffect(() => {
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
      .catch(console.error);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Low Core | Blog</title>
      </Helmet>
      <div className={classes.MainContainer}>
        <h1 className={classes.Header}>Blog</h1>
        <div>
          <p className={classes.SubHeader}>Student Writing Samples</p>
        </div>

        {!allPostsData ? <Spinner /> : null}

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
                          <strong>{post.title}</strong>
                          <br />
                          {post.author}
                          <br />
                          <Typography
                            sx={{ fontSize: 14 }}
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
                      <Button size='small' variant='outlined'>
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
          background: `var(--primaryDark)`,
          borderRadius: '5px',
        }}
        ShowAtPosition={500}
      />
    </div>
  );
};

export default Blog;
