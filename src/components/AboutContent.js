import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    fontSize: 30,
    textAlign: "center",
  },
  centered: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
}));

function AboutContent() {
  const classes = useStyles();

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />

      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Hello! This is the about page. More info to come!
        </Typography>
      </div>
    </main>
  );
}

export default AboutContent;
