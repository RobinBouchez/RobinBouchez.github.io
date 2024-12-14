import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useAuthStore } from "../../store/useAuthStore";

function LoginForm({ onLoginFail }) {
  // Accept onLoginFail as a prop
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const { login, isLoggingIn } = useAuthStore();
  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  // });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/auth/login", { email, password });
      if (response.data.error) {
        console.error(response.data.error);
        onLoginFail(response.data.error); // Trigger Toast with error message
      } else {
        console.log("Login successful");
        console.log(response.data.user);
        const user = response.data.user;
        setData({ email: user.email, password: user.password });
        setUser(user);
        login(user);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed", error);
      onLoginFail("Network error or invalid credentials."); // Default error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="loginform">
      <form action="" onSubmit={loginUser}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={data.email}
            required
            onChange={handleChange}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">Login</button>
        <div className="google-login">
          <button type="button" onClick={() => login()}>
            <FaGoogle className="icon googleicon" />
            Login with Google
          </button>
        </div>
        <div className="register-link">
          <p>
            Don't have an account? <a href="../register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
