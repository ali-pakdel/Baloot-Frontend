import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import '../css/login.css'
import '../css/normalize.css'

function Register() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [birthDate, setBirthDate] = useState('')

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/auth/register', {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({ "username": username, "password": password , "email": email, "address": address,
            "birthDate": birthDate})
        });
        const responseBodyText = await response.text();
        console.log(responseBodyText)
        console.log(response.json())
        if (response.ok) {
            window.location.href = '/login';
        }
        const data = await response.json();
        if (data.status === 200) {
            navigate("/login")
        } else {
            console.log("WRONG");
            navigate("/register")
        }
    }

    return (
        <>
            <header className="header-container">
                <nav className="navbar">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href="#">
                            <img className="logo" src="./Logo.png" alt="Logo"></img>
                        </a>
                        <a href="/login">
                            <button className="login-btn" type="button">
                                Login
                            </button>
                        </a>

                    </div>
                </nav>
            </header>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-sm-12 col-md-3">
                        <form onSubmit={handleSubmit} className="signing-form">
                            <div className="form-group">
                                <input className="form-control"
                                       type="text"
                                       placeholder="Username"
                                       value={username}
                                       onChange={(event) => setUsername(event.target.value)}
                                       required/>
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                       type="email"
                                       placeholder="Email"
                                       value={email}
                                       onChange={(event) => setEmail(event.target.value)}
                                       required/>
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                       id="password-field" type="password"
                                       placeholder="Password"
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}
                                       required/>
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                       id="password-field" type="password"
                                       placeholder="Confirm Password"
                                       value={confirmPassword}
                                       onChange={(event) => setConfirmPassword(event.target.value)}
                                       required/>
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                       type="text"
                                       placeholder="Birth Date"
                                       value={birthDate}
                                       onChange={(event) => setBirthDate(event.target.value)}
                                       required/>
                            </div>
                            <div onSubmit={handleSubmit} className="form-group signing-container">
                                <button type="submit" className="sign-btn">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer className="position-relative">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            2023 @UT
                        </div>
                    </div>
                </div>
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default Register;