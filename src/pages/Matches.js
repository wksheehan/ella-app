import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import MatchesContent from '../components/MatchesContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Matches() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <MatchesContent />
      <Footer />
    </div>
  );
}

export default Matches;
