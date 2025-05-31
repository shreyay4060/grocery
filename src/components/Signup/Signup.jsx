import React, { useState } from 'react';
import styles from "./Signup.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Signup() {
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
      const cred = await createUserWithEmailAndPassword(auth, values.email, values.password);
      // Save user info to Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email: values.email,
        createdAt: new Date()
      });
      localStorage.setItem("user", JSON.stringify({
        uid: cred.user.uid,
        email: values.email
      }));
      console.log(localStorage.setItem("user", JSON.stringify({
        uid: cred.user.uid,
        email: values.email
      })))
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className={styles.signupContainer}>
        <h1>Signup Please 😉!</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form>
          <input onChange={handleChange} type="email" name="email" placeholder='Email' value={values.email} required />
          <input onChange={handleChange} type="password" name="password" placeholder='Enter Password' value={values.password} required />
          <div className="btn">
            <button type="submit" onClick={handleClick} className="button">Signup</button>
          </div>
        </form>
        <p>Already have an account? <Link to="/login" style={{color:"blue"}}>Login</Link></p>
      </div>
    </div>
  );
}
