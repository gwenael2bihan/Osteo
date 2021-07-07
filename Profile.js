import React from 'react'
import { getUser, removeUserSession } from '../utils/Common';
import { useLocation } from "react-router-dom";
import AuthService from '../services/auth-service';

const ProPage = (props) => {
    const user = getUser();
    const location = useLocation();
    const currentUser = AuthService.getCurrentUser();


    console.log("PRO: ", location.state.detail)
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    )
}

export default ProPage;
