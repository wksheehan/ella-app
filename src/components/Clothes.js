import React from 'react';
import { Card } from 'semantic-ui-react'

export const Clothes = ( {clothes} ) => {
    return (
        <Card.Group itemsPerRow={6}>
        {clothes.map(clothing => {
            return (
                <Card key={clothing.id}
                    header={clothing.name}
                    color={clothing.color}
                    description={clothing.occasion}
                    extra={clothing.type}
                  />
              
            );
        })}
    </Card.Group>
    )
}
