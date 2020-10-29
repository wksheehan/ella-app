import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import SignInContent from '../components/SignInContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function SignIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <SignInContent />
      <Footer />
    </div>
  );
}

export default SignIn;
