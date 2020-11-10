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


function MatchesContent({onNewUser}) {
  const classes = useStyles();
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Make matches below!
        </Typography>
        <Form>
              <Form.Field>
                  <Input
                      width={3}
                      placeholder="Clothing ID 1 "
                      value={id1}
                      onChange={(e,data) => setId1(data.value)}
                  ></Input>
              </Form.Field>
              <Form.Field>
                  <Input
                      type="id2"
                      placeholder="Clothing ID 2 "
                      value={id2}
                      onChange={(e,data) => setId2(data.value)}
                  ></Input>
              </Form.Field>

            <Button >
                Make Match
            </Button>
        </Form>
    </div>
    </main>
  );
}

export default MatchesContent;
