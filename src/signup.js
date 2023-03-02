import React, { useState, useEffect, useMemo, useCallback } from 'react'

import './login.css'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { Snackbar } from '@mui/material';
import Right from './right'
import { Link } from 'react-router-dom'
import { Checkbox } from './components/checkbox/checkbox';
import { Input } from './components/Input/input';

export const Signup = () => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repeatPass: '',
        companyName: '',
        name: '',
    });

 
    function slowFunction(formValues) {
        for (let i = 0; i < 1000000000; i++) { }
        return formValues;
    }
    useEffect(() => {
        if (formValues.repeatPass.length && formValues.password !== formValues.repeatPass) {
            setFormErrors(formErrors => ({ ...formErrors, repeatPass: "Passwords do not match" }));
        }
        else {
            setFormErrors(formErrors => ({ ...formErrors, repeatPass: "" }));
        }
        if (formValues.name) {
            setFormErrors(formErrors => ({ ...formErrors, name: "" }));
        }
        if (formValues.companyName) {
            setFormErrors(formErrors => ({ ...formErrors, companyName: "" }));
        }
        if (formValues.email && formValues.email.includes("@") && formValues.email.includes(".")) {
            setFormErrors(formErrors => ({ ...formErrors, email: "" }));
        }
        if (formValues.password) {
            setFormErrors(formErrors => ({ ...formErrors, password: "" }));
        }

    }, [formValues])

    function handleChange(name, value) {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const [open, setOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [terms, setTerms] = useState(false);
    const [user, setUser] = useState(null);
    const [newsLetter, setNewsLetter] = useState(false);
        
    const inputFields = {
        name: {
            label: "Name", name: "name", value: formValues.name, placeholder: 'Your name', error: formErrors.name ?? ""
        },
        companyName: {
            label: "Company Name", name: "companyName", value: formValues.companyName, placeholder: 'Your company name', error: formErrors.companyName ?? ""
        },
        email: {
            label: "Email", name: "email", value: formValues.email, placeholder: 'Your email', error: formErrors.email ?? ""
        },
        password: {
            label: "Password", name: "password", value: formValues.password, placeholder: 'Your password', type: "password", error: formErrors.password ?? ""
        },
        repeatPass: {
            label: "Repeat Password", name: "repeatPass", value: formValues.repeatPass, placeholder: 'Repeat your password', type: "password", error: formErrors.repeatPass ?? ""
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm(formValues)) {
            return
        }
        try {
            await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
        } catch (error) {
            setOpen(true)
            setErrorMessages(error?.message?.slice(9))
        }
    }
    function validateForm(formValues) {
        const formErrors = {};
        let valid = true;
        if (formValues.password.length < 8) {
            formErrors.password = "Password must be at least 8 characters";
            valid = false;
        }
        if (!formValues.email.includes('@')) {
            formErrors.email = "Email is not valid";
            valid = false;
        }
        if (!formValues.companyName) {
            formErrors.companyName = "Company name is required"
            valid = false;
        }
        if (!formValues.name) {
            formErrors.name = "Name is required";
            valid = false;
        }
        if (!terms) {
            formErrors.terms = "You must agree to the terms and conditions";
            valid = false;
        }
        if (formValues.password !== formValues.repeatPass) {
            formErrors.repeatPass = "Passwords do not match";
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
    }, [])
    function checkErrors(formErrors) {
        let errors = Object.values(formErrors)
        let hasError = errors.filter(error => error.length > 0)
        if (hasError.length > 3) {
            return true
        }
        return false;
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={errorMessages} />

            <div className="left" >
                <div className="header">
                    <h3>
                        <span style={{ color: "#8a5c8d", }}> Jetic</span>  Platform
                    </h3>
                </div>
                <div className='login'>
                    <h2 className='login__title' >Create account</h2><br></br>
                    <span className='subtitle'>Get access to exclusive features by creating an account</span><br /><br />
                    <form onSubmit={handleSubmit}>
                        <div className={(checkErrors(formErrors) ? "errorFields" : "") + " InputFields"}>
                            {Object.values(inputFields).map((inputField) => {
                                return <Input {...inputField} handleChange={handleChange} key={inputField.name} />

                            })}
                        </div>
                        <hr></hr>
                        <div className='Loginfields' >
                            <Checkbox label="I've read and accept the" onChange={setTerms} />
                            <a href="url" style={{ color: "#8a5c8d", textDecoration: "none", fontSize: "11px" }}>Terms and Conditions</a>
                            <p className={!formErrors.terms ? "" : "errorText " + "termsError "} style={{
                                justifyContent: "flext-start !important", display: "flex"
                            }} >{formErrors.terms}</p>
                            <Checkbox label="Subscribe to the newsletter to stay up to date " onChange={setNewsLetter} />
                            <button className='login__button' style={{ position: "relative", left: "240px", bottom: "-20px" }}  >Create my account</button>
                            <span className='login__signup' style={{ justifyContent: "center", display: "flex", position: "relative", bottom: "-40px" }}>
                                Already have an account?  &nbsp;
                                <Link to="/login" style={{ color: "#8a5c8d", textDecoration: "none" }}>Sign in</Link>
                            </span>
                        </div>
                    </form >
                </div >
            </div >
            <Right />
        </>
    )
}
