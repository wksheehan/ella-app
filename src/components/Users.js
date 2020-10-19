import React from 'react';

export const Users = ( {users} ) => {
    return (
        <ul>
        {users.map(user => {
            return (
                <li key={user.id}>
                <p>
                    First name: {user.first_name},
                    Last name: {user.last_name},
                    Username: {user.username},
                    Location: {user.location},
                    Password: {user.password},
                    User id: {user.id}
                </p>
                </li>
            );
        })}
        </ul>
    )
}
