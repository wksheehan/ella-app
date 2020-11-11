import React, {useState} from 'react';
import './FormContent.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Button } from 'semantic-ui-react';
import { Link, useHistory } from "react-router-dom";


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


  let history = useHistory();
  const submitForm = () => {
    history.push('/profile')
  }
  const redirectToSignUp = () => {
    history.push('signup')
  }

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Sign in to Ella below!
        </Typography>
        <Form>
              <Form.Field>
                  <Input
                      width={3}
                      placeholder="Username"
                      value={username}
                      onChange={(e,data) => setUsername(data.value)}
                  ></Input>
              </Form.Field>
              <Form.Field>
                  <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e,data) => setPassword(data.value)}
                  ></Input>
              </Form.Field>

            <Button primary className={classes.centered} onClick={async() => {
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
                    submitForm();


                }}}>
                Sign In
            </Button>
            <Button secondary className={classes.centered} onClick={async() => {
              redirectToSignUp();
              }}>
                Don't have an account? Create one here.
            </Button>
        </Form>
    </div>
    </main>
  );
}

export default SignInContent;
