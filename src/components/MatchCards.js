import React from 'react';
import { Card, Button, Container, Image } from 'semantic-ui-react'

export const MatchCards = ( {matches, clothes, onDeleteMatch} ) => {
  
    return (
        <Card.Group itemsPerRow={6}>
        {matches.map(match => {

          // const [clothing1, getClothes1] = useState([]);
          // const [clothing2, getClothes2] = useState([]);
          // console.log("HELLO!!!");
          // console.log(fetch("/clothing/" + match.clothing_id1));

          // useEffect(() => {
          //     fetch("/clothing/" + match.clothing_id1).then(response =>
          //         response.json().then(data => {
          //             getClothes(data);
          //     })
          // );
          // }, []);
          //
          // useEffect(() => {
          //     fetch("/clothing/" + ).then(response =>
          //         response.json().then(data => {
          //             getClothes(data);
          //     })
          // );
          // }, []);

            return (
                <Card key={match.clothing_id1}>
                    <Card.Content>
                        <Image src={process.env.PUBLIC_URL + 'ella.jpeg'}></Image>
                        <Card.Header> {match.clothing_id1} - {match.clothing_id2} </Card.Header>
                        <Card.Description> {match.clothing_id2} </Card.Description>
                    </Card.Content>
                </Card>
            );
        })}
    </Card.Group>
    )
}
