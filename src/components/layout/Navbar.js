import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from '../../styles/Navbar.module.css';

const drawerWidth = 240;

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        LOW CORE
      </Typography>
      <Divider />
      <List style={{ textAlign: 'center' }} component='nav'>
        <Link style={{ textDecoration: 'none', color: '#1a2027' }} to='/home'>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary='Home' />
          </ListItemButton>
        </Link>
        <Link style={{ textDecoration: 'none', color: '#1a2027' }} to='/blog'>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary='Blog' />
          </ListItemButton>
        </Link>
        <Link
          style={{ textDecoration: 'none', color: '#1a2027' }}
          to='/resources'
        >
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary='Resources' />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className='navbar'>
      {/* For fixed/static navbar, use this opening <Box> tag code: */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          component='nav'
          position='static'
          sx={{
            // backgroundColor: '#545454',
            backgroundColor: `var(--primaryColor)`,
            boxShadow: 'none',
          }}
        >
          {/* <Box sx={{ display: 'flex' }}>
        <AppBar
          component='nav'
          sx={{
            backgroundColor: '#545454',
          }}
        > */}
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Visible Brand with Hamburger Icon */}
            <Typography
              sx={{
                flexGrow: '1',
                textAlign: 'center',
                mr: 2,
                display: {
                  sm: 'none',
                  md: 'none',
                  lg: 'none',
                  xl: 'none',
                },
                // fontFamily: 'Roboto',
                fontFamily: `'Roboto', sans-serif`,
                fontWeight: '500',
                fontSize: '1.25rem',
                lineHeight: '1.6',
              }}
            >
              <Link className={classes.TitleLink} to='/'>
                LOW CORE
              </Link>
            </Typography>

            {/* End Visible Brand with Hamburger Icon */}

            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Link className={classes.TitleLink} to='/'>
                LOW CORE
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {/* <Link className={classes.Link} to='/home' color='inherit'>
                Home
              </Link>
              <Link className={classes.Link} to='/blog' color='inherit'>
                Blog
              </Link>
              <Link className={classes.Link} to='/resources' color='inherit'>
                Resources
              </Link> */}
              <Button color='inherit'>
                <Link
                  style={{ textDecoration: 'none', color: '#ffffff' }}
                  to='/home'
                  color='inherit'
                >
                  Home
                </Link>
              </Button>
              <Button color='inherit'>
                <Link
                  style={{ textDecoration: 'none', color: '#ffffff' }}
                  to='/blog'
                  color='inherit'
                >
                  Blog
                </Link>
              </Button>
              <Button color='inherit'>
                <Link
                  style={{ textDecoration: 'none', color: '#ffffff' }}
                  to='/resources'
                  color='inherit'
                >
                  Resources
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component='nav'>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component='main'>
          <Toolbar />
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;

// ORIGINAL NAVBAR CODE:
// import React from 'react';
// import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import classes from '../../styles/Navbar.module.css';

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar
//           position='static'
//           sx={{
//             backgroundColor: '#545454',
//           }}
//         >
//           <Toolbar>
//             <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
//               <Link className={classes.TitleLink} to='/'>
//                 LOW CORE
//               </Link>
//             </Typography>
//             <Link className={classes.Link} to='/home' color='inherit'>
//               Home
//             </Link>
//             <Link className={classes.Link} to='/blog' color='inherit'>
//               Blog
//             </Link>
//             <Link className={classes.Link} to='/resources' color='inherit'>
//               Resources
//             </Link>
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </div>
//   );
// };

// export default Navbar;
