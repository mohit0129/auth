import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from './apiConfig';
import { Link } from "react-router-dom";
import './Signup.css'; 

function Signup() {
    const [mydata, myDataUpdate] = React.useState({});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const validate = () => {
        const newErrors = {};
        
        if (!mydata.name) newErrors.name = "Name is required";
        if (!mydata.gender) newErrors.gender = "Gender is required";
        if (!mydata.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(mydata.email)) newErrors.email = "Email format is invalid";
        if (!mydata.mobile) newErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(mydata.mobile)) newErrors.mobile = "Mobile number should be 10 digits";
        if (!mydata.password) newErrors.password = "Password is required";
        else if (mydata.password.length < 6) newErrors.password = "Password should be at least 6 characters";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChange = (event) => {
        myDataUpdate((mydata) => ({
            ...mydata, [event.target.name]: event.target.value
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: '' })); // Clear errors when typing
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const submitValue = (event) => {
        event.preventDefault();
        
        if (!validate()) return; // If validation fails, stop form submission
        
        const data = {
            name: mydata.name,
            gender: mydata.gender,
            email: mydata.email,
            mobileno: mydata.mobile,
            password: mydata.password,
        };

        axios.post(`${API_BASE_URL}/register`, data)
        .then(function (response) {
            console.log(response);
            const msg = response.data.message;
            alert(msg);
            window.location = '/Login';
        })
        .catch(function (error) {
            console.error('There was an error!', error);
        });
    };

    return (
        <div className="signup-container">
            <form onSubmit={submitValue} className="signup-form">
                <h1>Sign Up Here</h1>
                
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter Name" 
                    onChange={onChange} 
                    className={errors.name ? "input-error" : ""} 
                />
                {errors.name && <small className="error-text">{errors.name}</small>} <br />

                <div className="gender-section">
                    Gender: 
                    <input type="radio" name="gender" value="Male" onChange={onChange} /> Male
                    <input type="radio" name="gender" value="Female" onChange={onChange} /> Female
                    
                </div>  
                {errors.gender && <small className="error-text">{errors.gender}</small>}
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter Email ID" 
                    onChange={onChange} 
                    className={errors.email ? "input-error" : ""} 
                />
                {errors.email && <small className="error-text">{errors.email}</small>} <br />

                <input 
                    type="text" 
                    name="mobile" 
                    placeholder="Enter Mobile No" 
                    onChange={onChange} 
                    className={errors.mobile ? "input-error" : ""} 
                />
                {errors.mobile && <small className="error-text">{errors.mobile}</small>} <br />
                
                <div className="password-wrapper">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Enter Password" 
                        onChange={onChange} 
                        className={errors.password ? "input-error" : ""} 
                    />
                    <i
                        className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} // Toggle eye icon
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
                
                <input type="submit" value="Create Account" className="submit-btn" /><br/>

                <center><h4>Already have an account? <Link to="/Login" className="login-link">Log in</Link></h4></center>
            </form>
        </div>
    );
}

export default Signup;
