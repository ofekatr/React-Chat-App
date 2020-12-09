import React, { useRef } from "react";

import "./index.css";
import { getRooms } from "../../context/rooms";
import { useForm } from "../../utils/hooks";


export default function Join(props) {
  const initState = useRef(
    Object.freeze({
      username: "",
      room: "Witcher",
    })
  );
  const rooms = useRef(getRooms());

  const { onChange, onSubmit, inputs } = useForm(() => joinChat(), {
    ...initState.current,
  });

  function joinChat() {
    props.history.push(`/chat?username=${inputs.username}&room=${inputs.room}`);
  }

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> Chat Room
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={inputs.username}
              name="username"
              onChange={onChange}
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select
              name="room"
              onChange={onChange}
              value={inputs.room}
              id="room"
            >
              {rooms.current.map((roomName) => (
                <option key={roomName} value={roomName}>
                  {roomName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
}
