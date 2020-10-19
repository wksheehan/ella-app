import React, {useState} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [location, setLocation] = useState("");

    return (
        <Form>
            <Form.Field>
                <Input
                    placeholder = "username:"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Input
                    placeholder = "password:"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Input
                    placeholder = "first name:"
                    value={first_name}
                    onChange={e => setFirstName(e.target.value)}
                />
                <Input
                    placeholder = "last name:"
                    value={last_name}
                    onChange={e => setLastName(e.target.value)}
                />
                <Input
                    placeholder = "location:"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button onClick={async() => {
                        const user = {username, password, first_name, last_name, location};
                        const response = await fetch("/user", {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        });
                        if (response.ok) {
                            console.log('success');
                        }
                }}> Submit </Button>
            </Form.Field>
        </Form>
    )
}
