import React, {useState, useEffect} from 'react';
import { Card, Button, Container, Image } from 'semantic-ui-react'

export const GenerateOutfit = ( {outfit} ) => {

    const [top, getTop] = useState([]);
    const [bottom, getBottom] = useState([]);
    const [shoes, getShoes] = useState([]);

    const fetchTop = async () => {
        const response = await fetch("/clothing/" + outfit.top_id);
        const top = await response.json();
        getTop(top);
    }

    const fetchBottom = async () => {
        const response = await fetch("/clothing/" + outfit.bottom_id);
        const bottom = await response.json();
        getBottom(bottom);
    }

    const fetchShoes = async () => {
        const response = await fetch("/clothing/" + outfit.shoes_id);
        const shoes = await response.json();
        getShoes(shoes);
    }

    useEffect(() => { fetchTop(); }, [outfit]);
    useEffect(() => { fetchBottom(); }, [outfit]);
    useEffect(() => { fetchShoes(); }, [outfit]);


    return (
        <div>
            { outfit.id &&
                <Card.Group centered stackable>
                    {[top, bottom, shoes].map(clothing => {
                        if(clothing.type == 'Top') var pic = 'top.png'
                        else if(clothing.type == 'Bottom') var pic = 'bottom.png'
                        else var pic = 'shoes.png'
                        return (
                            <Card key={clothing.id}>
                                <Card.Content>
                                    <Image src={process.env.PUBLIC_URL + pic}></Image>
                                    <Card.Header> {clothing.name} </Card.Header>
                                    <Card.Description> {clothing.type} </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {clothing.occasion}
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            }
        </div>
    );
}
