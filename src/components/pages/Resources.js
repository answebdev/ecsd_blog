import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import sanityClient from '../../client.js';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import classes from '../../styles/Resources.module.css';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Resources = () => {
  const [allResouces, setAllResources] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "resources"] | order(_createdAt desc){
        name,
        url,
        description,
        }`
      )
      .then((data) => setAllResources(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Low Core | Resources</title>
      </Helmet>
      <div className={classes.MainContainer}>
        <h1 className={classes.Header}>Resources</h1>
        <div>
          <p className={classes.SubHeader}>Useful Online Resources</p>
        </div>

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
                            <ListItemText
                              // secondaryTypographyProps={{
                              //   fontFamily: `var(--paragraphFont)`,
                              // }}
                              secondary={resource.description}
                            >
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
    </div>
  );
};

export default Resources;

// TABLE VERSION
// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import sanityClient from '../../client.js';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const Resources = () => {
//   const [allResouces, setAllResources] = useState(null);

//   useEffect(() => {
//     sanityClient
//       .fetch(
//         `*[_type == "resources"] | order(_createdAt desc){
//         name,
//         url,
//         description,
//         }`
//       )
//       .then((data) => setAllResources(data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div>
//       <Helmet>
//         <title>Low Core | Resources</title>
//       </Helmet>
//       <div style={{ padding: '2em 2em 0 2em' }}>
//         <h1
//           style={{
//             textAlign: 'center',
//           }}
//         >
//           Resources
//         </h1>
//         <div>
//           <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
//             Useful Online Resources
//           </p>
//         </div>

//         <div>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label='simple table'>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Website</TableCell>
//                   <TableCell align='left'>Description</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {allResouces &&
//                   allResouces.map((resource, index) => {
//                     return (
//                       <TableRow key={index}>
//                         <TableCell component='th' scope='row'>
//                           <a
//                             style={{ textDecoration: 'none' }}
//                             href={resource.url}
//                             rel='noopener noreferrer'
//                             target='_blank'
//                           >
//                             {resource.name}
//                           </a>
//                         </TableCell>
//                         <TableCell align='left'>
//                           {resource.description}
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Resources;
