import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.js";
import { isNotEmpty, validateEmail } from "../../utils/constant.js";
import { message } from "antd";
import ReCAPTCHA from "react-google-recaptcha"; 
import { API_URL } from "../../store/apiurl.js";
import "./login.css"; 

const URL = `${API_URL}/api/v1/auth/login`;
const SITE_KEY = "6LdB3kEqAAAAANQk3KmTlIof1wfuxp0aVh__tYcL"; 

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading2, setIsLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const { storeTokenInLS, setRole, setUserId, setUserData } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });

    if (name === "email")
      setErrors({
        ...errors,
        [name]: validateEmail(e.target.value) ? "" : "Incorrect email format",
      });
    else if (name === "password")
      setErrors({
        ...errors,
        [name]: isNotEmpty(e.target.value) ? "" : "Password is required",
      });
  };

  const handleCaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      message.error("Please complete the CAPTCHA");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, recaptcha: recaptchaValue }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        storeTokenInLS(data.token);
        setUserData(data.user);
        setRole(JSON.stringify(data.role));
        setUserId(JSON.stringify(data.user._id));

        setUser({ email: "", password: "" });
        setIsLoading(false);

        switch (data.role) {
          case "admin":
            navigate("/admin");
            break;
          case "alumni":
            navigate("/dashboard");
            break;
          case "student":
            navigate("/student");
            break;
          default:
            break;
        }
      } else {
        message.error("Invalid Credentials");
        setIsLoading(false);
      }
    } catch (error) {
      message.error("Something went wrong :(");
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-image">
          <img
            src="https://img.freepik.com/premium-vector/digital-illustration-man-demonstrating-online-authentication-large-tablet-display_941526-5791.jpg"
            alt="Login Illustration"
          />
        </div>
        <div className="login-form-container">
          <h1 className="login-heading">Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                disabled={isLoading2}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                disabled={isLoading2}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="recaptcha-container">
              <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />
            </div>
            <button
              type="submit"
              className="login-btn"
              disabled={isLoading2 || !recaptchaValue}
            >
              {isLoading2 ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
