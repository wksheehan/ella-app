import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import LogoutContent from '../components/LogoutContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Logout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <LogoutContent/>
      <img src={process.env.PUBLIC_URL + '/public/ella.jpeg'} />
      <Footer />
    </div>
  );
}

export default Logout;
