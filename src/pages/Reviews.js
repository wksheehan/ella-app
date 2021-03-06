import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import ReviewContent from '../components/ReviewContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Review() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <ReviewContent />
      <Footer />
    </div>
  );
}

export default Review;
