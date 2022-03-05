import React from "react";
import "../css/sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChats from "./SidebarChats";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="sidebar_header_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="side_search_container">
          <SearchOutlined />
          <input type="text " placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chat">
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
      </div>
    </div>
  );
}

export default Sidebar;
