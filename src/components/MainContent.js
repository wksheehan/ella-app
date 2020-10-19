import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {Users} from '../components/Users';
import {LoginForm} from '../components/LoginForm';

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
        <Typography paragraph>
        Welcome to Ella App, Your closet simplified. Please upload pictures of your clothing items.
        </Typography>
        <h2>Add a user:</h2>
        <LoginForm onNewUser={user => getUsers(currentUsers => [...currentUsers, user])}></LoginForm>
        <h2>All users:</h2>
        <Users users={users} />
      </div>
    </main>
  );
}

export default MainContent;
