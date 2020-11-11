import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    fontSize: 30,
    textAlign: "center",
  },
  centered: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
  gallery: {
    margin: 5,
    border: 1,
    float: 'left',
    width: 180,
  },
  
  picture: {
    width: '100%',
    height: 'auto',
  },
  
  desc: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 30,
    marginTop: 5,
    textAlign: "center",
  }
}));

function AboutContent() {
  const classes = useStyles();

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />

      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Hello, thanks for coming! We are excited that you would like to learn more about the history of this
          groundbreaking and revolutionary website which is disrupting a trillion-dollar industry.
        </Typography>
        <Typography paragraph>
          Ella was founded in September 2020 by a group of five students from Duke University. While their primary 
          impetus for creating this website was to change the world, they were also concerned about getting an exemplary
          grade in their Computer Science 316 class, Introduction to Databases. Here is a look at the five founders,
          in addition to two honorary mentions!
        </Typography>
        
        <div className={classes.centered} display='block' >
          <Typography variant='h3' align='left'>
            Founders:
          </Typography>
          <div className ={classes.gallery}>
            <a target="_blank" >
              <img className ={classes.picture} src={process.env.PUBLIC_URL + 'kate.jpg'} width="600" height="400"/>
            </a>
            <div className ={classes.desc}>This is Kate Straneva! Hay Kate!</div>
          </div>

          <div className ={classes.gallery}>
            <a target="_blank">
              <img className ={classes.picture} src={process.env.PUBLIC_URL + 'dan.jpg'} width="600" height="400"/>
            </a>
            <div className ={classes.desc}>This is Dan Berlin! Berlin, Germany!</div>
          </div>

          <div className ={classes.gallery}>
            <a target="_blank" >
              <img className ={classes.picture} src={process.env.PUBLIC_URL + 'will.jpg'} width="600" height="400"/>
            </a>
            <div className ={classes.desc}>This is Will Sheehan! Must have been cold!</div>
          </div>

          <div className ={classes.gallery}>
            <a target="_blank" >
              <img className ={classes.picture} src={process.env.PUBLIC_URL + 'danny.jpg'} width="600" height="400"/>
            </a>
            <div className ={classes.desc}>This is Danny Wu! He looks like he lost!</div>
          </div>

          <div className ={classes.gallery} >
            <a target="_blank">
              <img className ={classes.picture} src={process.env.PUBLIC_URL + 'brandon.jpg'} width="600" height="400"/>
            </a>
            <div className ={classes.desc}>This is Brandon! What a dork!</div>
          </div>
        </div>
        

        <div className={classes.centered} display='block' >
          <Typography variant='h3' align='left'>
            Honorable Mentions:
          </Typography>
          <div className ={classes.gallery}>
            <a target="_blank" >
              <img className ={classes.picture} src={process.env.PUBLIC_URL + 'jane.jpg'} width="600" height="400"/>
            </a>
            <div className ={classes.desc}>This is our TA, Jane Li! Jane is the goat! Thanks, Jain!</div>
          </div>

          <div className ={classes.gallery}>
            <a target="_blank">
              <img className ={classes.picture} src={process.env.PUBLIC_URL + 'sudeepa.jpg'} width="600" height="400"/>
            </a>
            <div className ={classes.desc}>This is Sudeepa Roy, our fearless leader! We'll follow you anywhere!</div>
          </div>
        </div>

        
        
        
      </div>
    </main>
  );
}

export default AboutContent;
