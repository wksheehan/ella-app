import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {GenerateOutfit} from '../components/GenerateOutfit';
import { Button, Rating, Form, Input, Header } from 'semantic-ui-react';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
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
  centered: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const LoggedInMessage = () => (
  <main>
    <Typography paragraph>
      Thank you for having created an account with us! As long as you have uploaded your clothing items
      in the Closet tab and told us some of your matching preferences in the Matches tab, you can generate an outfit
      with the button below!
    </Typography>
  </main>
)

const LoggedOutMessage = () => (
  <main>
    <Typography paragraph>
      If this is your first time to our website, thank you for coming! Please create a profile by clicking the
      Sign Up button above. Once you've signed up, all you have to do is upload some of your clothing items, tell
      us which of them go together, and then you can come back here and we'll generate outfit suggestions for you!
    </Typography>
    <Typography paragraph>
      If you already have a profile with us, thank you for coming back! You can access your Closet by clicking the
      Sign In button above.
    </Typography>
  </main>
)

function MainContent() {
  const classes = useStyles();
  const [currentuser, getCurrentUser] = useState([]);
  const [outfit, getOutfit] = useState([]);
  const [error, setError] = useState([]);
  const [rating, setRating] = useState(3);
  const [confirmation, setConfirmation] = useState([]);

  useEffect(() => {
      fetch("/currentuser").then(response =>
          response.json().then(data => {
              getCurrentUser(data);
      })
  );
  }, []);
  console.log(currentuser);

  const GenerateOutfitButton = () => (
    <main className={classes.content}>
      <GenerateOutfit outfit={outfit} />
      <Button secondary size="huge" onClick={async() => {
          fetch("/outfit").then(response =>
              response.json().then(data => {
                  getOutfit(data);
          }))
          }}>
        Generate Outfit!
      </Button>
    </main>
  )

  const FavoriteButton = () => (
      <Button primary onClick={async() => {
              setConfirmation("")
              setError("")
              const outfit_id = outfit.id
              const user_id = currentuser.id
              const description = "You can describe this outfit here"
              const new_favorite = {outfit_id, user_id, description, rating}
              const response = await fetch("/favorite", {
                  method: 'POST',
                  headers: {
                      'Content-type': 'application/json'
                  },
                  body: JSON.stringify(new_favorite)
              });
              if (response.ok) {
                  console.log('FAVORITE BUTTON POST CALL SUCCESS')
                  setConfirmation("Item favorited!")
              }
              else {
                  setError("You've already favorited this outfit!")
              }
      }}> Favorite </Button>
  )

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
      <div className={classes.content}>
        <Typography paragraph>
          Welcome to Ella App, Your Closet Simplified.
        </Typography>
        { currentuser.id && <LoggedInMessage />}
        { currentuser.id && <GenerateOutfitButton /> }
        { outfit.id && <Form.Field>
                            <Rating
                                icon='star'
                                defaultRating={3}
                                maxRating={5}
                                value={rating}
                                onRate={(e, {rating}) => setRating(rating)}
                                size='huge'
                            />
                        </Form.Field>
        }
        { outfit.id && <FavoriteButton /> }
        { !currentuser.id && <LoggedOutMessage />}
        { {error} && <Header as='h4' color='red'> {error} </Header> }
        { {confirmation} && <Header as='h4' color='green'> {confirmation} </Header> }
      </div>
    </main>
  );
}

export default MainContent;
