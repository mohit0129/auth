import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from './apiConfig';
import { Link } from "react-router-dom";
import './Login.css'; // Importing CSS for styling

function Login() {
    const [mydata, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!mydata.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(mydata.email)) newErrors.email = "Email format is invalid";
        if (!mydata.password) newErrors.password = "Password is required";
        else if (mydata.password.length < 6) newErrors.password = "Password should be at least 6 characters";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChange = (event) => {
        setData((prevData) => ({
            ...prevData, [event.target.name]: event.target.value
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: '' })); // Clear errors when typing
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitValue = (event) => {
        event.preventDefault();

        if (!validate()) return; // If validation fails, stop form submission

        const data = {
            email: mydata.email,
            password: mydata.password
        };

        // Send the data as JSON
        axios.post(`${API_BASE_URL}/login`, data)
        .then((response) => {
            console.log(response);
            if (response.data.flag === "1") {
                alert("Successfully logged in");
                const name = response.data.name;
                const id = response.data.id;
                localStorage.setItem("name", name);
                localStorage.setItem("id", id);
                window.location = '/Dashboard';
            } else {
                alert("You entered the wrong email ID or password");
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div className="login-container">
            <form onSubmit={submitValue} className="login-form">
                <h1>Log In</h1>
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Enter Email ID" 
                    onChange={onChange} 
                    className={errors.email ? "input-error" : ""}
                />
                {errors.email && <small className="error-text">{errors.email}</small>} <br />

                <div className="password-wrapper">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Enter Password" 
                        onChange={onChange} 
                        className={errors.password ? "input-error" : ""}
                    />
                    <i
                        className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} 
                        onClick={togglePasswordVisibility}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#6c757d",
                            fontSize: "18px"
                        }}
                    ></i>
                </div>
                {errors.password && <small className="error-text">{errors.password}</small>} <br />

                <span style={{ float: "right", margin: "-5px 15px 0px 0px" }}>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                </span>
                <br /><br />

                <input type="submit" value="Log in" className="submit-btn" />

                <h4>
                    <center>No account? <Link to="/signup" className="signup-link">Create one</Link></center>
                </h4>
            </form>
        </div>
    );
}

export default Login;
