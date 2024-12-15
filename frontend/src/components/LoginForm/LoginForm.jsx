import React, { useContext, useState, useEffect } from "react";
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
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const { user, setUser } = useContext(UserContext);
  const [accessToken, setAccesstoken] = useState( { access_token: '' } );
  const { login, isLoggingIn } = useAuthStore();
const googleLogin = useGoogleLogin({
  onSuccess: (codeResponse) => {
    setUser(codeResponse);
    setAccesstoken(codeResponse);
  },
  onError: (error) => console.log('Login Failed:', error)
});

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

useEffect(() => {
  const fetchUserData = async () => {
    if (user) {
      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          },
          withCredentials: false
        });
        const googleuser = res.data;
        const response = await axios.post("/auth/loginGoogle", { _id: googleuser.id, firstName: googleuser.given_name, lastName: googleuser.family_name, email: googleuser.email, profilePic: googleuser.picture, access_token: accessToken.access_token });
        setUser(response.data.user);
        login(response.data.user);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    }
  };
  fetchUserData();
}, [user]);

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
          <button type="button" onClick={() => googleLogin()}>
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
