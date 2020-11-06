import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import ClothingContent from '../components/ClothingContent'
import AddClothing from '../components/AddClothing'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Closet() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopMenu />
      <SideMenu />
      <ClothingContent />
      <Footer />
    </div>
  );
}

export default Closet;
