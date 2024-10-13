import React, { useEffect } from "react";

import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";

function Dashboard(){
    const [Dashboard,setDashboard] = React.useState("");

    function logout(){
        localStorage.clear();
        window.location='Login';
    }

    useEffect(() => {
        if(localStorage.getItem("name")) {
            var a = localStorage.getItem("name")
            setDashboard(a);
        }
        else{
            window.location = "Login"
        }
    })
    return(
        <div>
            <form>
            <h1>Dashboard</h1>
            Hi, {Dashboard}<br/><br/><br/>
            <Link to="/ChangePassword">Change Password</Link><br/><br/>
            <Link to={"/Profile"}>Your Profile</Link><br/><br/>
            <button onClick={logout} type="button">Logout</button>
            </form>
        </div>

    )
}
export default Dashboard;