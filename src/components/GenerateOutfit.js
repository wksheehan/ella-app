import React from 'react';
import { Card, Button, Container, Image } from 'semantic-ui-react'

export const GenerateOutfit = ( {outfit} ) => {
    return (
        <Card.Group>
        <Card key={outfit.name}>
            <Card.Content>
                <Image src={process.env.PUBLIC_URL + 'ella.jpeg'}></Image>
                <Card.Header> {outfit.name} </Card.Header>
                <Card.Description> top = {outfit.top_id}, bottom = {outfit.bottom_id} </Card.Description>
            </Card.Content>
        </Card>
        </Card.Group>
    );
}
