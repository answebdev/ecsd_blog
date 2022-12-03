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
// import BackToTop from '../misc/BackToTop';

import classes from '../../styles/Blog.module.css';

// import '../../App.css';

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
      <div style={{ padding: '2em 2em 0 2em' }}>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Blog
        </h1>
        <div>
          <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Student Writing Samples
          </p>
        </div>

        {!allPostsData ? <Spinner /> : null}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}
        >
          {allPostsData &&
            allPostsData.map((post, index) => (
              <div key={index} style={{ margin: '40px 20px' }}>
                <Card variant='outlined'>
                  <CardContent>
                    <img
                      style={{ width: '300px', height: '300px' }}
                      src={post.mainImage.asset.url}
                      alt={post.title}
                    />
                    <div>
                      <div style={{ lineHeight: '2', marginTop: '20px' }}>
                        <p style={{ width: '300px', lineHeight: '1.5' }}>
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
                      className={classes.ReadBtn}
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

      {/* <div
        style={{
          textAlign: 'center',
          padding: '40px 0 20px 0',
        }}
      >
        <BackToTop />
      </div> */}
      <ScrollUpButton
        style={{
          marginBottom: '40px',
          marginRight: '-15px',
          background: '#545454',
          borderRadius: '5px',
        }}
        ShowAtPosition={500}
      />
    </div>
  );
};

export default Blog;
