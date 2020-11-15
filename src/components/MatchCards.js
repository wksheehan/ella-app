import React, {useState, useEffect} from 'react';
import { Card, Button, Container, Image } from 'semantic-ui-react'

export const MatchCards = ( {matches, clothes, onDeleteMatch} ) => {

    const [clothingPairs, setClothingPairs] = useState([]);

    function getClothingInfo(id){
      for(var i = 0; i < clothes.length; i++)
      {
        if(clothes[i].id == id)
        {
          return clothes[i];
        }
      }
      return null;
    }

    const loadClothingPairs = async () => {
      var loadedPairs = matches.map(match => {
        const item1 = getClothingInfo(match.clothing_id1);
        const item2 = getClothingInfo(match.clothing_id2);
        if(item1 && item2){
          return {
            cid1: item1.id,
            name1: item1.name,
            color1: item1.color,
            occasion1: item1.occasion,
            type1: item1.type,

            cid2: item2.id,
            name2: item2.name,
            color2: item2.color,
            occasion2: item2.occasion,
            type2: item2.type,
          }
        }
        return null;
      }).filter(element => {return element != null});
      setClothingPairs(loadedPairs);
    }

    useEffect(() => {loadClothingPairs()}, [clothes, matches]);

    return (
          <Card.Group itemsPerRow={6}>
          {clothingPairs.map(pair => {
            return (
                  <Card key={pair.cid1}>
                      <Card.Content>
                          <Image src={process.env.PUBLIC_URL + 'ella.jpeg'}></Image>
                          <Card.Header> {pair.name1} - {pair.name2} </Card.Header>
                          <Card.Description> {pair.type1} - {pair.type2} </Card.Description>
                      </Card.Content>
                  </Card>
            );
          })}
      </Card.Group>
      )

}
