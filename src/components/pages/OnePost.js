import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import sanityClient from '../../client.js';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Spinner from '../misc/Spinner.js';
import classes from '../../styles/OnePost.module.css';

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

  if (!postData) return <Spinner />;

  return (
    <div>
      <Helmet>
        <title>Low Core | Blog | {postData.title}</title>
      </Helmet>
      <div
        className={classes.HeroImage}
        style={{
          backgroundImage: `linear-gradient( 0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${urlFor(
            postData.mainImage
          ).url()})`,
        }}
      >
        <div className={classes.HeroContainer}>
          <h1
            className={classes.HeroHeader}
            //style={{ fontsize: '72px', color: '#ffffff' }}
          >
            <span
              className={classes.HeroHeaderSpan}
              //style={{ padding: '6px 14px', display: 'inline-block' }}
            >
              {postData.title}
            </span>
          </h1>
        </div>
      </div>
      <div className={classes.AvatarContainer}>
        <h2 className={classes.AvatarH2}>{postData.title}</h2>
        <div>
          <p className={classes.AvatarAuthorText}>By {postData.author}</p>
          <br />
          <Stack
            sx={{ display: 'flex', justifyContent: 'center' }}
            direction='row'
            spacing={2}
          >
            {postData.studentImage && (
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={urlFor(postData.studentImage).url()}
                alt={postData.author}
              />
            )}
          </Stack>
        </div>
      </div>

      <div className={classes.MainTextContainer}>
        <Typography
          sx={{ fontSize: 18, fontFamily: `var(--paragraphFont)` }}
          color='text.secondary'
          gutterBottom
        >
          {format(new Date(postData.publishedAt), 'MMMM dd, yyyy')}
        </Typography>

        <div className={classes.MainText}>
          <BlockContent
            blocks={postData.body}
            projectId={sanityClient.clientConfig.projectId}
            dataset={sanityClient.clientConfig.dataset}
          />
        </div>

        <br />

        <div>
          <Link className={classes.BackToBlogBtn} to='/blog'>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
