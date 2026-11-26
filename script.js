import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiFiboRQqA-qH7iZagBWyeicYSJjwALZ8",
    authDomain: "banda-login.firebaseapp.com",
    projectId: "banda-login",
    storageBucket: "banda-login.firebasestorage.app",
    messagingSenderId: "25902670396",
    appId: "1:25902670396:web:4a664aae1197c0f09bd939",
    measurementId: "G-234C82Q5ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// HTML elements
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const form = document.getElementById("loginForm");
const registerBtn = document.getElementById("registerBtn");

const eyeL = document.querySelector(".eyeball-l");
const eyeR = document.querySelector(".eyeball-r");

const handL = document.querySelector(".hand-l");
const handR = document.querySelector(".hand-r");

// Panda eye movements
const normalEyeStyle = () => {
    eyeL.style.cssText = "left: 0.6em; top: 0.6em;";
    eyeR.style.cssText = "right: 0.6em; top: 0.6em;";
};

const normalHandStyle = () => {
    handL.style.cssText = `
        height: 2.81em;
        top: 8.4em;
        left: 7.5em;
        transform: rotate(0deg);
    `;

    handR.style.cssText = `
        height: 2.81em;
        top: 8.4em;
        right: 7.5em;
        transform: rotate(0deg);
    `;
};

username.addEventListener("focus", () => {
    eyeL.style.cssText = "left: 0.75em; top: 1.12em;";
    eyeR.style.cssText = "right: 0.75em; top: 1.12em;";
    normalHandStyle();
});

password.addEventListener("focus", () => {
    handL.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        left: 11.75em;
        transform: rotate(-155deg);
    `;

    handR.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        right: 11.75em;
        transform: rotate(155deg);
    `;

    normalEyeStyle();
});

document.addEventListener("click", (e) => {
    if (
        e.target !== username &&
        e.target !== password &&
        e.target !== email
    ) {
        normalEyeStyle();
        normalHandStyle();
    }
});

// Create new account
registerBtn.addEventListener("click", async () => {
    const name = username.value.trim();
    const userEmail = email.value.trim();
    const userPassword = password.value;

    if (!name || !userEmail || !userPassword) {
        alert("Please enter username, email and password.");
        return;
    }

    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
        );

        await updateProfile(result.user, {
            displayName: name
        });

        alert("Account created successfully!");

    } catch (error) {
        alert(error.message);
    }
});

// Login
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userEmail = email.value.trim();
    const userPassword = password.value;

    try {
        await signInWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
        );

        alert("Login successful!");

    } catch (error) {
        alert(error.message);
    }
});