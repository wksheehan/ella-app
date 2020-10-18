import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import AboutContent from '../components/AboutContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <AboutContent />
      <Footer />
    </div>
  );
}

export default About;