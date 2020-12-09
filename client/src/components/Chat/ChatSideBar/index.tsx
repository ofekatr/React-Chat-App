import React from "react";

import "./index.css";

export default function ChatSideBar(props) {
  const { room, users } = props;
  return (
    <div className="chat-sidebar">
      <h3>
        <i className="fas fa-comments"></i> Room Name:
      </h3>
      <h2 id="room-name">{room}</h2>
      <h3>
        <i className="fas fa-users"></i> Users
      </h3>
      <ul id="users">
        {users.map((user) => (
          <li key={user}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
