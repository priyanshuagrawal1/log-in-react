import React, { useEffect, useState } from 'react'
import { Snackbar } from '@mui/material';
import Right from './right';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase-config";
import { Link } from 'react-router-dom';
import { Input } from './components/Input/input';

export const Recover = () => {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
    }
    function validateForm(email) {
        if (email.includes('@') && email.includes('.')) {
            setFormErrors({ email: "" })
            return true
        }
        else {
            setFormErrors({ email: "Enter a valid Email" })
            return false
        }
    }

    useEffect(() => { 
        if (email.includes("@") && email.includes(".")) {
            setFormErrors(formErrors => ({ ...formErrors, email: "" }));
        }
    }, [email])

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm(email)) {
            return
        }
        try {
            await sendPasswordResetEmail(auth, email)
            setOpen(true)
            setMessage("Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.")
        } catch (error) {
            setOpen(true)
            setMessage(error?.message?.slice(9))
        }
    }
    
    function handleChange(name, value) {
        switch (name) {
            case "email":
                setEmail(value)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={message} />
            <div className="left" >
                <div className="header">
                    <h3>
                        <span style={{ color: "#8a5c8d", }}> Jetic</span>  Platform
                    </h3>
                </div>
                <div className='login'>
                    <h2 className='login__title' >Password recovery</h2><br></br>
                    <span className=''>Please fill in the email you've used to create a Camel cloud account and we'll send you a reset link</span><br /><br />
                    <form onSubmit={handleSubmit}>
                        <div className={ " InputFields"} style={{ margin: "10px 0px 30px 0px" }}>
                            <Input label="Email" name="email" value={email} placeholder='Your email' handleChange={handleChange} error={formErrors.email}></Input>
                        </div>   <div className='line'></div>
                        <div className='Loginfields' >
                            <button className='login__button' style={{ position: "absolute", right: "0px" }} > Reset my password</button><br /><br /><br />
                        </div>
                        <Link to="/login" style={{ color: "#8a5c8d", display: "flex", justifyContent: "center", textDecoration: "none",fontSize:"12px",fontWeight:"600" }}>Back to Login</Link><br />
                    </form >
                </div >
            </div >
            <Right />
        </>
    )
}
