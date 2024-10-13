import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from './apiConfig';

function ChangePassword() {
    const [mydata, setData] = useState({});
    const [id, setId] = useState('');

    useEffect(() => {
        const storedId = localStorage.getItem('id');
        if (storedId) {
            setId(storedId);
        }
    }, []);

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
            id: id,
            opass: mydata.password,
            npass: mydata.npassword,
            cpass: mydata.cpassword
        };

        // Send the data as JSON
        axios.post(`${API_BASE_URL}/change-password`, data)
		
        .then((response) => {
            console.log(response);
            if (response.data.flag === "1") {
                const msg = response.data.message;
                alert(msg);
                window.location = '/Dashboard'; // Fixed typo from "Dashbord" to "Dashboard"
            } else {
                alert(response.data.message);
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div>
            <form onSubmit={submitValue}>
                <h1>Change Password</h1>
                User Id : <input type="text" name="id" placeholder="Enter ID" onChange={onChange} value={id} /><br /><br />
                <input type="password" name="password" placeholder="Enter Old Password" onChange={onChange} /><br /><br />
                New Password : <input type="password" name="npassword" placeholder="Enter New Password" onChange={onChange} /><br /><br />
                Confirm Password : <input type="password" name="cpassword" placeholder="Enter Confirm Password" onChange={onChange} /><br /><br />
                <input type="submit" value="Change Password" />
            </form>
        </div>
    );
}

export default ChangePassword;
