import React, { Component, useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import CheckBox from '@material-ui/icons/CheckBox';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import {Link, useHistory} from "react-router-dom";



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
    color: 'grey',
  },
  bigAvatar: {
    margin: 30,
    width: 100,
    height: 100,
  },
}));

const SideMenuCode = (classes,history) => (
  <Drawer
      open={true}
      variant='permanent'
      anchor='left'
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Grid container justify='center' alignItems='center'>
        <Avatar
         src={process.env.PUBLIC_URL + 'defaultuser.png'}
          className={classes.bigAvatar}
        />
        <List>
          {['Profile', 'Closet', 'Weather', 'Matches','Reviews','logout'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index  === 0 ? <AccountCircle /> :
                index === 1 ? <StarIcon /> :
                index === 2 ? <WbSunnyIcon />: 
                index === 3 ? <CheckBox /> :
                index === 4? <StarIcon /> : 
                <ExitToApp />}
              </ListItemIcon>
              <Link to={text} style={{textDecoration: 'none'}} >
                {text}
              </Link>
            </ListItem>
          ))}
        </List>
      </Grid>
      
    </Drawer>
)



function SideMenu() {
  const classes = useStyles();
  const [currentuser, getCurrentUser] = useState([]);

  
  useEffect(() => {
      fetch("/currentuser").then(response =>
          response.json().then(data => {
              getCurrentUser(data);
      })
  );
  }, []);
  console.log(currentuser);

  let history = useHistory();


  if (currentuser.id){
    return SideMenuCode(classes, history);
  }
  return(
    <div>

    </div>
  );

  // return (
  //   <Drawer
  //     open={true}
  //     variant='permanent'
  //     anchor='left'
  //     className={classes.drawer}
  //     classes={{
  //       paper: classes.drawerPaper,
  //     }}
  //   >
  //     <Grid container justify='center' alignItems='center'>
  //       <Avatar
  //        src={process.env.PUBLIC_URL + 'defaultuser.png'}
  //         className={classes.bigAvatar}
  //       />
  //     </Grid>
  //     <List>
  //       {['Profile', 'Closet', 'Weather', 'Matches','Reviews','logout'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index  === 0 ? <AccountCircle /> :
  //             index === 1 ? <StarIcon /> :
  //             index === 2 ? <WbSunnyIcon />: 
  //             index === 3 ? <CheckBox /> :
  //             index == 4? <StarIcon /> : 
  //             <ExitToApp />}
  //           </ListItemIcon>
  //           <Link to={text} style={{textDecoration: 'none'}}>
  //             {text}
  //           </Link>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Drawer>
  // );
}

export default SideMenu;
