import React from 'react';
import { Socket } from 'react-socket-io';

const uri = 'http://localhost/test';
const options = { transports: ['websocket'] };

export default function Socket(props) {
    return (
        <Socket uri={uri} options={options}>
            {props.children}
        </Socket>
    )
}

