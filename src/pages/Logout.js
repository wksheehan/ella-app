import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import LogoutContent from '../components/LogoutContent';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Logout() {
  const classes = useStyles();
  let history = useHistory();


  const hasRefreshed = false;

  const reload = (hasRefreshed) => {
    if (!hasRefreshed){
      history.go(0);
      hasRefreshed = true;
    }

  }

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <LogoutContent onLoad={async() => {reload(hasRefreshed)}}/>
      <img src={process.env.PUBLIC_URL + '/public/ella.jpeg'} />
      <Footer />
    </div>
  );
}

export default Logout;
