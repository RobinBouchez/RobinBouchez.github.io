import "./AuthImagePattern.css"; // Import the CSS file

const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="auth-image-container">
            <div className="auth-image-content">
                <div className="auth-image-grid">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`auth-image-grid-item ${
                                i % 2 === 0 ? "auth-image-grid-item-animated" : ""
                            }`}
                        />
                    ))}
                </div>
                <h2 className="auth-image-title">{title}</h2>
                <p className="auth-image-subtitle">{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthImagePattern;