import React, { useState, useEffect, useRef } from 'react';
import styles from "./Items.module.css";
import data from "../../data.js";

const getAllTypes = (dataArr) => {
  const types = new Set();
  dataArr.forEach(item => item.type && types.add(item.type));
  return Array.from(types);
};

export default function Items({ onAddItem, basketItems = [] }) {
  const [filteredItem, setFilteredItem] = useState(data);
  const [visibleRows, setVisibleRows] = useState(3);
  const [quantities, setQuantities] = useState({});
  const [activeType, setActiveType] = useState("all");
  const itemsPerRow = 3;
  const loaderRef = useRef();
  const allTypes = ["all", ...getAllTypes(data)];

  // Initialize quantities from basketItems—but do NOT reset filteredItem here,
  // so filtering remains in place when the user clicks "Add".
  useEffect(() => {
    const initialQuantities = {};
    basketItems.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [basketItems]);

  // Infinite scroll
  useEffect(() => {
    function handleScroll() {
      if (
        loaderRef.current &&
        window.innerHeight + window.scrollY >= loaderRef.current.offsetTop
      ) {
        setVisibleRows(prev => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter items by type (called only when user clicks a type button)
  function handleTypeClick(type) {
    setActiveType(type);
    setVisibleRows(3);
    if (type === "all") {
      setFilteredItem(data);
    } else {
      setFilteredItem(data.filter(item => item.type === type));
    }
  }

  // Search within the current filter (type)
  function searchItem(event) {
    const searchValue = event.target.value.trim();
    if (searchValue === "") {
      handleTypeClick(activeType);
      return;
    }
    const filter = data.filter(item => {
      return (
        (activeType === "all" || item.type === activeType) &&
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredItem(filter);
  }

  // Change quantity locally and notify parent, without altering filteredItem
  function handleQuantityChange(item, delta) {
    setQuantities(prev => {
      const current = prev[item.id] || 0;
      const updated = current + delta;

      if (updated <= 0) {
        const newQuantities = { ...prev };
        delete newQuantities[item.id];
        onAddItem({ ...item, quantity: 0 });
        return newQuantities;
      }

      onAddItem({ ...item, quantity: updated });
      return { ...prev, [item.id]: updated };
    });
  }

  const visibleItems = filteredItem.slice(0, visibleRows * itemsPerRow);

  return (
    <div>
      {/* Type filter buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "10px 0 -50px 20px" }}>
        {allTypes.map(type => (
          <button
            key={type}
            className={activeType === type ? styles.addBtn : ""}
            style={{
              border: "1px solid #e91e63",
              background: activeType === type ? "#e91e63" : "#fff",
              color: activeType === type ? "#fff" : "#e91e63",
              borderRadius: 16,
              padding: "6px 10px",
              marginBottom: 8,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15
            }}
            onClick={() => handleTypeClick(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className={styles.search}>
        <input 
          type="search" 
          name="search" 
          placeholder="🔍 Search here..." 
          onChange={searchItem} 
        />
      </div>

      {/* Items grid */}
      <div className={styles.items}>
        {visibleItems.map(item => {
          const quantity = quantities[item.id] || 0;
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.img}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                {quantity === 0 ? (
                  <button 
                    className={styles.addBtn} 
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    Add
                  </button>
                ) : (
                  <div className={styles.qtyControl}>
                    <button 
                      style={{ padding: "3px 3px", display: "flex", alignItems: "center" }} 
                      onClick={() => handleQuantityChange(item, -1)}
                    >
                      –
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Loader for infinite scroll */}
      {visibleItems.length < filteredItem.length && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div ref={loaderRef}></div>
    </div>
  );
}
