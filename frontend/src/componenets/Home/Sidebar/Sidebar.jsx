// Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import Conversations from "../Conversation/Conversations";
import useLogout from "../../../hooks/useLogout.js"
import useGetConversations from "../../../hooks/useGetConversations.js";
function Sidebar() {
  const {logout} = useLogout();
  const {conversations} = useGetConversations();
  console.log(conversations);
  return (
    <div className="sidebar">
      <h2>Users</h2>
      <div className="User-box">
      <ul>
        {
          conversations.map((conversation) => {
            return(
            <li>
            <Conversations
            key={conversation._id}
            conversation={conversation}
             />
            </li>
            )
        })
        }
      </ul>
      </div>
      <div className="logout-container">
      <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
