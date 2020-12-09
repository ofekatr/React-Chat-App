import React from "react";

import { useForm } from "../../../utils/hooks";
import "./ChatInput.css";

const initInputs = Object.freeze({
  message: "",
});

export default function ChatInput(props) {
  const { sendMessage } = props;
  
  const { onChange, onSubmit, inputs, setInputs } = useForm(() => true, {
    ...initInputs,
  });

  const submitMessage = (e) => {
    onSubmit(e);
    sendMessage(inputs.message, setInputs);
  };

  return (
    <div className="chat-form-container">
      <form id="chat-form" onSubmit={submitMessage}>
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
  );
}
