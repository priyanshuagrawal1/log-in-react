import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { auth } from './firebase-config';
import './login.css';
import { Snackbar } from '@mui/material';

import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Right from './right';
export const Login = () => {
    const [open, setOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                window.location.href = "/welcome"
            }
            setUser(currentUser);
            console.log(user)
        });

    }, [])

    async function loginWithFirebase() {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            setOpen(true)
            setErrorMessages(error?.message?.slice(9))
        }
    }

    return (
        <>
            <div className="left" >
                <div className="header">
                    <h3>
                        <span style={{ color: "#8a5c8d", fontWeight: "220" }}> Jetic</span>  Platform
                    </h3>
                </div>
                <div className='login'>
                    <h2 className='login__title' >Log in</h2><br></br>
                    <span className='subtitle'>Welcome to Camel cloud, please put your login credentials below to start using the app</span><br /><br />
                    <form onSubmit={handleSubmit}>
                        <div className='InputFields'>
                            <label>E-mail</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='login__input' />
                            <label>Password</label>
                            <input value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className='login__input'
                                placeholder='Enter your password' />
                        </div>
                        <Link to="/recover" style={{ color: "#8a5c8d", "fontWeight": "220", display: "flex", justifyContent: "flex-end", textDecoration: "none" }}>Forgot password?</Link><br />
                        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={errorMessages} />
                        <div className='line'></div>
                        <div className='Loginfields' >
                            <input type='checkbox' className='login__checkbox' style={{ margin: "10px" }} />
                            <label style={{ "fontWeight": "220" }}>Remember me</label>
                            <button className='login__button' style={{ position: "absolute", right: "0px" }} onClick={loginWithFirebase} >Log in</button><br /><br />
                        </div>
                        <span className='login__signup' style={{ justifyContent: "center", display: "flex" }}>
                            Don't have an account?  &nbsp;
                            <Link to="/signup" style={{ color: "#8a5c8d", "fontWeight": "220", textDecoration: "none" }}> Sign up</Link>
                        </span>
                    </form >
                </div >
            </div >
            <Right />
        </>
    )
}
