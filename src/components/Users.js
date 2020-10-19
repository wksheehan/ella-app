import React from 'react';

export const Users = ( {users} ) => {
    return (
        <ul>
        {users.map(user => {
            return (
                <li value={user.id}>
                <p>
                    First name: {user.first_name},
                    Last name: {user.last_name},
                    Username: {user.username},
                    Location: {user.location},
                    User id: {user.id}
                </p>
                </li>
            );
        })}
        </ul>
    )
}
