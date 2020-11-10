import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Header, Button, Dropdown } from 'semantic-ui-react';
import { Clothes } from '../components/Clothes';

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
const colorOptions = [
  {
    key: 'Blue',
    text: 'Blue',
    value: 'blue',
    label: {color: 'blue', empty: true, circular: true}
  },
  {
    key: 'Red',
    text: 'Red',
    value: 'red',
    label: {color: 'red', empty: true, circular: true}
  },
  {
    key: 'Yellow',
    text: 'Yellow',
    value: 'yellow',
    label: {color: 'yellow', empty: true, circular: true}
  },
  {
    key: 'Green',
    text: 'Green',
    value: 'green',
    label: {color: 'green', empty: true, circular: true}
  },
  {
    key: 'Orange',
    text: 'Orange',
    value: 'orange',
    label: {color: 'orange', empty: true, circular: true}
  },
  {
    key: 'Black',
    text: 'Black',
    value: 'black',
    label: {color: 'black', empty: true, circular: true}
  },
  {
    key: 'White',
    text: 'White',
    value: 'white',
    label: {color: 'white', empty: true, circular: true}
  },
  {
    key: 'Grey',
    text: 'Grey',
    value: 'grey',
    label: {color: 'grey', empty: true, circular: true}
  },
];
const occasionOptions = [
  {
    key: 'Athletic',
    text: 'Athletic',
    value: 'Athletic',
  },
  {
    key: 'Casual',
    text: 'Casual',
    value: 'Casual',
  },
  {
    key: 'Formal',
    text: 'Formal',
    value: 'Formal',
  },
  {
    key: 'Cold',
    text: 'Cold',
    value: 'Cold',
  },
  {
    key: 'Cozy',
    text: 'Cozy',
    value: 'Cozy',
  },
  {
    key: 'Stylish',
    text: 'Stylish',
    value: 'Stylish',
  },
];
const typeOptions = [
  {
    key: 'Top',
    text: 'Top',
    value: 'Top',
  },
  {
    key: 'Bottom',
    text: 'Bottom',
    value: 'Bottom',
  },
  {
    key: 'Shoes',
    text: 'Shoes',
    value: 'Shoes',
  }
];

function AddClothing({onNewClothing}) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [occasion, setOccasion] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");

    return (
        <main className={classes.fullWidth}>
            <div className={classes.toolbar} />
            <div className={classes.content}>
                <h2> Add something to your closet: </h2>
                <Form>
                    <Form.Field>
                        <Input
                            placeholder="Name this clothing"
                            value={name}
                            onChange={(e,data) => setName(data.value)}
                        ></Input>
                    </Form.Field>
                    <Form.Field>
                        <Dropdown
                            placeholder='Select Color'
                            fluid
                            selection
                            options={colorOptions}
                            onChange={(e,data) => setColor(data.value)}
                            value={color}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Dropdown
                            placeholder='Select Occassion'
                            fluid
                            selection
                            options={occasionOptions}
                            onChange={(e,data) => setOccasion(data.value)}
                            value={occasion}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Dropdown
                            placeholder='Select Type'
                            fluid
                            selection
                            options={typeOptions}
                            onChange={(e, data) => setType(data.value)}
                            value={type}
                        />
                    </Form.Field>
                    <Button primary onClick={async() => {
                        const clothing = {name, color, occasion, type};
                        const response = await fetch("/clothing", {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(clothing)
                        });
                        if (response.ok) {
                            console.log('success');
                            onNewClothing(clothing);
                            setName("");
                            setColor("");
                            setOccasion("");
                            setType("");
                        }
                        else {
                            setError("Invalid clothing, please try again!");
                        }
                }}> Submit </Button>
            { {error} && <Header as='h4' color='red'> {error} </Header> }
            </Form>
        </div>
    </main>
    );
}

export default AddClothing;
