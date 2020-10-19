import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {Users} from '../components/Users';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    fontSize: 30,
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
}));

function MainContent() {
  const classes = useStyles();
  const [users, getUsers] = useState([]);

  useEffect(() => {
      fetch("/user").then(response =>
          response.json().then(data => {
              getUsers(data);
      })
  );
  }, []);
  console.log(users);

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <div className={classes.title}>
        <Typography variant='h6'>ELLA APP</Typography>
      </div>
      <div className={classes.content}>
        <Users users={users} />
        <Typography paragraph>
          Welcome to Ella App, Your closet simplified. Please upload pictures of your clothing items.
        </Typography>
      </div>
    </main>
  );
}

export default MainContent;
