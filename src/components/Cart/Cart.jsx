// src/components/Cart/Cart.jsx
import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Items from "../Items/Items";
import Btn from "../Btn/Btn";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function formatDateTime(date) {
  if (!date) return "";
  const d =
    typeof date === "string"
      ? new Date(date)
      : date?.toDate
      ? date.toDate()
      : date;
  return d.toLocaleString();
}

function ProfileTab({ user, onClick }) {
  return (
    <div className={styles.profileCircle} onClick={onClick} title="Profile">
      <img
        src={
          user?.photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.displayName || user?.email || "U"
          )}`
        }
        alt="profile"
        className={styles.profilePic}
      />
    </div>
  );
}

function ProfileModal({ open, user, onClose, onSave }) {
  const { logout } = useAuth();
  const [form, setForm] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    birthdate: user?.birthdate || "",
  });
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
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `profilePics/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setForm((f) => ({ ...f, photoURL: url }));
    setUploading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  if (!open) return null;
  return (
    <div className={styles.profileModalBackdrop}>
      <div className={styles.profileModal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <div className={styles.profileModalImgWrap}>
          <img
            src={
              form.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                form.displayName || form.email || "U"
              )}`
            }
            alt="profile"
            className={styles.profilePicLarge}
          />
          <label className={styles.uploadLabel}>
            {uploading ? "Uploading..." : "Change Photo"}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.profileField}>
            <label>Name</label>
            <input
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.profileField}>
            <label>Email</label>
            <input name="email" value={form.email} disabled />
          </div>
          <div className={styles.profileField}>
            <label>Birthdate</label>
            <input
              name="birthdate"
              type="date"
              value={form.birthdate}
              onChange={handleChange}
            />
          </div>
          <button className={styles.saveBtn} type="submit" disabled={uploading}>
            Save
          </button>
        </form>

        <button
          className={styles.logoutBtn}
          style={{
            marginTop: "24px",
            width: "100%",
            background: "#e91e63",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 0",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [baskets, setBaskets] = useState([]);
  const [activeBasket, setActiveBasket] = useState(null);
  const [editingBasket, setEditingBasket] = useState(null);
  const [showItems, setShowItems] = useState(false);
  const [itemsKey, setItemsKey] = useState(0);
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // 1) Fetch user profile
  useEffect(() => {
    async function fetchUserProfile() {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserProfile(userSnap.data());
      } else {
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

  // 2) Fetch all baskets
  const fetchBaskets = async () => {
    if (!currentUser) return;
    const q = query(
      collection(db, "baskets"),
      where("userId", "==", currentUser.uid)
    );
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name,
        items: data.items || [],
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      };
    });
    list.sort(
      (a, b) =>
        (b.updatedAt?.toDate?.().getTime() || 0) -
        (a.updatedAt?.toDate?.().getTime() || 0)
    );
    setBaskets(list);

    if (
      list.length &&
      (!activeBasket || !list.find((b) => b.id === activeBasket.id))
    ) {
      setActiveBasket(list[0]);
      setShowItems(false);
      setIsEditing(false);
      setEditingBasket(null);
    }
    if (!list.length) {
      setActiveBasket(null);
      setShowItems(false);
      setIsEditing(false);
      setEditingBasket(null);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    fetchBaskets();
    // eslint-disable-next-line
  }, [currentUser]);

  // 3) Create a new basket
  const addNewBasket = async () => {
    if (!currentUser) return;
    try {
      const defaultName = `Basket ${baskets.length + 1}`;
      const now = new Date();
      const newBasketData = {
        userId: currentUser.uid,
        name: defaultName,
        items: [],
        createdAt: now,
        updatedAt: now,
      };
      const refDoc = await addDoc(collection(db, "baskets"), newBasketData);
      const basketWithId = { ...newBasketData, id: refDoc.id };

      setBaskets((prev) => [basketWithId, ...prev]);
      setActiveBasket(basketWithId);
      // Enter edit mode immediately
      setEditingBasket({ ...basketWithId });
      setIsEditing(true);
      setShowItems(true);
      setItemsKey((k) => k + 1);
      setSuccess("New basket created. Add items and click Save Changes.");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error("Error creating new basket:", err);
    }
  };

  // 4) Save changes to Firestore
  const saveOrUpdateBasket = async () => {
    if (!editingBasket) return;
    try {
      const now = new Date();
      const id = editingBasket.id;
      const basketData = {
        name: editingBasket.name,
        items: editingBasket.items,
        updatedAt: now,
      };
      await updateDoc(doc(db, "baskets", id), basketData);

      setSuccess("Basket saved!");
      setTimeout(() => setSuccess(""), 2000);

      await fetchBaskets();
      const updated = baskets.find((b) => b.id === id);
      setActiveBasket(updated || editingBasket);
      setEditingBasket(null);
      setIsEditing(false);
      setShowItems(false);
    } catch (err) {
      console.error("Error saving basket:", err);
    }
  };

  // 5) Delete a basket
  const removeBasket = async (basketId) => {
    try {
      await deleteDoc(doc(db, "baskets", basketId));
      setSuccess("Basket deleted!");
      setTimeout(() => setSuccess(""), 2000);
      await fetchBaskets();
    } catch (err) {
      console.error("Error deleting basket:", err);
    }
  };

  // 6) Select a basket (view mode)
  const selectBasket = (b) => {
    setActiveBasket(b);
    setEditingBasket(null);
    setIsEditing(false);
    setShowItems(false);
    setItemsKey((k) => k + 1);
  };

  // 7) Local editing helpers
  const updateEditing = (fn) => {
    if (!editingBasket) return;
    const copy = { ...editingBasket, items: [...editingBasket.items] };
    fn(copy);
    setEditingBasket(copy);
  };

  const addItem = (item) =>
    updateEditing((b) => {
      const idx = b.items.findIndex((x) => x.id === item.id);
      if (idx < 0) b.items.push({ ...item, quantity: 1 });
      else b.items[idx].quantity++;
    });

  const updateQuantity = (itemId, delta) =>
    updateEditing((b) => {
      const idx = b.items.findIndex((x) => x.id === itemId);
      if (idx < 0) return;
      b.items[idx].quantity += delta;
      if (b.items[idx].quantity <= 0) {
        b.items.splice(idx, 1);
      }
    });

  // 8) When no active basket exists
  if (!activeBasket) {
    return (
      <div className={styles.responsiveContainer}>
        <ProfileTab user={userProfile} onClick={() => setProfileOpen(true)} />
        <ProfileModal
          open={profileOpen}
          user={userProfile}
          onClose={() => setProfileOpen(false)}
          onSave={(f) =>
            setDoc(doc(db, "users", currentUser.uid), f, { merge: true }).then(
              () => setProfileOpen(false)
            )
          }
        />
        <p>No baskets found.</p>
        <Btn name="+ Add Basket" onClick={addNewBasket} />
      </div>
    );
  }

  return (
    <div className={styles.responsiveContainer}>
      <ProfileTab user={userProfile} onClick={() => setProfileOpen(true)} />
      <ProfileModal
        open={profileOpen}
        user={userProfile}
        onClose={() => setProfileOpen(false)}
        onSave={(f) =>
          setDoc(doc(db, "users", currentUser.uid), f, { merge: true }).then(
            () => setProfileOpen(false)
          )
        }
      />


      {/* 1) Basket Tabs */}
      <div className={styles.basketList}>
      {success && <div className={styles.success}>{success}</div>}
        {baskets.map((b, idx) => (
          <div
            key={b.id}
            className={`${styles.basketTab} ${
              b.id === activeBasket.id ? styles.activeTab : ""
            }`}
          >
            <span onClick={() => selectBasket(b)}>
              {b.name || `Basket ${idx + 1}`}
            </span>
            <button
              className={styles.deleteBtn}
              onClick={() => removeBasket(b.id)}
            >
              🗑️
            </button>
            <div style={{cursor:"pointer",fontWeight:"500",marginLeft:"20px"}}
              
              onClick={() => {
                selectBasket(b);
                setEditingBasket({ ...b });
                setIsEditing(true);
                setShowItems(true);
              }}
            >
            
            </div>
          </div>
        ))}
        <button onClick={addNewBasket} className={styles.addBasketbtn}>
          <span className={styles.addBasketIcon}>➕ Add Basket</span>
        </button>
      </div>

      {/* 2) Active Basket Card */}
      <div className={styles.card}>
        <h2>{activeBasket.name}</h2>

        {(isEditing ? editingBasket?.items : activeBasket.items).length === 0 ? (
          <p>No items in this basket.</p>
        ) : (
          <ul className={styles.itemList}>
            {(isEditing ? editingBasket.items : activeBasket.items).map(
              (it, i) => (
                <li key={i} className={styles.itemRow}>
                  <span>
                    {it.name} — ₹{it.price} × {it.quantity}
                  </span>
                </li>
              )
            )}
          </ul>
        )}

        <div className={styles.actions}>
          {isEditing ? (
            <button
              className={styles.saveOrUpdateBtn}
              onClick={saveOrUpdateBasket}
            >
              Save Changes
            </button>
          ) : (
            <button
              className={styles.saveOrUpdateBtn}
              onClick={() => {
                setEditingBasket({ ...activeBasket });
                setIsEditing(true);
                setShowItems(true);
              }}
            >
              Update Basket
            </button>
          )}
        </div>

        <div style={{fontSize:"10px"}}>
          {activeBasket.updatedAt &&
            `Last updated: ${formatDateTime(activeBasket.updatedAt)}`}
        </div>
      </div>

      {/* 3) Items Component (edit mode only) */}
      {showItems && isEditing && (
        <Items
          key={itemsKey}
          onAddItem={(itemWithQty) => {
            const currentQty =
              editingBasket.items.find((x) => x.id === itemWithQty.id)
                ?.quantity || 0;
            const diff = itemWithQty.quantity - currentQty;
            if (diff > 0) {
              for (let i = 0; i < diff; i++) addItem(itemWithQty);
            } else if (diff < 0) {
              for (let i = 0; i < -diff; i++)
                updateQuantity(itemWithQty.id, -1);
            }
          }}
          basketItems={editingBasket?.items || []}
        />
      )}
    </div>
  );
}
