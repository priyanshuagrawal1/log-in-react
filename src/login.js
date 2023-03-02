import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { auth } from './firebase-config';
import { Input } from './components/Input/input';
import './login.css';
import { Snackbar } from '@mui/material';

import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Right from './right';
import { Checkbox } from './components/checkbox/checkbox';
export const Login = () => {
    const [open, setOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [rememberMe, setRememberMe] = useState(false);
    const [user, setUser] = useState(null);
    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm(formValues)) {
            return
        }
        try {
            await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
        } catch (error) {
            setOpen(true)
            setErrorMessages(error?.message?.slice(9))
        }
    }
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const inputFields = {
        email: {
            label: "Email", name: "email", value: formValues.email, placeholder: 'Your email', error: formErrors.email ?? ""
        },
        password: {
            label: "Password", name: "password", value: formValues.password, placeholder: 'Your password', type: "password", error: formErrors.password ?? ""
        },

    }
    function validateForm(formValues) {
        const formErrors = {};
        let valid = true;
        if (formValues.password.length <= 0) {
            formErrors.password = "Enter your password";
            valid = false;
        }
        if (!formValues.email.includes('@')) {
            formErrors.email = "Email is not valid";
            valid = false;
        }
        
        if (!valid) {
            setFormErrors(formErrors);
            return false
        }
        return true
    }
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                window.location.href = "/welcome"
            }
            setUser(currentUser);
        });

    }, []);

    function handleChange(name, value) {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    return (
        <>
            <div className="left" >
                <div className="header">
                    <h3>
                        <span style={{ color: "#8a5c8d", }}> Jetic</span>  Platform
                    </h3>
                </div>
                <div className='login'>
                    <h2 className='login__title' >Log in</h2><br></br>
                    <span className='subtitle'>Welcome to Camel cloud, please put your login credentials below to start using the app</span><br /><br />
                    <form onSubmit={handleSubmit}>
                        <div className={" InputFields"} style={{ margin: "10px 0px 30px 0px" }}>
                            {Object.values(inputFields).map((inputField) => {
                                return <Input {...inputField} handleChange={handleChange} key={inputField.name} />

                            })}
                        </div>
                        <Link to="/recover" style={{ color: "#8a5c8d", display: "flex", justifyContent: "flex-end", textDecoration: "none", margin: "25px 0px 0px 0px", fontSize: "12px" }}>Forgot password?</Link><br />
                        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={errorMessages} />
                        <div className='line'></div>
                        <div className='Loginfields' style={{ margin: "20px 0px" }} >
                            <Checkbox label="Remember me" onChange={setRememberMe} />
                            <button className='login__button' style={{ position: "absolute", right: "0px" }}  >Log in</button><br /><br />
                        </div>
                        <span className='login__signup' style={{ justifyContent: "center", display: "flex" }}>
                            Don't have an account?  &nbsp;
                            <Link to="/signup" style={{ color: "#8a5c8d", textDecoration: "none" }}> Sign up</Link>
                        </span>
                    </form >
                </div >
            </div >
            <Right />
        </>
    )
}
