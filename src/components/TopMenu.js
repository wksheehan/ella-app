import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Face';
import { MenuItem } from '@material-ui/core';
import { Link } from "react-router-dom";


function findSideMenuWidth(currentuser) {
  if (!currentuser.id) return 0;
  return 240;
}

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function TopMenu() {
  const classes = useStyles();
  const [currentuser, getCurrentUser] = useState([]);

  
  useEffect(() => {
      fetch("/currentuser").then(response =>
          response.json().then(data => {
              getCurrentUser(data);
      })
  );
  }, []);
  console.log(currentuser);

  const drawerWidth = findSideMenuWidth(currentuser);
  

  const SignUpLink = () => (
    <MenuItem>
      <Link to="/signup" style={{color: 'white', textDecoration: 'none'}}>
        Sign Up
      </Link>
    </MenuItem>
  )

  const SignInLink = () => (
    <MenuItem >
      <Link to="/signin" style={{color: 'white', textDecoration: 'none'}}>
        Sign In
      </Link>
    </MenuItem>
  )

  return (
    <AppBar position='fixed' style={{left: drawerWidth}}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <MenuItem>

          <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
            Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about" style={{color: 'white', textDecoration: 'none'}}>
            About
          </Link>
        </MenuItem>        
        { !currentuser.id && <SignUpLink /> }
        { !currentuser.id && <SignInLink /> }

      </Toolbar>
    </AppBar>
  );
}

export default TopMenu;
