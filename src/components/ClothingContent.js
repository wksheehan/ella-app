import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Clothes } from '../components/Clothes';
import AddClothing from '../components/AddClothing';

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
  centered: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function ClothingContent() {
  const classes = useStyles();
  const [clothes, getClothes] = useState([]);

  useEffect(() => {
      fetch("/clothing").then(response =>
          response.json().then(data => {
              getClothes(data);
      })
  );
  }, []);

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
        Welcome to the closet page.
        </Typography>
        <h2>All clothing:</h2>
        <Clothes clothes={clothes} onDeleteClothing={
                deletedClothing => getClothes(currentClothes => currentClothes.filter(clothing => clothing.id !== deletedClothing.id))
            } />
        <AddClothing onNewClothing = {
            clothing => getClothes(currentClothes => [...currentClothes, clothing])
        }/>
      </div>
    </main>
  );
}

export default ClothingContent;
