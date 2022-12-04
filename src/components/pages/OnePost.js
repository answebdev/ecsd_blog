import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import sanityClient from '../../client.js';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const Blog = () => {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          author,
          slug,
          studentImage,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
         publishedAt
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  // if (!postData) return <div>Loading...</div>;
  if (!postData) return <div></div>;

  return (
    <div>
      <Helmet>
        <title>Low Core | Blog | {postData.title}</title>
      </Helmet>
      <div
        style={{
          marginTop: '-70px',
          zIndex: '-10',
          position: 'relative',
          height: '500px',
          objectFit: 'contain',
          overFlow: 'hidden',
          backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
            postData.mainImage
          ).url()})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className='hero-image'
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
          className='container'
        >
          <h1 style={{ fontsize: '72px', color: '#ffffff' }}>
            <span style={{ padding: '6px 14px', display: 'inline-block' }}>
              {postData.title}
            </span>
          </h1>
        </div>
      </div>
      <div style={{ padding: '2em 4em 0 4em' }}>
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          {postData.title}
        </h2>
        <div>
          <p style={{ textAlign: 'center', lineHeight: '2' }}>
            By {postData.author}
          </p>

          <Stack
            style={{ display: 'flex', justifyContent: 'center' }}
            direction='row'
            spacing={2}
          >
            {postData.studentImage && (
              <Avatar
                alt={postData.author}
                sx={{ width: 100, height: 100 }}
                src={urlFor(postData.studentImage).url()}
              />
            )}
          </Stack>
        </div>
      </div>

      <div style={{ padding: '4em' }}>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {format(new Date(postData.publishedAt), 'MMMM dd, yyyy')}
        </Typography>
        <div style={{ fontSize: '20px', lineHeight: '1.6' }}>
          <BlockContent
            blocks={postData.body}
            projectId={sanityClient.clientConfig.projectId}
            dataset={sanityClient.clientConfig.dataset}
          />
        </div>

        <div>
          <Link to='/blog'>Back</Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
