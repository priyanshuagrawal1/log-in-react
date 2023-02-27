import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from "./firebase-config"
export const Welcomepage = () => {

    async function logout() {
        await signOut(auth);
        window.location.href = "/login"
    }
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
