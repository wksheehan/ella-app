import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';


function findSideMenuWidth(currentuser) {
  if (!currentuser.id) return 0;
  return 240;
}

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
  },
  footer: {
    marginLeft: 20,
    fontSize: 17,
  },
}));

function Footer() {
  const classes = useStyles();
  const [currentuser, getCurrentUser] = useState([]);

  
  useEffect(() => {
      fetch("/currentuser").then(response =>
          response.json().then(data => {
              getCurrentUser(data);
      })
  );
  }, []);

  const drawerWidth = findSideMenuWidth(currentuser);

  return (
    <AppBar position='fixed' 
          className={classes.appBar} 
          style={{left: drawerWidth}}>
      <Typography variant='h6' className={classes.footer}>
        © Copyright 2020
      </Typography>
    </AppBar>
  );
}

export default Footer;