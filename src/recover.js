import React, { useState } from 'react'
import { Snackbar } from '@mui/material';
import Right from './right';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase-config";
import { Link } from 'react-router-dom';

export const Recover = () => {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email)
    }
    async function resetPassword() {
        try {
            await sendPasswordResetEmail(auth, email)
            setOpen(true)
            setMessage("Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.")
        } catch (error) {
            setOpen(true)
            setMessage(error?.message?.slice(9))
        }
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={message} />
            <div className="left" >
                <div className="header">
                    <h3>
                        <span style={{ color: "#8a5c8d", fontWeight: "220" }}> Jetic</span>  Platform
                    </h3>
                </div>
                <div className='login'>
                    <h2 className='login__title' >Password recovery</h2><br></br>
                    <span className=''>Please fill in the email you've used to create a Camel cloud account and we'll send you a reset link</span><br /><br />
                    <form onSubmit={handleSubmit}>
                        <div className='fields'>
                            <label>E-mail</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='login__input' /><br /><br />
                        </div>
                        <div className='line'></div>
                        <div className='Loginfields' >
                            <button className='login__button' style={{ position: "absolute", right: "0px" }} onClick={resetPassword}> Reset my password</button><br /><br /><br />
                        </div>
                        <Link to="/login" style={{ color: "#8a5c8d", "fontWeight": "220", display: "flex", justifyContent: "flex-end", textDecoration: "none" }}>Back to Login</Link><br />
                    </form >
                </div >
            </div >
            <Right />
        </>
    )
}
