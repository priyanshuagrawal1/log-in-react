import React, { useState, useEffect } from 'react'
import './login.css'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { Snackbar } from '@mui/material';
import Right from './right'
import { Link } from 'react-router-dom'
export const Signup = () => {

    const [open, setOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [name, setName] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [terms, setTerms] = useState(false);
    const [user, setUser] = useState(null);
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password)
    }

    function disableButton() {
        if (password.length < 6 || !email.includes('@') || !companyName || !name || !terms) {
            return true
        }
        if (password === repeatPass) {
            return false
        } else {
            return true
        }
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
    async function signUp() {
        try {
            console.log("sdfs")
            const user = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setOpen(true)
            setErrorMessages(error?.message?.slice(9))
        }
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={errorMessages} />

            <div className="left" >
                <div className="header">
                    <h3>
                        <span style={{ color: "#8a5c8d", fontWeight: "220" }}> Jetic</span>  Platform
                    </h3>
                </div>
                <div className='login'>
                    <h2 className='login__title' >Create account</h2><br></br>
                    <span className=''>Get access to exclusive features by creating an account</span><br /><br />
                    <form onSubmit={handleSubmit}>
                        <div className='InputFields'>
                            <label>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' className='login__input' />
                            <label>Company Name</label>
                            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='Your company name' className='login__input' />
                            <label>E-mail</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email' className='login__input' />
                            <label>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='login__input' placeholder='Your password' />
                            <label>Repeat Password</label>
                            <input value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} type='password' className='login__input' placeholder='Repeat password' />
                        </div>
                        <div className='line'></div>
                        <div className='Loginfields' >
                            <input type='checkbox' className='login__checkbox' style={{ margin: "10px" }} onChange={(e) => setTerms(e.target.checked)} />
                            <label style={{ "fontWeight": "220", fontSize: "15px " }}> I've read and accept the </label>
                            <a href="url" style={{ color: "#8a5c8d", "fontWeight": "220", textDecoration: "none" }}>Terms and Conditions</a><br />
                            <input type='checkbox' className='login__checkbox' style={{ margin: "10px", fontSize: "15px " }} value={terms} />
                            <label style={{ "fontWeight": "220", fontSize: "15px " }}>Subscribe to the newsletter to stay up to date</label><br /><br />

                            <button className='login__button' style={{ position: "absolute", right: "0px", }} onClick={signUp} disabled={disableButton()} >Create my account</button><br /><br />
                        </div>
                        <span className='login__signup' style={{ justifyContent: "center", display: "flex" }}>
                            Already have an account?  &nbsp;
                            <Link to="/login" style={{ color: "#8a5c8d", "fontWeight": "220", textDecoration: "none" }}>Login</Link>
                        </span>
                    </form >
                </div >
            </div >
            <Right />
        </>
    )
}
