import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import sanityClient from '../../client.js';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

// import Typography from '@mui/material/Typography';

const Blog = () => {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
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
    <div
      style={{
        backgroundColor: '#f4f4f4',
      }}
    >
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
          <h2 style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Samples of Student Writing
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {allPostsData &&
            allPostsData.map((post, index) => (
              <div key={index} style={{ margin: '40px' }}>
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
                          {post.title}
                        </p>
                      </div>
                    </div>
                    <Link
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
    </div>
  );
};

export default Blog;
