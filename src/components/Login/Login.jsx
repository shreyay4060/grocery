import React, { useState } from 'react';
import styles from "./Login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Login({ onSignup }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }

  async function handleClick(event) {
    event.preventDefault();
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, values.email, values.password);
      // Ensure user info exists in Firestore
      const userRef = doc(db, "users", cred.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: cred.user.uid,
          email: values.email,
          createdAt: new Date()
        });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className={styles.signupContainer}>
        <h1>Login Please 😉!</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form>
          <input onChange={handleChange} type="email" name="email" placeholder='Email' value={values.email} required />
          <input onChange={handleChange} type="password" name="password" placeholder='Enter Password' value={values.password} required />
          <div className="btn">
            <button onClick={handleClick} type="submit" className="button">Login</button>
          </div>
        </form><br /><br />
        <p>
          Don't have an account?{" "}
          <span style={{ color: "#e15e0c", cursor: "pointer", fontWeight:"600" }} onClick={onSignup}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
