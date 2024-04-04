import React from "react";
import "./Conversation.css";
import useConversation from "../../../zustand/useConversation";
import { useSocketContext } from "../../../Context/SocketContext";

function Conversations({ conversation }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Check if the current conversation is the selected conversation
  const isSelected =
    selectedConversation && selectedConversation._id === conversation._id;

  // Define the class name based on whether the conversation is selected or not
  const className = isSelected ? "Conversations selected" : "Conversations";

  const { onlineUsers } = useSocketContext();

  // Check if the conversation user is online
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <div className={className} onClick={() => setSelectedConversation(conversation)}>
      <div className="name">
        {conversation.fullName}{" "}
        {isOnline && <span className="online-dot"></span>}
      </div>
    </div>
  );
}

export default Conversations;

