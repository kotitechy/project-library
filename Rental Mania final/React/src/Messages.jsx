import './style.css';
import Header from './header';
import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';
import backend_url from './sec';



const MessageList = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
      axios.get(`${backend_url}/messages`)
        .then(response => {
          setMessages(response.data);  
          console.log('messages:', response.data);
        })
        .catch(err => console.error(err));
    }, []);
  
  return (
    <div className="message-list">
      <h2 className="section-title">Messages</h2>
      {messages.map((msg, index) => (
        <div className={`message-user ${msg.unread > 0 ? 'unread' : ''}`} key={index}>
          <div className="avatar-circle">{msg.name[0]}</div>
          <div className="message-info">
            <div className="message-header">
              <span className="user-name">{msg.name}</span>
              <span className="message-time">{msg.time}</span>
            </div>
            <div className="last-message">{msg.lastMessage}</div>
            {msg.unread > 0 && <span className="badge">{msg.unread}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};


const Messages = () => {
    return (
        <>
            <div className="App">
                <Header data='Messages' />
                <Sidebar />
            </div>

            <div className="main-content">
                <div className="properties-container">
                    <MessageList />
                    
                </div>
            </div>
        </>
    );
};

export default Messages;
