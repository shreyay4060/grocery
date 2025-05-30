import React, { useEffect, useState } from 'react';
import Home from "./components/Home/Home";
import './App.css';
import Cart from './components/Cart/Cart';
import Items from './components/Items/Items';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "./context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./firebase";

function LoginModal({ show, onClose, onSignup }) {
  const { currentUser } = useAuth();
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [uploading, setUploading] = useState(false);

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `profilePics/${currentUser.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await auth.currentUser.updateProfile({ photoURL: url });
    setPhotoURL(url);
    setUploading(false);
  }

  if (!currentUser || !show) return null;

  return (
    <div className="modal-backdrop show">
      <div className="modal-content modal-small animate__animated animate__fadeInDown">
        <button className="modal-close" onClick={onClose}>×</button>
        <Login onSignup={onSignup} />
      </div>
    </div>
  );
}

function SignupModal({ show, onClose }) {
  const { currentUser } = useAuth();
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [uploading, setUploading] = useState(false);

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `profilePics/${currentUser.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await auth.currentUser.updateProfile({ photoURL: url });
    setPhotoURL(url);
    setUploading(false);
  }

  if (!show) return null;

  return (
    <>
      <div style={{ position: "fixed", top: 20, right: 20, background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={photoURL || "https://ui-avatars.com/api/?name=User"} alt="profile" style={{ width: 48, height: 48, borderRadius: "50%" }} />
          <div>
            <div style={{ fontWeight: "bold" }}>{currentUser?.email}</div>
            <label style={{ fontSize: 12, color: "#f17e36", cursor: "pointer" }}>
              {uploading ? "Uploading..." : "Change Photo"}
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
            </label>
          </div>
        </div>
      </div>

      <div className="modal-backdrop show">
        <div className="modal-content modal-small animate__animated animate__fadeInDown">
          <button className="modal-close" onClick={onClose}>×</button>
          <Signup />
        </div>
      </div>
    </>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  
  useEffect(() => {
    if (!currentUser) {
      const timer = setTimeout(() => setShowLogin(true), 10000);
      return () => clearTimeout(timer);
    } else {
      setShowLogin(false);
    }
  }, [currentUser]);

  return (
    <div className="App fancy-bg">
      <Routes>
        <Route path='/login' element={<Login onSignup={() => { setShowLogin(false); setShowSignup(true); }} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <LoginModal
        show={showLogin && !showSignup}
        onClose={() => setShowLogin(false)}
        onSignup={() => { setShowLogin(false); setShowSignup(true); }}
      />
      <SignupModal
        show={showSignup}
        onClose={() => setShowSignup(false)}
      />
    </div>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
