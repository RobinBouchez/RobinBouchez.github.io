import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/chatComponents/Sidebar";
import NoChatSelected from "../components/chatComponents/NoChatSelected";
import ChatContainer from "../components/chatComponents/ChatContainer";
import "./chat.css";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="chat-page">
      <div className="chat-page-container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="chat-page-content">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
