import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from './apiConfig';

function ForgotPassword() {
    const [mydata, setData] = React.useState({});

    const onChange = (event) => {
        setData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    const submitValue = (event) => {
        event.preventDefault();

        // Construct the data object
        const data = {
            email: mydata.email
        };

        // Send the data as JSON
        axios.post(`${API_BASE_URL}/password-reset`, data)
		
        .then((response) => {
            console.log(response);
            if (response.data.flag === "1") {
                const msg = response.data.message;
                alert(msg);
            } else {
                alert("You entered the wrong email ID.");
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div>
            <form onSubmit={submitValue}>
                <h1>Forgot Password</h1>
                <input type="text" name="email" placeholder="Enter Email ID" onChange={onChange} /><br />
                <input type="submit" value="Get Password" /><br/><br/>
				<center><h4>Back to <Link to="/Login">Login</Link></h4></center>
            </form>
        </div>
    );
}

export default ForgotPassword;
