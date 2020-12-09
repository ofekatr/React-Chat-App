import React, { useRef, useEffect, useState } from "react";
import qs from "query-string";
import io from "socket.io-client";

import ChatSideBar from "./ChatSideBar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import "./Chat.css";

const ENDPOINT = "http://localhost:8080/";

let socket;

export default function Chat({ location }) {
  const params = useRef(qs.parse(location.search));
  const { room, username } = params.current;

  const [messages, setMessages]: any = useState([]);
  const [users, setUsers]: any = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [users]);

  function sendMessage(message, setMessage) {
    message &&
      message !== "" &&
      socket.emit("sendMessage", message, () => setMessage({ message: "" }));
  }

  return (
    <div className="chat-container">
      <ChatHeader />
      <main className="chat-main">
        <ChatSideBar {...{ room, users }} />
        <ChatMessages {...{ messages }} />
      </main>
      <ChatInput {...{ sendMessage }} />
    </div>
  );
}
