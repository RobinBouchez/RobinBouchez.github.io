import { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { FiImage } from "react-icons/fi";
import { Send, X } from "lucide-react";
import toast from "react-hot-toast";
import "./MessageInput.css"; // Import the CSS file

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });
            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="message-input-container">
            {imagePreview && (
                <div className="image-preview-container">
                    <div className="image-preview-wrapper">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="image-preview"
                        />
                        <button
                            onClick={removeImage}
                            className="image-remove-button"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSendMessage} className="message-form">
                <div className="message-input-wrapper">
                    <input
                        type="text"
                        className="input input-bordered input-sm sm:input-md message-text-input"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="button"
                        className={`btn btn-circle  ${
                            imagePreview 
                                ? "image-upload-button-active" 
                                : "image-upload-button-inactive"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="image-upload-button">
                        <FiImage size={20} />
                      </div>
                        
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle send-message-button"
                    disabled={!text.trim() && !imagePreview}
                >
                  <div className="send-message-button">     
                    <Send size={22} />
                    </div>
                </button>
            </form>
        </div>
    );
};

export default MessageInput;