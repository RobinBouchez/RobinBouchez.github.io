import { useChatStore } from "../../store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";
import "./ChatContainer.css"; // Import the CSS file
const randomInt = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min + 1)) + min;

const ChatContainer = () => {
    const reserveSenderPic = `https://avatar.iran.liara.run/public/${randomInt(1, 70)}`
    const reserveRecieverPic = `https://avatar.iran.liara.run/public/${randomInt(1, 70)}`
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

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
                    >
                        <div className="chat-avatar">
                            <img
                                src={
                                    message.senderId === authUser._id
                                        ? authUser.profilePic || reserveRecieverPic
                                        : selectedUser.profilePic || reserveSenderPic
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