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
            match: match,
            item1: item1,
            item2: item2,
          }
        }
        return null;
      }).filter(element => {return element != null});
      setClothingPairs(loadedPairs);
    }

    useEffect(() => {loadClothingPairs()}, [matches, clothes]);

    return (
          <Card.Group itemsPerRow={3}>
          {clothingPairs.map(pair => {
            return (
                  <Card key={pair.cid1}>
                      <Card.Content>
                      <div>
                          <Image src={process.env.PUBLIC_URL + 'ella.jpeg'} floated='left'></Image>
                          <Image src={process.env.PUBLIC_URL + 'ella.jpeg'} floated='right'></Image>
                      </div>
                          <Card.Header> {pair.item1.name} - {pair.item2.name} </Card.Header>
                          <Card.Description> {pair.item1.type} - {pair.item2.type} </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                          {pair.item1.occasion}
                          <Button
                            floated='right'
                            basic
                            color='red'
                            onClick = {
                              async() => {
                                const url = "/matches/" + pair.match.clothing_id1 + "/" + pair.match.clothing_id2;
                                const response = await fetch(url, {
                                  method: 'DELETE',
                                  headers: {
                                    'Content-type': 'application/json'
                                  },
                                  body: JSON.stringify(pair.match)
                                });
                                if (response.ok) {
                                  console.log('Match deleted successfully.');
                                  onDeleteMatch(pair.match);
                                }
                              }}>
                          Delete </Button>
                      </Card.Content>
                  </Card>
            );
          })}
      </Card.Group>
      )

}
