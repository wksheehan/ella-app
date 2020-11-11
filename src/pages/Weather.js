import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import WeatherContent from '../components/WeatherContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Weather() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <WeatherContent />
      <Footer />
    </div>
  );
}

export default Weather;
