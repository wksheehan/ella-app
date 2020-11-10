import React, { useState, useEffect } from 'react';
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

function ProfileContent() {
  const classes = useStyles();
  const [currentuser, getCurrentUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
      fetch("/currentuser").then(response =>
          response.json().then(data => {
              getCurrentUser(data);
      })
  );
  }, []);
  console.log(currentuser);

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />

      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Welcome, {currentuser.first_name}. Hope you're enjoying {currentuser.location}! Oops here's your password {currentuser.password}.
        </Typography>

        <form onsubmit="redirect;">

          <label for="email" className={classes.labels}><b>Username: </b></label>
          <input type="text" className={classes.inputs} placeholder="Enter Username" name="username" required
              value={username}
              onChange={e => setUsername(e.target.value)}
              ></input>

          <label for="psw" className={classes.labels}><b>Password: </b></label>
          <input type="password" className={classes.inputs} placeholder="Enter Password" name="psw" required
              value={password}
              onChange={e => setPassword(e.target.value)}
              ></input>

          <label for="psw-repeat" className={classes.labels}><b>Repeat Password: </b></label>
          <input type="password" className={classes.inputs} placeholder="Repeat Password" name="psw-repeat" required></input>

          <label for="firstname" className={classes.labels}><b>First Name: </b></label>
          <input type="text" className={classes.inputs} placeholder="Enter First Name" name="firstname" required
              value={first_name}
              onChange={e => setFirstName(e.target.value)}
              ></input>

          <label for="lastname" className={classes.labels}><b>Last Name: </b></label>
          <input type="text" className={classes.inputs} placeholder="Enter Last Name" name="lastname" required
              value={last_name}
              onChange={e => setLastName(e.target.value)}
              ></input>

          <label for="email" className={classes.labels}><b>Email: </b></label>
          <input type="text" className={classes.inputs} placeholder="Enter Email" name="email" required
              value={email}
              onChange={e => setEmail(e.target.value)}
              ></input>

          <label for="location" className={classes.labels}><b>Location: </b></label>
          <input type="text" className={classes.inputs} placeholder="Enter Location" name="location" required
              value={location}
              onChange={e => setLocation(e.target.value)}
              ></input>

          <Button className={classes.centered} onClick={async() => {
              const user = {username, email, password, first_name, last_name, location};
              const response = await fetch("/edit_profile", {
                  method: 'PUT',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(user)
              });
              if (response.ok) {
                  console.log('success');
                  setLastName("");
                  setFirstName("");
                  setUsername("");
                  setEmail("");
                  setPassword("");
                  setLocation("");
              }}}>
              Edit Profile
          </Button>

        </form>

      </div>
    </main>
  );
}

export default ProfileContent;
