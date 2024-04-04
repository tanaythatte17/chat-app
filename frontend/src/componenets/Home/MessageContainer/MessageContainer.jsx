import React, { useEffect, useRef } from "react";
import "./MessageContainer.css";
import MessageInput from "./MessageInput";
import useConversation from "../../../zustand/useConversation";
import useGetMessages from "../../../hooks/useGetMessages";
import { useAuthContext } from "../../../Context/AuthContext.jsx";
import useListenMessages from "../../../hooks/useListenMessages.js";

function MessageContainer() {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const { authUser } = useAuthContext();

    // Create a ref for the last message element
    const lastMessageRef = useRef();

    // Scroll to the last message when messages change
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="message-container">
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <div
                        key={index}
                        ref={index === messages.length - 1 ? lastMessageRef : null} // Assign the ref to the last message element
                        className={message.senderId === authUser.id ? "outgoing-message" : "incoming-message"}
                    >
                        {message.message}
                    </div>
                ))
            ) : (
                <div className="no-messages">No messages</div>
            )}
            <MessageInput />
        </div>
    );
}

export default MessageContainer;
