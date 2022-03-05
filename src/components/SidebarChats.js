import { Avatar } from "@mui/material";
import React from "react";
import "../css/sidebar_chats.css";
function SidebarChats() {
  return (
    <div className="sidebar_chats1">
      <Avatar />
      <div className="sidebar_chat_info">
        <h2>Room name</h2>
        <p>This is last message</p>
      </div>
    </div>
  );
}

export default SidebarChats;
