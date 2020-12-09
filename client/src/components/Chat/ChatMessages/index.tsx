import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ReactEmoji from "react-emoji";
import "./ChatMessages.css";
export default function ChatMessages(props) {
  const { messages } = props;
  return (
    <ScrollToBottom className="chat-messages">
      {messages.map(({ user, text }, i) => (
        <div key={i} className="message">
          <p className="meta">{user}</p>
          <p className="text">{ReactEmoji.emojify(text)}</p>`
        </div>
      ))}
    </ScrollToBottom>
  );
}

/*
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${username} <span>${time}</span></p>
    <p class="text">
        ${text}
    </p>`;
*/
