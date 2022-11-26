import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import sanityClient from '../../client.js';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
          slug,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
         publishedAt,
        "name": author->name,
        "authorImage": author->image
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
      }}
    >
      <Helmet>
        <title>
          Low Core | {postData.title}, by {postData.name}
        </title>
      </Helmet>
      <div style={{ padding: '2em 2em 0 2em' }}>
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          {postData.title}
        </h2>
        <div>
          <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Written by {postData.name}.
          </p>

          <Stack
            style={{ display: 'flex', justifyContent: 'center' }}
            direction='row'
            spacing={2}
          >
            <Avatar
              alt={postData.name}
              sx={{ width: 100, height: 100 }}
              src={urlFor(postData.authorImage).url()}
            />
          </Stack>
        </div>
      </div>
      <img src={urlFor(postData.mainImage).width(200).url()} alt='' />
      <div>
        <BlockContent
          blocks={postData.body}
          projectId={sanityClient.clientConfig.projectId}
          dataset={sanityClient.clientConfig.dataset}
        />
        <div>
          <p>{postData.publishedAt}</p>
        </div>
      </div>
      <div>
        <Link to='/blog'>Back</Link>
      </div>
    </div>
  );
};

export default Blog;
