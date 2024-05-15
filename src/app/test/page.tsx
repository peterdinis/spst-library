"use client"

import { NextPage } from "next";
import { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:4000', {
    transports: ["websockets"]
});  // Make sure this URL matches the server

const TestPage: NextPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit('message', newMessage);
        setNewMessage('');
    };

    return (
        <div>
            <div className="chat">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div className="input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default TestPage;