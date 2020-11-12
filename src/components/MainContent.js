import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {GenerateOutfit} from '../components/GenerateOutfit';
import {Button} from 'semantic-ui-react';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
  centered: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function MainContent() {
  const classes = useStyles();
  const [outfit, getOutfit] = useState([]);

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
        Welcome to Ella App, Your closet simplified. Please upload pictures of your clothing items.
        </Typography>
        <h2>All users:</h2>
        <Button onClick={async() => {
                fetch("/outfit").then(response =>
                    response.json().then(data => {
                        getOutfit(data);
                }))
                }}>
            GenerateOutfit
        </Button>
        <GenerateOutfit outfit={outfit} />
      </div>
    </main>
  );
}

export default MainContent;
