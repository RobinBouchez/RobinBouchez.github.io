import { X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import "./ChatHeader.css"; 

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="chat-header">
            <div className="chat-header-content">
                <div className="chat-header-user-info">
                    {/* Avatar */}
                    <div className="chat-header-avatar">
                        <img 
                            src={selectedUser.profilePic || "/avatar.png"} 
                            alt={selectedUser.firstName} 
                        />
                    </div>
                    {/* User info */}
                    <div className="chat-header-user-details">
                        <h3 className="chat-header-user-name">
                            {selectedUser.firstName} {selectedUser.lastName}
                        </h3>
                        <p className="chat-header-user-status">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                {/* Close button */}
                <button 
                    onClick={() => setSelectedUser(null)}
                    className="chat-header-close-button"
                >
                    <X />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;