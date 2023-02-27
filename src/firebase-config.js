// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCdNgIXWTChsxZvroUIA0K_hbk75_kfMAM",
    authDomain: "react-60bf5.firebaseapp.com",
    projectId: "react-60bf5",
    storageBucket: "react-60bf5.appspot.com",
    messagingSenderId: "664777784467",
    appId: "1:664777784467:web:e34f6cbf7d0f47d382e166",
    measurementId: "G-3RSCP394WE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
