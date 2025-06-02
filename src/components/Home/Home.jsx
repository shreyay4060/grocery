// src/components/Home/Home.jsx
import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Button from "../Button/Button.jsx";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDataView from "../AdminDataView/AdminDataView";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
// ─── 1. Fill this array with your actual image URLs/paths ───
// If you put images in public/images/, you can reference them as "/images/slideX.jpg"
const carouselImages = [
  "https://cdn.pixabay.com/photo/2022/08/01/07/59/vegetables-7357585_1280.png",
  "https://st.depositphotos.com/1063437/2769/i/450/depositphotos_27699157-stock-photo-green-shopping-bag-with-grocery.jpg",
  "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8Z3JvY2VyeSUyMHN0b3JlfHwwfHx8fDE2MTk4MDIxNzg&ixlib=rb-1.2.1&q=80&w=1080",
  "https://static.vecteezy.com/system/resources/previews/012/805/331/large_2x/fresh-fruits-and-vegetables-in-reusable-green-shopping-bag-on-wood-table-top-with-supermarket-grocery-store-blurred-defocused-background-with-bokeh-light-photo.jpg",
  "https://cdn.pixabay.com/photo/2017/03/05/20/08/grocery-store-2119701_1280.jpg",
  "https://static.vecteezy.com/system/resources/previews/023/489/783/non_2x/vegetable-farmer-market-counter-colorful-various-fresh-organic-healthy-vegetables-at-grocery-store-healthy-natural-food-concept-generative-ai-photo.jpg"

  // …add as many as you like, or import from assets if you prefer:
  // import slide4 from "../../assets/slide4.jpg";
  // then use: slide4,
];

export default function Home() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [carouselIdx, setCarouselIdx] = useState(0);

 
  const [showAdmin, setShowAdmin] = useState(false);

  // ─── 2. Auto-rotate logic with a guard for empty array ──────
  useEffect(() => {
    if (carouselImages.length === 0) return;

    const interval = setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % carouselImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ─── Handlers to move backward/forward ──────────────────────
  function prevImage() {
    if (carouselImages.length === 0) return;
    setCarouselIdx((idx) => (idx - 1 + carouselImages.length) % carouselImages.length);
  }

  function nextImage() {
    if (carouselImages.length === 0) return;
    setCarouselIdx((idx) => (idx + 1) % carouselImages.length);
  }

  return (
    <div className={styles.home}>
    
      <div className={styles.navbar}>
        <nav>
          <div className={styles.logo}>
            <h2>Grocery Cart</h2>
            {/* Put your logo file in public/images/logo.jpg, or adjust path */}
            {/* <img src="/images/img.png" height="60" alt="Logo" /> */}
          </div>
          {currentUser ? (
            <Button name="Logout" onClick={logout} />
          ) : (
            <Button name="Login" onClick={() => navigate("/login")} />
          )}
        </nav>
      </div>

  
      <div className={styles.carousel}>
        {carouselImages.length > 0 ? (
          <>
            <button className={styles.arrow} onClick={prevImage}>
              &lt;
            </button>

            <img
              src={carouselImages[carouselIdx]}
              alt={`Slide ${carouselIdx + 1}`}
              className={styles.carouselImg}
            />

            <button className={styles.arrow} onClick={nextImage}>
              &gt;
            </button>
          </>
        ) : (
          <p className={styles.noImages}>No images to display.</p>
        )}
      </div>
<br />
      <div className={styles.btnRow}>
        {currentUser && (
          <Button name="Go to your cart" onClick={() => navigate("/cart")} />
        )}
        <br />
        <br />
        <Button name="Show Database Data" onClick={() => setShowAdmin(true)} />
      </div>

      {/* ─── Admin Data View Modal ─────────────────────────────── */}
      {showAdmin && <AdminDataView onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
