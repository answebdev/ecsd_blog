import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import classes from '../../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          sx={{
            backgroundColor: '#545454',
          }}
        >
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link className={classes.TitleLink} to='/'>
                LOW CORE
              </Link>
            </Typography>
            <Link className={classes.Link} to='/home' color='inherit'>
              Home
            </Link>
            <Link className={classes.Link} to='/blog' color='inherit'>
              Blog
            </Link>
            <Link className={classes.Link} to='/resources' color='inherit'>
              Resources
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
