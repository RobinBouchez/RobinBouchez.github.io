import React from "react";
import RegisterForm from "../components/LoginForm/RegisterForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './login.css'
import TitleLogo from "../components/TitleLogo/TitleLogo";

function RegisterPage() {
    return (
        <div className="wrapper">
            <Container fluid="true">
                <Row>
                    <Col className="no-padding">
                        <div className="loginFormWrapper">
                            <RegisterForm />
                        </div>
                    </Col>
                    <Col className="no-padding">
                        <div className="infoWrapper">
                            <TitleLogo />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptates debitis nam deleniti maiores facilis vero magnam vitae distinctio eius quae ducimus sequi veritatis, ea perspiciatis, sit non neque fugit.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}


export default RegisterPage;