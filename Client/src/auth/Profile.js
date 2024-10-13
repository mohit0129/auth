import axios from "axios";
import React, { useEffect, useState } from "react";
import API_BASE_URL from './apiConfig';

function Profile() {
    const [mydata, setData] = useState({
        name: '',
        gender: '',
        email: '',
        mobile: '',
        createdAt: '',  // Change created to createdAt to align with the backend field name
		lastLogin: ''
    });
    const [id, setId] = useState('');

    useEffect(() => {
        const storedId = localStorage.getItem('id');
        if (storedId) {
            setId(storedId);

            // Fetch profile data based on the user ID
            axios.get(`${API_BASE_URL}/get-profile`, {
                params: { id: storedId }
            })
            .then((response) => {
                const userData = response.data;
                console.log('Fetched user data:', userData); // Debugging line
                if (userData) {
                    setData({
                        name: userData.name || '',
                        gender: userData.gender || '',
                        email: userData.email || '',
                        mobile: userData.mobile || '',
						createdAt: formatDate(userData.createdAt),  // Format the date
						lastLogin: formatDate(userData.lastLogin)
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching profile data', error);
            });
        }
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString();  // You can format it as per your requirements
    };

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
            name: mydata.name,
            gender: mydata.gender,
            email: mydata.email,
            mobile: mydata.mobile,
        };

        // Send the updated data as JSON
        axios.post(`${API_BASE_URL}/update-profile`, data)
        .then((response) => {
            console.log(response);
            if (response.data.flag === "1") {
                const msg = response.data.message;
                alert(msg);
                window.location = "/Dashboard"; // Fixed typo from "Dashbord" to "Dashboard"
            } else {
                alert(response.data.message);
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    };

    return (
        <>
            <form onSubmit={submitValue}>
                <h1>Profile</h1>
                Created on: {mydata.createdAt}<br /><br />
                Last Login: {mydata.lastLogin}<br /><br />
                User Id : <input type="text" name="id" placeholder="Enter ID" value={id} disabled /><br /><br />
                Name : <input type="text" name="name" placeholder="Enter Name" onChange={onChange} value={mydata.name} /><br /><br />
                Gender : <input type="text" name="gender" placeholder="Enter Gender" onChange={onChange} value={mydata.gender} /><br /><br />
                Email : <input type="text" name="email" placeholder="Enter Email ID" onChange={onChange} value={mydata.email} /><br /><br />
                Mobile No : <input type="number" name="mobile" placeholder="Enter Mobile No" onChange={onChange} value={mydata.mobile} /><br /><br />
                <input type="submit" value="Update Profile" />
            </form>
        </>
    );
}

export default Profile;
