import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import { Button } from 'semantic-ui-react';


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
}));

function LogoutContent() {
  const classes = useStyles();
    const [logoutMessage, getLogoutMessage] = useState([]);

  useEffect(() => {
      fetch("/logout").then(response =>
          response.json().then(data => {
              getLogoutMessage(data);
      })
  );
  }, []);
  console.log(logoutMessage);

  let history = useHistory();

  return (
    <main className={classes.fullWidth} >
      <div className={classes.toolbar} />

      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
            Hope to see you again soon!
        </Typography>
        <Button secondary className={classes.centered} onClick={async() => {history.push("/");}}>
            Return to home.
        </Button>
      </div>
    </main>
  );
}

export default LogoutContent;
