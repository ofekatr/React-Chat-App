import React from "react";

import "./index.css";

export default function ChatSideBar({ room }) {
  return (
    <div className="chat-sidebar">
      <h3>
        <i className="fas fa-comments"></i> Room Name:
      </h3>
      <h2 id="room-name">{room}</h2>
      <h3>
        <i className="fas fa-users"></i> Users
      </h3>
      <ul id="users"></ul>
    </div>
  );
}
