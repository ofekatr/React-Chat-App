import React, { useRef, useEffect } from "react";
import qs from "query-string";
import io from "socket.io-client";

import "./index.css";
import { useForm } from "../../utils/hooks";
import ChatSideBar from "./ChatSideBar";
import ChatHeader from "./ChatHeader";

const ENDPOINT = "http://localhost:8080";

const initInputs = Object.freeze({
  message: "",
});

let socket;

export default function Chat({ location }) {
  const params = useRef(qs.parse(location.search));
  const { room, username } = params.current;

  useEffect(() => {
    console.log("Here");
    socket = io(ENDPOINT);
  }, [ENDPOINT, location.search]);

  const { onChange, onSubmit, inputs } = useForm(
    () => console.log("Thank you come again.", inputs),
    { ...initInputs }
  );

  return (
    <div className="chat-container">
      <ChatHeader />
      <main className="chat-main">
        <ChatSideBar room={room} />
        <div className="chat-messages"></div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={onSubmit}>
          <input
            id="msg"
            name="message"
            type="text"
            placeholder="Enter Message"
            value={inputs.message}
            required
            autoComplete="off"
            onChange={onChange}
          />
          <button className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
}
