// src/components/Items/Items.jsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./Items.module.css";
import data from "../../data.js";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const getAllTypes = (dataArr) => {
  const types = new Set();
  dataArr.forEach((item) => {
    if (item.type) types.add(item.type);
  });
  return Array.from(types);
};

export default function Items({ onAddItem, basketItems = [] }) {
  const { t } = useTranslation();

  // All raw types (e.g. "biscuits", "chocolate", etc.)
  const rawTypes = getAllTypes(data);
  // Include "all" at the front
  const allTypes = ["all", ...rawTypes];

  const [filteredItem, setFilteredItem] = useState(data);
  const [visibleRows, setVisibleRows] = useState(4);
  const [quantities, setQuantities] = useState({});
  const [activeType, setActiveType] = useState("all");
  const [language, setLanguage] = useState(i18n.language || "en");

  const itemsPerRow = 3;
  const loaderRef = useRef();

  // When basketItems changes, sync quantities
  useEffect(() => {
    const initialQuantities = {};
    basketItems.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [basketItems]);

  // Infinite scroll effect
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

  // Filter items by type
  function handleTypeClick(type) {
    setActiveType(type);
    setVisibleRows(3);
    if (type === "all") {
      setFilteredItem(data);
    } else {
      setFilteredItem(data.filter((item) => item.type === type));
    }
  }

  // Search within current filter
  function searchItem(event) {
    const searchValue = event.target.value.trim().toLowerCase();
    if (searchValue === "") {
      handleTypeClick(activeType);
      return;
    }
    const filtered = data.filter((item) => {
      return (
        (activeType === "all" || item.type === activeType) &&
        item.name.toLowerCase().includes(searchValue)
      );
    });
    setFilteredItem(filtered);
  }

  // Add or remove quantity
  function handleQuantityChange(item, delta) {
    setQuantities((prev) => {
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

  // Compute visible items based on infinite scroll
  const visibleItems = filteredItem.slice(0, visibleRows * itemsPerRow);

  // Change language handler
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <div>
      <br /><br />
      <div className={styles.type}
       
      >
        {allTypes.map((type) => {
          // Derive a translation key for the button label
          const labelKey =
            type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1);
          return (
            <button
              key={type}
              className={activeType === type ? styles.addBtn : ""}
              style={{
                border: "1px solid #e91e63",
                background: activeType === type ? "#e91e63" : "#fff",
                color: activeType === type ? "#fff" : "#e91e63",
                borderRadius: 5,
                padding: "6px 15px",
                marginBottom: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 15,
                // marginLeft:30,
                margin:"auto"
              }}
              onClick={() => handleTypeClick(type)}
            >
              {t(labelKey)}
            </button>
          );
        })}
      </div>

      {/* SEARCH BAR */}
      <div className={styles.search}>
        <input
          type="search"
          name="search"
          placeholder={t("🔍 Search here...")}
          onChange={searchItem}
        />
      </div>

      {/* ITEMS GRID */}
      <div className={styles.items}>
        {visibleItems.map((item) => {
          const quantity = quantities[item.id] || 0;
          return (
            <div className={styles.item} key={item.id}>
              <div className={styles.img}>
                <img src={item.image} alt={item.name} height="60px" />
              </div>
              <div className={styles.info}>
                <h3>{t(`products.${item.id}`)}</h3>
                <p>₹ {item.price}</p>
                {quantity === 0 ? (
                  <button
                    className={styles.addBtn}
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    {t("Add")}
                  </button>
                ) : (
                  <div className={styles.qtyControl}>
                    <button
                      style={{
                        padding: "3px 3px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => handleQuantityChange(item, -1)}
                    >
                      –
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(item, 1)}>
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LOADER FOR INFINITE SCROLL */}
      {visibleItems.length < filteredItem.length && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <div ref={loaderRef}></div>
    </div>
  );
}
