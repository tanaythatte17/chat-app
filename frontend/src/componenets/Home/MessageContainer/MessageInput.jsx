// MessageInput.jsx
import React, { useState } from "react";
import "./MessageInput.css";
import useSendMessage from "../../../hooks/useSendMessage";
function MessageInput() {
  const [message, setMessage] = useState("");
  const {sendMessage} = useSendMessage();
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default MessageInput;
