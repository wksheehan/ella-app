import React, { Component, useState, useEffect } from 'react';
import { useHistory, withRouter, BrowserRouter } from 'react-router-dom';
import './FormContent.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Button, Header } from 'semantic-ui-react';
import ToggleBox from '../components/ToggleBox'


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




function EditProfile() {
  const classes = useStyles();
  const [currentuser, getCurrentUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");


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

      <div className={classes.content}>

      <Form>
            <Form.Field>
                <Input
                    placeholder={currentuser.username}
                    value={username}
                    onChange={(e,data) => setUsername(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                    type="password"
                    placeholder={currentuser.password}
                    value={password}
                    onChange={(e,data) => setPassword(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder={currentuser.first_name}
                    value={first_name}
                    onChange={(e,data) => setFirstName(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                    placeholder={currentuser.last_name}
                    value={last_name}
                    onChange={(e,data) => setLastName(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                        placeholder={currentuser.email}
                        value={email}
                        onChange={(e,data) => setEmail(data.value)}
                ></Input>
            </Form.Field>
            <Form.Field>
                <Input
                        placeholder={currentuser.location}
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



// class EditProfile extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         isGoing: true,
//         numberOfGuests: 2
//       };
  
//       this.handleInputChange = this.handleInputChange.bind(this);
//     }
  
//     handleInputChange(event) {
//       const target = event.target;
//       const value = target.value;
//       const name = target.name;
  
//       this.setState({
//         [name]: value
//       });
//     }

//     handleSubmit(event) {
//         alert('A name was submitted: ' + this.state.value);
//         event.preventDefault();
//       }
  
//     render() {
        
//       return (
//         <form onSubmit={this.handleSubmit}>          
//           <label>
//             Username:
//             <input
//               name="username"
//               type="text"
//               value={this.state.username}
//               onChange={this.handleInputChange} />
//           </label>
//           <br />
//           <label>
//             Password:
//             <input
//               name="password"
//               type="text"
//               value={this.state.password}
//               onChange={this.handleInputChange} />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }
export default EditProfile;


