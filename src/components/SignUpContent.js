import React, {useState} from 'react';
import { useHistory, withRouter, BrowserRouter } from 'react-router-dom';
import './FormContent.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Header, Button } from 'semantic-ui-react';

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

function SignUpContent() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Sign up for ELLA below!
        </Typography>
        <Form>
            <Form.Field>
                <Input
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
            <Form.Field>
                <Input
                    placeholder="First name"
                    value={first_name}
                    onChange={(e,data) => setFirstName(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder="Last name"
                    value={last_name}
                    onChange={(e,data) => setLastName(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e,data) => setEmail(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e,data) => setLocation(data.value)}
                ></Input>
            </Form.Field>
            <Button primary className={classes.centered} onClick={async() => {
                const user = {username, email, password, first_name, last_name, location};
                const response = await fetch("/signup", {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(user)
                });
                if (response.ok) {
                    console.log('success');
                    console.log(user);
                    setLastName("");
                    setFirstName("");
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setLocation("");
                }
                else {
                    setError("Problem signing up. Please try again");
                }
            }}>
                Sign Up
            </Button>
            { {error} && <Header as='h4' color='red'> {error} </Header> }
        </Form>
    </div>
    </main>
  );
}

export default withRouter(SignUpContent);
