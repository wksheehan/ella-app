import React from 'react';
import { Card, Button, Container, Image } from 'semantic-ui-react'

export const MatchCards = ( {matches} ) => {
    return (
        <Card.Group itemsPerRow={6}>
        {matches.map(match => {
            return (
                <Card key={match.clothing_id1}>
                    <Card.Content>
                        <Image src={process.env.PUBLIC_URL + 'ella.jpeg'}></Image>
                        <Card.Header> {match.clothing_id1} - {match.clothing_id2} </Card.Header>
                    </Card.Content>
                </Card>
            );
        })}
    </Card.Group>
    )
}
