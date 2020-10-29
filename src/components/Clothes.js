import React from 'react';

export const Clothes = ( {clothes} ) => {
    return (
        <ul>
        {clothes.map(clothing => {
            return (
                <li key={clothing.id}>
                <p>
                    Name: {clothing.name},
                    Color: {clothing.color},
                    Occsaion: {clothing.occasion}
                    Type: {clothing.type}
                </p>
                </li>
            );
        })}
        </ul>
    )
}
