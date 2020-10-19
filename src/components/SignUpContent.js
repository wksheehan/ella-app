import React, {useState} from 'react';
import './SignUpContent.css';
import { makeStyles } from '@material-ui/core/styles';
// import { Grid } from '@material-ui/core';
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
    //width: "50%",
    alignContent: "center",
    textAlign: "center",
    //marginLeft: 150,
    marginBottom: 10,
    display: 'block',
  },
  cancelbtn:{
    fontSize: 20,
    marginLeft: 300,
    marginRight: 20,

  },
  signupbtn:{
    fontSize: 20,
    marginLeft: 50,
    //marginRight: 20,

  },
  image: {
    paddingTop: "0px",
    paddingLeft: "295px",
    alignContent: "center",
  },
}));



function SignUpContent({onNewUser}) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.image} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Sign up for ELLA below!
        </Typography>
      </div>

      <form action="">

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
        <input type="text" className={classes.inputs} placeholder="Enter Email" name="email" required></input>

        <label for="location" className={classes.labels}><b>Location: </b></label>
        <input type="text" className={classes.inputs} placeholder="Enter Location" name="location" required
            value={location}
            onChange={e => setLocation(e.target.value)}
            ></input>

            <Button onClick={async() => {
                    const user = {username, password, first_name, last_name, location};
                    const response = await fetch("/user", {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    });
                    if (response.ok) {
                        console.log('success');
                        onNewUser(user);
                        setLastName("");
                        setFirstName("");
                        setUsername("");
                        setPassword("");
                        setLocation("");
                    }
            }}> Submit </Button>

        <div class="clearfix">
            <button type="button" className={classes.cancelbtn}>Cancel</button>
            <button type="submit" className={classes.signupbtn}>Sign Up</button>
        </div>

      </form>


    </main>
  );
}

export default SignUpContent;
