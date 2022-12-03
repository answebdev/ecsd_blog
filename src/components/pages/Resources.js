import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import sanityClient from '../../client.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      <div style={{ padding: '2em 2em 0 2em' }}>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Resources
        </h1>
        <div>
          <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
            Useful Online Resources
          </p>
        </div>

        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Website</TableCell>
                  <TableCell align='left'>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allResouces &&
                  allResouces.map((resource, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          <a
                            style={{ textDecoration: 'none' }}
                            href={resource.url}
                            rel='noopener noreferrer'
                            target='_blank'
                          >
                            {resource.name}
                          </a>
                        </TableCell>
                        <TableCell align='left'>
                          {resource.description}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Resources;
