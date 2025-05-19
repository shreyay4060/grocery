import React, { useState, useEffect } from 'react';
import styles from "./Cart.module.css";
import Items from '../Items/Items';
import Btn from '../Btn/Btn';
import { db } from "../../firebase";
import {
  collection, addDoc, getDocs,
  deleteDoc, doc, query, where,
  updateDoc
} from "firebase/firestore";
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

export default function Cart() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [baskets, setBaskets] = useState([]);
  const [activeBasket, setActiveBasket] = useState(null);
  const [showItems, setShowItems] = useState(false);
  const [itemsKey, setItemsKey] = useState(0);
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    if (!currentUser) { navigate("/login"); return; }
    (async () => {
      const q = query(collection(db, "baskets"), where("userId", "==", currentUser.uid));
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setBaskets(list);
      if (list.length && !activeBasket) setActiveBasket(list[0]);
    })();
    
  }, [currentUser]);

 
  const addNewBasket = () => {
    const name = `Basket ${baskets.length + 1}`;
    const now = new Date();
    setActiveBasket({ name, items: [], userId: currentUser.uid, updatedAt: now });
    setShowItems(true);
    setItemsKey(k => k + 1);
    setIsEditing(false);
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
  };

  
  const removeBasket = async (basketId) => {
    await deleteDoc(doc(db, "baskets", basketId));
    const filtered = baskets.filter(b => b.id !== basketId);
    setBaskets(filtered);
    if (activeBasket?.id === basketId) setActiveBasket(filtered[0] || null);
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
    <div className="container">
      <p>No baskets found.</p>
      <Btn name="+ Add Basket" onClick={addNewBasket} />
    </div>
  );

  return (
    <div className="container">
      {success && <div className={styles.success}>{success}</div>}

      
      <div className={styles.basketList}>
        {baskets.map((b, idx) => (
          <div key={b.id} className={`${styles.basketTab} ${b.id === activeBasket.id ? styles.activeTab : ''}`}>            
            <span onClick={() => selectBasket(b)}>{b.name || `Basket ${idx + 1}`}</span>
            <button className={styles.deleteBtn} onClick={() => removeBasket(b.id)}>🗑️</button>
          </div>
        ))}
        <Btn name="+ Add Basket" onClick={addNewBasket} />
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
                <div>
                  <button onClick={() => updateQuantity(i, -1)}>-</button>
                  <button onClick={() => updateQuantity(i, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.timestamp} style={{ textAlign: "right", fontSize: "12px", color: "#888", marginTop: 8 }}>
          {activeBasket.updatedAt && `Last updated: ${formatDateTime(activeBasket.updatedAt)}`}
        </div>
      </div>

      
      <div className={styles.actions}>
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
      </div>


      {showItems && <Items key={itemsKey} onAddItem={addItem} basketItems={activeBasket.items} />}
    </div>
  );
}
