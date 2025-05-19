import React, { useState, useEffect, useRef } from 'react';
import styles from "./Items.module.css";
import data from "../../data.js";
import Btn from "../Btn/Btn.jsx";

export default function Items({ onAddItem, basketItems = [] }) {
  const [filteredItem, setFilteredItem] = useState(data);
  const [visibleRows, setVisibleRows] = useState(3);
  const itemsPerRow = 3;
  const loaderRef = useRef();

  useEffect(() => {
    setFilteredItem(data);
  }, []);

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

  
  const visibleItems = filteredItem.slice(0, visibleRows * itemsPerRow);

  return (
    <div>
      <div className={styles.search}>
        <input type="search" name="search" placeholder='Search here...' onChange={searchItem} />
      </div>
      <div className={styles.items}>
        {visibleItems.map((item) => {
          const basketItem = getBasketItem(item);
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.img}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.info}>
                <h3>{item.name}</h3>
                <p>Price : {item.price}</p>
                {!basketItem ? (
                  <button className={styles.addBtn} onClick={() => onAddItem(item)}>Add</button>
                ) : (
                  <div className={styles.qtyControl}>
                    <span>{basketItem.quantity}</span>
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
