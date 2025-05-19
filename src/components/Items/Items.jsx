import React, { useState, useEffect, useRef } from 'react';
import styles from "./Items.module.css";
import data from "../../data.js";
import Btn from "../Btn/Btn.jsx";

export default function Items({ onAddItem, basketItems = [] }) {
  const [filteredItem, setFilteredItem] = useState(data);
  const [visibleRows, setVisibleRows] = useState(3);
  const [quantities, setQuantities] = useState({});
  const itemsPerRow = 3;
  const loaderRef = useRef();

  useEffect(() => {
    setFilteredItem(data);
    // Initialize quantities based on basketItems
    const initialQuantities = {};
    basketItems.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [basketItems]);

  useEffect(() => {
    function handleScroll() {
      if (
        loaderRef.current &&
        window.innerHeight + window.scrollY >= loaderRef.current.offsetTop
      ) {
        setVisibleRows((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function searchItem(event) {
    const searchValue = event.target.value;
    if (searchValue === "") {
      setFilteredItem(data);
      return;
    }
    const filter = data?.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredItem(filter);
  }

  function getBasketItem(item) {
    return basketItems.find((b) => b.id === item.id);
  }

  function handleQuantityChange(item, delta) {
    setQuantities(prev => {
      const current = prev[item.id] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        const newQuantities = { ...prev };
        delete newQuantities[item.id];
        return newQuantities;
      }
      return { ...prev, [item.id]: updated };
    });
    onAddItem({ ...item, quantity: (quantities[item.id] || 0) + delta });
  }

  const visibleItems = filteredItem.slice(0, visibleRows * itemsPerRow);

  return (
    <div>
      <div className={styles.search}>
        <input type="search" name="search" placeholder='Search here...' onChange={searchItem} />
      </div>
      <div className={styles.items}>
        {visibleItems.map((item) => {
          const quantity = quantities[item.id] || 0;
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.img}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>Price : {item.price}</p>
                {quantity === 0 ? (
                  <button className={styles.addBtn} onClick={() => handleQuantityChange(item, 1)}>Add</button>
                ) : (
                  <div className={styles.qtyControl}>
                    <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div ref={loaderRef}></div>
    </div>
  );
}