import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Header, Button, Dropdown } from 'semantic-ui-react';
import { MatchCards } from '../components/MatchCards'

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

function AddMatch({clothes, onNewMatch}) {
    const classes = useStyles();
    const [clothing_id1, setId1] = useState("");
    const [clothing_id2, setId2] = useState("");
    const [error, setError] = useState("");
    const clothingOptions = clothes.map(clothing =>
      {
        return(
          {
            "key" : clothing.id,
            "value" : clothing.id,
            "text" : clothing.name
          })
        });

    return (
        <main className={classes.fullWidth}>
            <div className={classes.toolbar} />
            <div className={classes.content}>
                <h2> Make matches below </h2>
                <Form>
                <Form.Field>
                  <Dropdown
                    placeholder='Item #1'
                    fluid
                    search
                    selection
                    onChange={(e,data) => setId1(data.value)}
                    options={clothingOptions}
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown
                    placeholder='Item #2'
                    fluid
                    search
                    selection
                    onChange={(e,data) => setId2(data.value)}
                    options={clothingOptions}
                  />
                </Form.Field>

                <Button
                  primary
                  onClick=
                  {
                    async() => {
                      const match = {clothing_id1, clothing_id2};
                      const response = await fetch("/matches", {
                        method: 'POST',
                        headers: {
                          'Content-type': 'application/json'
                        },
                        body: JSON.stringify(match)
                      });
                      if (response.ok) {
                        console.log('success');
                        onNewMatch(match);
                        // setId1("");
                        // setId2("");
                    }
                    else {
                        setError("Invalid match, please try again!");
                    }
                  }
                }> Make Match
                </Button>
            { {error} && <Header as='h4' color='red'> {error} </Header> }
            </Form>
        </div>
    </main>
    );
}

export default AddMatch;
