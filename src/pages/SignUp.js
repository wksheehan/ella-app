import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import SignUpContent from '../components/SignUpContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function SignUp() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <SignUpContent />
      <Footer />
    </div>
  );
}

export default SignUp;