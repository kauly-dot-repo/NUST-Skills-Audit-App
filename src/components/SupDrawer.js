import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';

import { AppBar, Avatar, Button, CssBaseline, Divider, Hidden, IconButton, Link, List, ListItem, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

import Subordinates from './Subordinates';
import { useHistory } from 'react-router';


const linkStyle = {
  marginRight: 20,
  "&:hover": {
    color: 'secondary'
  }
}
const dividerStyle = {
  backgroundColor: 'primary'
}
const avatarStyle = {
  marginRight: '10px',
  color: 'primary',
  backgroundColor: 'secondary',
}

const avatarStyle2 = {
  margin: '25px auto',
  color: 'primary',
  backgroundColor: 'secondary',
}
const spaceStyle = { margin: 'auto' }

const logo = {
  maxWidth: 200,
  margin: ' 3px auto 3px 0px'
}

const listStyle = { marginLeft: 'auto' }
const contentStyle = { paddingTop: '1000px' }
const titleStyle = { paddingLeft: 50, margin: '1px 1px' }
const drawerStyle = { padding: '100px' }

function SupDrawer(props) {

  const employees = props.employess;

  const [rightOpen, setRightOpen] = useState(false);

  const leftOpen = props.leftOpen;
  const setLeftOpen = props.setLeftOpen;

  function endSession() {
    localStorage.clear();
  }

  const history = useHistory();

  return (
    <div>
      <CssBaseline />
      <AppBar position='sticky' color='primary' maxWidth=''>

        <Toolbar disableGutters>
          <div style={logo}>
            <img src='https://www.nust.na/sites/default/files/nust_logoANDname-DARKBACKGROUND.png' alt="NUST LOGO" style={logo} />
            <Typography variant='body1' color='white' style={titleStyle}>Skills Audit System</Typography>
          </div>


          <Hidden smDown style={listStyle}>

            
            <Link style={linkStyle} color='secondary' variant='button' underline='none' href='/reports'>
              REPORTS
            </Link>
            <Link style={linkStyle} color='secondary' variant='button' underline='none' href='/' onClick={endSession}>
              LOG OUT
            </Link>


            <Avatar style={avatarStyle} onClick={() => history.push('/supervisor-profile')}>2</Avatar>

          </Hidden>

          <Hidden smUp>
            <IconButton>
              <MenuIcon color='secondary' onClick={() => setRightOpen(true)} />
            </IconButton>
          </Hidden>
        </Toolbar>

        <SwipeableDrawer open={rightOpen}
          onOpen={() => setRightOpen(true)}
          onClose={() => setRightOpen(false)}
          anchor='right'>
          <div>
            <IconButton>
              <ChevronRightIcon onClick={() => setRightOpen(false)} />
            </IconButton>
          </div>

          <Divider />

          <List>

            
            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='/reports'>
                REPORTS
              </Link>
            </ListItem>
            <ListItem>
              <Link style={linkStyle} color='primary' variant='button' underline='none' href='/'
                onClick={endSession}>
                LOG OUT
              </Link>
            </ListItem>
          </List>


        </SwipeableDrawer>
      </AppBar>

      <div>
        {/* <div className={classes.toolbar}></div> */}
        {props.children}
      </div>

    </div>
  );
}

export default SupDrawer;