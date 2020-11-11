import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import ProfileContent from '../components/ProfileContent'
import EditProfile from '../components/EditProfile'
import ToggleBox from '../components/ToggleBox'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Profile() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <ProfileContent />
      <ToggleBox title="Edit Profile" >
        <EditProfile />
      </ToggleBox>
      <Footer />
    </div>
  );
}

export default Profile;
