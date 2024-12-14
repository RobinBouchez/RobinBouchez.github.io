import React, { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Toast, ToastContainer } from "react-bootstrap";
import "./login.css";

function LoginPage() {
    const [showToast, setShowToast] = useState(false); // Manage Toast visibility
    const [toastMessage, setToastMessage] = useState(""); // Manage Toast message

    const handleShowToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
    };

    return (
        <div className="wrapper">
            <Container fluid="true">
                <Row>
                    <Col className="no-padding">
                        <div className="loginFormWrapper">
                            {/* Pass handleShowToast to LoginForm */}
                            <LoginForm onLoginFail={handleShowToast} />
                        </div>
                    </Col>
                    <Col className="no-padding">
                        <div className="infoWrapper">
                            <h1>Welcome back! &#128512; </h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Beatae voluptates debitis nam deleniti maiores facilis vero magnam vitae
                                distinctio eius quae ducimus sequi veritatis, ea perspiciatis, sit non neque fugit.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Toast for error messages */}
            <ToastContainer position="top-center" className="p-3">
                <Toast
                    bg="danger"
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Login Error</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default LoginPage;
