import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <MainContent />
      <Footer />
    </div>
  );
}

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> 89cbe470a253101aac422195abaa10493a9c568e
