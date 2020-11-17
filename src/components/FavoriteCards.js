import React, {useState, useEffect} from 'react';
import { Card, Button, Header, Rating, Image } from 'semantic-ui-react'
import {GenerateOutfit} from '../components/GenerateOutfit';

export const FavoriteCards = ( {favorites, outfits} ) => {

    const [favoriteOutfits, getFavoriteOutfits] = useState([]);

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


    return (
        <div>
            <Header as='h1'> Your Favorite Outfits: </Header>
            {favoriteOutfits.map((outfit, index) => {
                return (
                    <div>
                        <Rating icon='star' size='huge' maxRating={5} defaultRating={outfit.favorite.rating}></Rating>
                        <GenerateOutfit outfit={outfit.outfit} />
                        <Header></Header>
                    </div>
                );
            })}
        </div>
    )
}
