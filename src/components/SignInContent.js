import React, {useState} from 'react';
import './FormContent.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Button } from 'semantic-ui-react';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    fontSize: 30,
    textAlign: "center",
  },
  content: {
    textAlign: "center",
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
  },
  labels: {
    alignContent: "center",
    textAlign: "center",
    marginLeft: 10,
    marginBottom: 10,
    display: 'block',
  },
  inputs: {
    margin: "auto",
    alignContent: "center",
    textAlign: "center",
    marginBottom: 10,
    display: 'block',
  },
  cancelbtn:{
    fontSize: 20,
    marginLeft: 300,
    marginRight: 20,

  },
  centered: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));


function SignInContent({onNewUser}) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Sign up for ELLA below!
        </Typography>
      </div>

      <form action="">

        <label for="username" className={classes.labels}><b>Username: </b></label>
        <input type="text" className={classes.inputs} placeholder="Enter Username" name="username" required
            value={username}
            onChange={e => setUsername(e.target.value)}
            ></input>

        <label for="psw" className={classes.labels}><b>Password: </b></label>
        <input type="password" className={classes.inputs} placeholder="Enter Password" name="psw" required
            value={password}
            onChange={e => setPassword(e.target.value)}
            ></input>

        <Button className={classes.centered} onClick={async() => {
            const user = {username, password};
            const response = await fetch("/signin", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                console.log('success');
            }}}>
            Sign In
        </Button>

      </form>

    </main>
  );
}

export default SignInContent;
