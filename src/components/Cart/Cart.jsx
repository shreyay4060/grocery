import React, { useState, useEffect } from 'react';
import styles from "./Cart.module.css";
import Items from '../Items/Items';
import Btn from '../Btn/Btn';
import { db } from "../../firebase";
import {
  collection, addDoc, getDocs,
  deleteDoc, doc, query, where,
  updateDoc, getDoc, setDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function formatDateTime(date) {
  if (!date) return "";
  const d = typeof date === "string"
    ? new Date(date)
    : date?.toDate
    ? date.toDate()
    : date;
  return d.toLocaleString();
}

// Profile Tab (floating circle)
function ProfileTab({ user, onClick }) {
  return (
    <div className={styles.profileCircle} onClick={onClick} title="Profile">
      <img
        src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || user?.email || "U")}
        alt="profile"
        className={styles.profilePic}
      />
    </div>
  );
}

// Profile Modal for viewing/editing info
function ProfileModal({ open, user, onClose, onSave }) {
  const { logout } = useAuth(); // <-- Add this line
  const [form, setForm] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    birthdate: user?.birthdate || "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm({
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
      birthdate: user?.birthdate || "",
    });
  }, [user]);

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setUploading(true);
    // Upload to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `profilePics/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm(f => ({ ...f, photoURL: url }));
    setUploading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  if (!open) return null;
  return (
    <div className={styles.profileModalBackdrop}>
      <div className={styles.profileModal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <div className={styles.profileModalImgWrap}>
          <img
            src={form.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(form.displayName || form.email || "U")}
            alt="profile"
            className={styles.profilePicLarge}
          />
          <label className={styles.uploadLabel}>
            {uploading ? "Uploading..." : "Change Photo"}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.profileField}>
            <label>Name</label>
            <input name="displayName" value={form.displayName} onChange={handleChange} />
          </div>
          <div className={styles.profileField}>
            <label>Email</label>
            <input name="email" value={form.email} disabled />
          </div>
          <div className={styles.profileField}>
            <label>Birthdate</label>
            <input name="birthdate" type="date" value={form.birthdate} onChange={handleChange} />
          </div>
          <button className={styles.saveBtn} type="submit" disabled={uploading}>Save</button>
        </form>
        <button
          className={styles.logoutBtn}
          style={{
            marginTop: "24px",
            width: "100%",
            background: "#f17e36",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 0",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer"
          }}
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

// Add this helper for localStorage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log(localStorage.setItem(key, JSON.stringify(value)))
}
function getFromLocalStorage(key, fallback) {
  const val = localStorage.getItem(key);
  if (!val) return fallback;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

export default function Cart() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [baskets, setBaskets] = useState(() => getFromLocalStorage("baskets", []));
  const [activeBasket, setActiveBasket] = useState(() => getFromLocalStorage("activeBasket", null));
  const [showItems, setShowItems] = useState(false);
  const [itemsKey, setItemsKey] = useState(0);
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Profile modal state
  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Fetch user profile from Firestore
  useEffect(() => {
    async function fetchUserProfile() {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserProfile(userSnap.data());
      else {
        // If not exists, create
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
          birthdate: "",
        };
        await setDoc(userRef, userData);
        setUserProfile(userData);
      }
    }
    fetchUserProfile();
  }, [currentUser]);

  // Save profile to Firestore
  async function handleProfileSave(form) {
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { ...userProfile, ...form }, { merge: true });
    setUserProfile(prev => ({ ...prev, ...form }));
    setProfileOpen(false);
  }

  // Save baskets and activeBasket to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage("baskets", baskets);
  }, [baskets]);
  useEffect(() => {
    saveToLocalStorage("activeBasket", activeBasket);
  }, [activeBasket]);

  useEffect(() => {
    if (!currentUser) { navigate("/login"); return; }
    (async () => {
      const q = query(collection(db, "baskets"), where("userId", "==", currentUser.uid));
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setBaskets(list);
      saveToLocalStorage("baskets", list);
      if (list.length && !activeBasket) {
        setActiveBasket(list[0]);
        saveToLocalStorage("activeBasket", list[0]);
      }
    })();
  }, [currentUser]);

  const addNewBasket = () => {
    const name = `Basket ${baskets.length + 1}`;
    const now = new Date();
    const newBasket = { name, items: [], userId: currentUser.uid, updatedAt: now };
    setActiveBasket(newBasket);
    setShowItems(true);
    setItemsKey(k => k + 1);
    setIsEditing(false);
    saveToLocalStorage("activeBasket", newBasket);
  };

  const saveOrUpdateBasket = async () => {
    if (!activeBasket) return;
    const now = new Date();
    let id = activeBasket.id;
    if (id) {
      await updateDoc(doc(db, "baskets", id), { ...activeBasket, updatedAt: now });
      setSuccess("Basket updated!");
    } else {
      const ref = await addDoc(collection(db, "baskets"), { ...activeBasket, createdAt: now, updatedAt: now });
      id = ref.id;
      setSuccess("Basket saved!");
    }
    const q = query(collection(db, "baskets"), where("userId", "==", currentUser.uid));
    const snap = await getDocs(q);
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setBaskets(list);
    setActiveBasket(list.find(b => b.id === id));
    setShowItems(false);
    setIsEditing(false);
    setTimeout(() => setSuccess(""), 2000);
    saveToLocalStorage("baskets", list);
    saveToLocalStorage("activeBasket", list.find(b => b.id === id));
  };

  const removeBasket = async (basketId) => {
    await deleteDoc(doc(db, "baskets", basketId));
    const filtered = baskets.filter(b => b.id !== basketId);
    setBaskets(filtered);
    if (activeBasket?.id === basketId) setActiveBasket(filtered[0] || null);
    saveToLocalStorage("baskets", filtered);
    saveToLocalStorage("activeBasket", filtered[0] || null);
  };

  const selectBasket = (b) => {
    setActiveBasket(b);
    setShowItems(false);
    setItemsKey(k => k + 1);
    setIsEditing(false);
  };

  const updateActive = (fn) => {
    const copy = { ...activeBasket, items: [...activeBasket.items] };
    fn(copy);
    copy.updatedAt = new Date();
    setActiveBasket(copy);
  };
  const addItem = (item) => updateActive(b => {
    const idx = b.items.findIndex(x => x.id === item.id);
    if (idx < 0) b.items.push({ ...item, quantity: 1 });
    else b.items[idx].quantity++;
  });
  const updateQuantity = (i, delta) => updateActive(b => {
    b.items[i].quantity += delta;
    if (b.items[i].quantity <= 0) b.items.splice(i, 1);
  });

  if (!activeBasket) return (
    <div className={styles.responsiveContainer}>
      <ProfileTab user={userProfile} onClick={() => setProfileOpen(true)} />
      <ProfileModal open={profileOpen} user={userProfile} onClose={() => setProfileOpen(false)} onSave={handleProfileSave} />
      <p>No baskets found.</p>
      <Btn name="+ Add Basket" onClick={addNewBasket} />
    </div>
  );

  return (
    <div className={styles.responsiveContainer}>
      <ProfileTab user={userProfile} onClick={() => setProfileOpen(true)} />
      <ProfileModal open={profileOpen} user={userProfile} onClose={() => setProfileOpen(false)} onSave={handleProfileSave} />
      {success && <div className={styles.success}>{success}</div>}

      <div className={styles.basketList}>
        {baskets.map((b, idx) => (
          <div key={b.id} className={`${styles.basketTab} ${b.id === activeBasket.id ? styles.activeTab : ''}`}>
            <span onClick={() => selectBasket(b)}>{b.name || `Basket ${idx + 1}`}</span>
            <button className={styles.deleteBtn} onClick={() => removeBasket(b.id)}>🗑️</button>
          </div>
        ))}
        <br />
        <br />
        <button onClick={addNewBasket} className={styles.addBasketbtn}>
          <span className={styles.addBasketIcon}>➕ Add Basket</span>
        </button>
      </div>

      <div className={styles.card}>
        <h2>{activeBasket.name}</h2>
        {activeBasket.items.length === 0 ? (
          <p>No items.</p>
        ) : (
          <ul className={styles.itemList}>
            {activeBasket.items.map((it, i) => (
              <li key={i} className={styles.itemRow}>
                <span>{it.name} — ₹{it.price} × {it.quantity}</span>
                <div><br />
                  <button style={{ margin: "5px 0px 0px 0px", backgroundColor: "gray" }} onClick={() => updateQuantity(i, -1)}>-</button>
                  <button style={{ margin: "5px 10px 5px 10px", backgroundColor: "gray" }} onClick={() => updateQuantity(i, 1)}>+</button>
                </div>
                
              </li>
            ))}
          <div className={styles.actions} style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <Btn
          name={activeBasket.id ? (isEditing ? "Save Changes" : "Update Basket") : "Save Basket"}
          onClick={() => {
            if (activeBasket.id && !isEditing) {
              setIsEditing(true);
              setShowItems(true);
              setItemsKey(k => k + 1);
            } else {
              saveOrUpdateBasket();
            }
          }}
        />
      </div></ul>
          
        )}
        <div className={styles.timestamp} style={{ textAlign: "right", fontSize: "12px", color: "#888", marginTop: 8 }}>
          {activeBasket.updatedAt && `Last updated: ${formatDateTime(activeBasket.updatedAt)}`}
        </div>
      </div>

      

      {showItems && <Items key={itemsKey} onAddItem={addItem} basketItems={activeBasket.items} />}
    </div>
  );
}
