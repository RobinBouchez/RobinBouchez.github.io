import React, { useState } from "react";
import './LoginForm.css'
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/register', formData);
            console.log(response.data);
            navigate('/login');
            
        } catch (error) {
            console.error('Registration failed', error);
            // Handle registration error
        }
    };

    return (
        <div className="loginform">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="Firstname" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Lastname" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <MdEmail className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                    <FaLock className="icon" />
                </div>

                <button type="submit">Register</button>

                <div className="register-link">
                    <p>Already part of the family? <a href="../login">Login</a></p>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;