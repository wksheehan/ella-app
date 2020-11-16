import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ReviewCards } from '../components/ReviewCards';
import AddReview from '../components/AddReview';


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
    textAlign: "center",
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
  labels: {
    alignContent: "center",
    textAlign: "center",
    marginLeft: 10,
    marginBottom: 10,
    display: 'block',
  },
  inputs: {
    margin: "auto",
    alignContent: "center",
    textAlign: "center",
    marginBottom: 10,
    display: 'block',
  },
  cancelbtn:{
    fontSize: 20,
    marginLeft: 300,
    marginRight: 20,

  },
  centered: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));


function ReviewContent({onNewUser}) {
  const classes = useStyles();
  const [reviews, getReviews] = useState([]);
  const [clothes, getClothes] = useState([]);

  useEffect(() => {
      fetch("/reviews").then(response =>
          response.json().then(data => {
              getReviews(data);
      })
  );
  }, []);

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
      Welcome to the reviews page.
      </Typography>
      <h2>All reviews:</h2>
        <ReviewCards reviews={reviews}/>
        <AddReview
          clothes={clothes}
          onNewReview={reviews => getReviews(currentReviews => [...currentReviews, reviews])}
        />
    </div>
    </main>
  );
}

export default ReviewContent;
