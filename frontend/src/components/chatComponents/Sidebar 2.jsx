import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import "./sidebar.css"; 

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-header-content">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                <div className="online-filter">
                    <label className="online-filter-label">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                </div>
            </div>
            <div className="user-list">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`user-item ${selectedUser?._id === user._id ? 'selected' : ''}`}
                    >
                        <div className="user-avatar">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="online-indicator" />
                            )}
                        </div>
                        <div className="user-info">
                            <div className="user-name">{user.fullName}</div>
                            <div className="user-status">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}
                {filteredUsers.length === 0 && (
                    <div className="no-users">No online users</div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;