import { useChatStore } from "../../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "./lib/utils";
import "./ChatContainer.css"; // Import the CSS file

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="chat-loading-container">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="chat-container">
            <ChatHeader />
            <div className="chat-messages-container">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat-message ${
                            message.senderId === authUser._id 
                                ? "chat-message-end" 
                                : "chat-message-start"
                        }`}
                        ref={messageEndRef}
                    >
                        <div className="chat-avatar">
                            <img
                                src={
                                    message.senderId === authUser._id
                                        ? authUser.profilePic || "/avatar.png"
                                        : selectedUser.profilePic || "/avatar.png"
                                }
                                alt="profile pic"
                            />
                        </div>
                        <div className="chat-message-content">
                            <div 
                                className={`chat-bubble ${
                                    message.senderId === authUser._id 
                                        ? "chat-bubble-sent" 
                                        : "chat-bubble-received"
                                }`}
                            >
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="chat-bubble-image"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                            <div className="chat-message-time">
                                {formatMessageTime(message.createdAt)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;