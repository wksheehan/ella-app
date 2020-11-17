import React from 'react';
import { Card, Button, Container, Image } from 'semantic-ui-react'

export const ClothingCards = ( {clothes, onDeleteClothing} ) => {
    return (
        <Card.Group itemsPerRow={6}>
        {clothes.map(clothing => {
            if(clothing.type == 'Top') var pic = 'top.png'
            else if(clothing.type == 'Bottom') var pic = 'bottom.png'
            else var pic = 'shoes.png'
            return (
                <Card key={clothing.id} color={clothing.color}>
                    <Card.Content>
                        <Image src={process.env.PUBLIC_URL + pic }></Image>
                        <Card.Header> {clothing.name} </Card.Header>
                        <Card.Description> {clothing.type} </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {clothing.occasion}
                        <Button floated='right' basic color='red' onClick={async() => {
                          const response = await fetch("/clothing/" + clothing.id, {
                              method: 'DELETE',
                              headers: {
                                  'Content-type': 'application/json'
                              },
                              body: JSON.stringify(clothing)
                          });
                          if (response.ok) {
                              console.log('item deleted successfully');
                              onDeleteClothing(clothing);
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
