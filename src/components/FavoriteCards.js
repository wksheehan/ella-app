import React, {useState, useEffect} from 'react';
import { Card, Button, Modal, Form, Segment, Header, Rating, Image } from 'semantic-ui-react'
import {GenerateOutfit} from '../components/GenerateOutfit';

export const FavoriteCards = ( {favorites, outfits} ) => {

    const [favoriteOutfits, getFavoriteOutfits] = useState([]);
    const [rating, setRating] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false)

    // get an outfit object using id from favorites
    function getOutfitFromFavorite(id) {
      for(var i = 0; i < outfits.length; i++) {
        if (outfits[i].id == id) return outfits[i];
      }
      return null;
    }

    const loadOutfitParts = async () => {
         var favOutfits = favorites.map(favorite => {
            const outfit = getOutfitFromFavorite(favorite.outfit_id);
            if (outfit) {
                return {
                    outfit: outfit,
                    favorite: favorite
                }
            }
            return null;
        }).filter(element => {return element != null});
        getFavoriteOutfits(favOutfits);
    }

    useEffect(() => { loadOutfitParts() }, [favorites, outfits])

    function handleChangeOnRate(e, {rating}, outfit) {
        e.preventDefault();
        setRating(rating);
        const outfit_id = outfit.favorite.outfit_id
        const name = outfit.favorite.name
        const description = outfit.favorite.description
        const updated_favorite = {outfit_id, name, description, rating};
        const response = fetch("/favorite", {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updated_favorite)
        });
    }

    return (
        <div>
            <Segment padded><Header as='h1'> Your Favorite Outfits: </Header></Segment>
            {favoriteOutfits.map((outfit, index) => {
                return (
                    <div>
                        <Header as='h2'> {outfit.favorite.name} </Header>
                        <Rating
                            icon='star'
                            size='huge'
                            defaultRating={outfit.favorite.rating}
                            maxRating={5}
                            value={rating}
                            onRate={(e, {rating}) => handleChangeOnRate(e, {rating}, outfit)}>
                        </Rating>
                        <Modal
                          onClose={() => setOpen(false)}
                          onOpen={() => setOpen(true)}
                          open={open}
                          trigger={<Button>Edit this outfit</Button>}
                        >
                          <Modal.Header>Edit this outfit</Modal.Header>
                          <Modal.Content>
                              <Form>
                                  <Form.Input
                                          placeholder={outfit.favorite.name}
                                          value={name}
                                          onChange={(e,{name,value}) => setName(value)}>
                                  </Form.Input>
                                  <Form.Input
                                          placeholder={outfit.favorite.description}
                                          value={description}
                                          onChange={(e,{name, value}) => setDescription(value)}>
                                  </Form.Input>
                                  <Form.Button type="button" onClick={() => {
                                          const outfit_id = outfit.favorite.outfit_id
                                          const rating = outfit.favorite.rating
                                          const updated_favorite = {outfit_id, name, description, rating}
                                          console.log(updated_favorite)
                                          const response = fetch("/favorite", {
                                              method: 'PUT',
                                              headers: {
                                                  'Content-type': 'application/json'
                                              },
                                              body: JSON.stringify(updated_favorite)
                                          });
                                          setOpen(false);
                                      }}>
                                      Update
                                  </Form.Button>
                                  </Form>
                          </Modal.Content>
                        </Modal>
                        <Segment secondary> {outfit.favorite.description} </Segment>
                        <GenerateOutfit outfit={outfit.outfit} />
                        <Header></Header>
                    </div>
                );
            })}
        </div>
    )
}
