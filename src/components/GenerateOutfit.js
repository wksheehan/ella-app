import React, {useState, useEffect} from 'react';
import { Card, Button, Container, Image } from 'semantic-ui-react'

export const GenerateOutfit = ( {outfit} ) => {

    const [top, getTop] = useState([]);
    const [bottom, getBottom] = useState([]);
    const [shoes, getShoes] = useState([]);

    const fetchTop = async () => {
        const response = await fetch("/clothing/" + outfit.top_id);
        const top = await response.json();
        console.log("top= ", top);
        console.log("response = ", response);
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
            { outfit.name &&
                <Card.Group centered stackable>
                        <Card>
                            <Card.Content>
                                <Image src={process.env.PUBLIC_URL + 'ella.jpeg'}></Image>
                                <Card.Header> {top.name} </Card.Header>
                                <Card.Description> {top.type} </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {top.occasion}
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Image src={process.env.PUBLIC_URL + 'ella.jpeg'}></Image>
                                <Card.Header> {bottom.name} </Card.Header>
                                <Card.Description> {bottom.type} </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {bottom.occasion}
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Image src={process.env.PUBLIC_URL + 'ella.jpeg'}></Image>
                                <Card.Header> {shoes.name} </Card.Header>
                                <Card.Description> {shoes.type} </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {shoes.occasion}
                            </Card.Content>
                        </Card>
                </Card.Group>
            }
        </div>
    );
}
