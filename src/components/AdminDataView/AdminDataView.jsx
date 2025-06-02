import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import styles from "./AdminDataView.module.css";

import { useTranslation } from "react-i18next";

export default function AdminDataView({ onClose }) {

     const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErr("");
      try {
        // Fetch users
        const usersSnap = await getDocs(collection(db, "users"));
        const usersList = usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);

        // Fetch baskets
        const basketsSnap = await getDocs(collection(db, "baskets"));
        const basketsList = basketsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBaskets(basketsList);
      } catch (e) {
        setErr("Failed to fetch data: " + e.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Helper: get baskets for a user
  function getUserBaskets(userId) {
    return baskets.filter(basket => basket.userId === userId);
  }

  // Helper: get user email by userId
  function getUserEmail(userId) {
    const user = users.find(u => u.id === userId);
    return user ? user.email : "";
  }

 return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h2>{t("All Users & Their Baskets")}</h2>
        {loading && <div>{t("Loading...")}</div>}
        {err && <div style={{ color: "red" }}>{err}</div>}
        <div className={styles.section}>
          {users.map((user, idx) => (
            <div key={user.id} className={styles.userCard}>
              <strong>{t("User")} {idx + 1}</strong>
              <div>{t("Name:")} {user.displayName || user.email}</div>
              <div>{t("Email:")} {user.email}</div>
              <div>{t("UID:")} {user.uid}</div>
              <div>{t("Birthdate:")} {user.birthdate || "-"}</div>
              <div style={{ marginTop: 8, fontWeight: "bold" }}>{t("Baskets:")}</div>
              {getUserBaskets(user.id).length === 0 && (
                <div style={{ color: "#888" }}>{t("No baskets.")}</div>
              )}
              {getUserBaskets(user.id).map((basket, bidx) => (
                <div key={basket.id} className={styles.basketCard} style={{ marginTop: 8 }}>
                  <strong>{basket.name}</strong>
                  <div>{t("Basket ID:")} {basket.id}</div>
                  <div>{t("User Email:")} {getUserEmail(basket.userId)}</div>
                  <div>{t("Items:")}</div>
                  <ul>
                    {(basket.items || []).map((item, i) => (
                      <li key={i}>
                        {item.name} (x{item.quantity}) - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}