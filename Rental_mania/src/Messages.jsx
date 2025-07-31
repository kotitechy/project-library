import React from 'react';
import './style.css';
import Sidebar from './sidebar';
import Header from './header';
import LandingPage from './LandingPage';

const users = [
  { name: 'Shiva Charan', lastMessage: 'Hey! Got your bill.', time: '2:30 PM', unread: 2 },
  { name: 'Raj Kumar', lastMessage: 'Can we reschedule?', time: '1:10 PM', unread: 0 },
  { name: 'Anita Rao', lastMessage: 'Thank you 🙏', time: 'Yesterday', unread: 0 },
  { name: 'Rahul Verma', lastMessage: 'Invoice received.', time: 'Mon', unread: 1 },
];

const MessageList = () => {
  return (
    <div className="message-list">
      <h2 className="section-title">Messages</h2>
      {users.map((user, index) => (
        <div className={`message-user ${user.unread > 0 ? 'unread' : ''}`} key={index}>
          <div className="avatar-circle">{user.name[0]}</div>
          <div className="message-info">
            <div className="message-header">
              <span className="user-name">{user.name}</span>
              <span className="message-time">{user.time}</span>
            </div>
            <div className="last-message">{user.lastMessage}</div>
            {user.unread > 0 && <span className="badge">{user.unread}</span>}
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
