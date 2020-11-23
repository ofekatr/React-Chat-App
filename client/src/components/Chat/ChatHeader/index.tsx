import React from "react";

import "./index.css";

export default function ChatHeader() {
  return (
    <header className="chat-header">
      <h1>
        <i className="fas fa-smile"></i> ChatCord
      </h1>
      <a href="index.html" className="btn">
        Leave Room
      </a>
    </header>
  );
}
