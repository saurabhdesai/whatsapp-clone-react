import React from "react";
import "../css/chat.css";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useState } from "react";
import axios from "../axios";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
function Chat(props) {
  const [input, setinput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    axios.post("/messages/new", {
      message: input,
      name: "demo",
      timestamp: "String1",
      received: true,
    });
    setinput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h2>Room name</h2>
          <p>Last seen...</p>
        </div>
        <div className="chat_headerIcons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {props.messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_receiver"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <label for=""></label>
          <input
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
            type="text"
            class="form-control"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
