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
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.profileField}>
            <label>{t("Name")}</label>
            <input
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.profileField}>
            <label>{t("Email")}</label>
            <input name="email" value={form.email} disabled />
          </div>
          <div className={styles.profileField}>
            <label>{t("Birthdate")}</label>
            <input
              name="birthdate"
              type="date"
              value={form.birthdate}
              onChange={handleChange}
            />
          </div>
          <button
            className={styles.saveBtn}
            type="submit"
            disabled={uploading}
          >
            {t("Save")}
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
          {t("Log Out")}
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const { t } = useTranslation();
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

  const [language, setLanguage] = useState(i18n.language || "en");

  // Whenever user toggles language, store in localStorage and inform i18n
  function handleLanguageChange(e) {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  }

  // Fetch or create the logged-in user's profile document
  useEffect(() => {
    async function fetchUserProfile() {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        } else {
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            photoURL: user?.photoURL || "",
            birthdate: "",
          };
          await setDoc(userRef, userData);
          setUserProfile(userData);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    }
    fetchUserProfile();
  }, [currentUser]);

  // ───────────────────────────────────────────────────────────────
  // fetchBaskets now returns the array it built. It also updates:
  //  1) baskets state,
  //  2) activeBasket (replacing it if it still exists, or picking first, or null),
  //  3) clears editing/showItems when needed.
  // We call this on mount, on language‐change (because t changes), and after any add/delete.
  // ───────────────────────────────────────────────────────────────
  const fetchBaskets = async () => {
    if (!currentUser) return [];
    try {
      const q = query(
        collection(db, "baskets"),
        where("userId", "==", currentUser.uid)
      );
      const snap = await getDocs(q);

      // Build the list, computing a fresh displayName for each basket
      const list = snap.docs.map((d) => {
        const data = d.data();

        let displayName = "";
        if (data.nameKey && typeof data.number === "number") {
          // Always re-translate using `t(...)`
          displayName = `${t(data.nameKey)} ${data.number}`;
        } else {
          // old‐schema fallback
          displayName = data.name || "";
        }

        return {
          id:          d.id,
          rawName:     data.name || "",       // old‐schema fallback
          nameKey:     data.nameKey || null,  // e.g. "Basket"
          number:      data.number || null,   // e.g. 1, 2, 3...
          displayName,                         // e.g. "Basket 1" in current locale
          items:       data.items || [],
          updatedAt:   data.updatedAt,
          createdAt:   data.createdAt,
        };
      });

      // Sort by updatedAt descending
      list.sort(
        (a, b) =>
          (b.updatedAt?.toDate?.().getTime() || 0) -
          (a.updatedAt?.toDate?.().getTime() || 0)
      );

      setBaskets(list);

      // Now recalc activeBasket:
      if (activeBasket) {
        // Try to find a matching basket by ID
        const matching = list.find((b) => b.id === activeBasket.id);
        if (matching) {
          setActiveBasket(matching);
        } else if (list.length > 0) {
          // Previously active was deleted—pick the first
          setActiveBasket(list[0]);
        } else {
          setActiveBasket(null);
        }
      } else if (list.length > 0) {
        // First ever fetch, no activeBasket yet
        setActiveBasket(list[0]);
      } else {
        setActiveBasket(null);
      }

      // If the old activeBasket was not found or there's no basket at all,
      // we also clear editing and hide item palette.
      if (
        !activeBasket ||
        !list.find((b) => b.id === activeBasket.id) ||
        list.length === 0
      ) {
        setShowItems(false);
        setIsEditing(false);
        setEditingBasket(null);
      }

      return list;
    } catch (err) {
      console.error("Error fetching baskets:", err);
      return [];
    }
  };

  // On mount (or when `t` changes, i.e. language changes), re-fetch baskets
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    fetchBaskets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, t]);
  // ← include `t` so that changing language re-runs fetchBaskets()

  // Create a brand-new basket in Firestore
  const addNewBasket = async () => {
    if (!currentUser) return;
    try {
      // Determine next available number (so we stay consistent if some basket was deleted)
      const existingNumbers = baskets.map((b) =>
        typeof b.number === "number" ? b.number : 0
      );
      const nextNumber = existingNumbers.length
        ? Math.max(...existingNumbers) + 1
        : 1;

      const now = new Date();
      const newBasketData = {
        userId:    currentUser.uid,
        nameKey:   "Basket",
        number:    nextNumber,
        items:     [],
        createdAt: now,
        updatedAt: now,
      };

      const refDoc = await addDoc(collection(db, "baskets"), newBasketData);

      // Build the object we’ll immediately push into state
      const basketWithId = {
        id:          refDoc.id,
        rawName:     "",
        nameKey:     "Basket",
        number:      nextNumber,
        displayName: `${t("Basket")} ${nextNumber}`,
        items:       [],
        createdAt:   now,
        updatedAt:   now,
      };

      setBaskets((prev) => [basketWithId, ...prev]);
      setActiveBasket(basketWithId);
      setEditingBasket({ ...basketWithId });
      setIsEditing(true);
      setShowItems(true);
      setItemsKey((k) => k + 1);
      setSuccess(t("New basket created"));
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error("Error creating new basket:", err);
    }
  };

  // Save or update the currently editing basket back to Firestore
  const saveOrUpdateBasket = async () => {
    if (!editingBasket) return;
    try {
      const now = new Date();
      const id = editingBasket.id;

      // We only store: items + updatedAt
      await updateDoc(doc(db, "baskets", id), {
        items:     editingBasket.items,
        updatedAt: now,
      });

      // Immediately put the editingBasket (with its items) back into active state
      setActiveBasket({ ...editingBasket, updatedAt: now });
      setEditingBasket(null);
      setIsEditing(false);
      setShowItems(false);
      setSuccess(t("Basket saved!"));
      setTimeout(() => setSuccess(""), 2000);

      // Then re-fetch baskets so that displayName (and updatedAt) are correct in list
      await fetchBaskets();
    } catch (err) {
      console.error("Error saving basket:", err);
    }
  };

  // Delete an entire basket document
  const removeBasket = async (basketId) => {
    try {
      await deleteDoc(doc(db, "baskets", basketId));
      setSuccess(t("Basket deleted!"));
      setTimeout(() => setSuccess(""), 2000);
      await fetchBaskets();
    } catch (err) {
      console.error("Error deleting basket:", err);
    }
  };

  // When user clicks on a basket tab, switch to it (no editing)
  const selectBasket = (b) => {
    setActiveBasket(b);
    setEditingBasket(null);
    setIsEditing(false);
    setShowItems(false);
    setItemsKey((k) => k + 1);
  };

  // Local editing helpers for building up `editingBasket.items`
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

  // ───────────────────────────────────────────────────────────────
  // RENDERING
  // ───────────────────────────────────────────────────────────────

  // If we have no baskets at all, show the “empty‐state” UI
  if (!activeBasket) {
    return (
      <div className={styles.responsiveContainer}>
        {/* Language Selector */}
        <div className="language"
          style={{
            margin: "10px 0",
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="div">

          
          <label
            htmlFor="lang-select"
            style={{ marginRight: 8, fontWeight: 500 }}
          >
            🌐
          </label>
          <select
            id="lang-select"
            value={language}
            onChange={handleLanguageChange}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "15px",
              minWidth: 120,
              background: "#fff",
              fontWeight: 500,
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="gu">Gujarati</option>
            <option value="rj">Rejasthani</option>
          </select>
        </div>
        </div>

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

        <p>{t("No baskets found.")}</p>
        <Btn name={t("+ Add Basket")} onClick={addNewBasket} />
      </div>
    );
  }

  // Otherwise, we have at least one basket → show the main UI
  return (
    <div className={styles.responsiveContainer}>
      {/* 1) LANGUAGE SELECTOR */}
      <div style={{ margin: "10px 0", textAlign: "right" }}>
        <label htmlFor="lang-select" style={{ marginRight: 8 }}>
          🌐
        </label>
        <select
          id="lang-select"
          value={language}
          onChange={handleLanguageChange}
          style={{ padding: "4px" }}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
          <option value="es">Español</option>
        </select>
      </div>

      {/* 2) PROFILE TAB and PROFILE MODAL */}
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

      {/* 3) BASKET LIST ON THE LEFT */}
      <div className="div" style={{ display: "flex", flexDirection: "column" }}>
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.basketList}>
          {baskets.map((b, idx) => (
            <div
              key={b.id}
              className={`${styles.basketTab} ${
                b.id === activeBasket.id ? styles.activeTab : ""
              }`}
            >
              <span onClick={() => selectBasket(b)}>
                {b.nameKey && typeof b.number === "number"
                  ? `${t(b.nameKey)} ${b.number}`
                  : b.rawName || `${t("Basket")} ${idx + 1}`}
              </span>
              <button
                className={styles.deleteBtn}
                onClick={() => removeBasket(b.id)}
              >
                🗑️
              </button>
            </div>
          ))}
          <button onClick={addNewBasket} className={styles.addBasketbtn}>
            <span className={styles.addBasketIcon}>➕ {t("Add Basket")}</span>
          </button>
        </div>
      </div>

      {/* 4) MAIN CARD FOR THE ACTIVE BASKET */}
      <div className={styles.card}>
        <h2>
          {activeBasket.nameKey && typeof activeBasket.number === "number"
            ? `${t(activeBasket.nameKey)} ${activeBasket.number}`
            : activeBasket.rawName}
        </h2>

        {(
          (!isEditing &&
            Array.isArray(activeBasket.items) &&
            activeBasket.items.length === 0) ||
          (isEditing &&
            Array.isArray(editingBasket?.items) &&
            editingBasket.items.length === 0)
        ) ? (
          <p>{t("No items in this basket.")}</p>
        ) : (
          <ul className={styles.itemList}>
            {(isEditing
              ? editingBasket.items
              : activeBasket.items
            ).map((it, i) => (
              <li key={i} className={styles.itemRow}>
                <span>
                  {/* Now translating item names by their ID key */}
                  {t(`products.${it.id}`)} — ₹{it.price} × {it.quantity}
                </span>
              </li>
            ))}
            <div className={styles.actions}>
              <Btn
                name={
                  activeBasket.id
                    ? isEditing
                      ? t("Save Changes")
                      : t("Update Basket")
                    : t("Save Basket")
                }
                onClick={() =>
                  activeBasket.id && !isEditing
                    ? (setIsEditing(true),
                      setEditingBasket({ ...activeBasket }),
                      setShowItems(true))
                    : saveOrUpdateBasket()
                }
              />
            </div>
          </ul>
        )}

        <div className={styles.timestamp} style={{ fontSize: "8px" }}>
          {activeBasket.updatedAt &&
            ` ${formatDateTime(
              activeBasket.updatedAt
            )}`}
        </div>
      </div>

      {/* 5) ITEMS PALETTE (ONLY VISIBLE WHEN isEditing=true) */}
      {showItems && (
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
