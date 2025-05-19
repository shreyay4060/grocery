import React, { useState, useEffect } from 'react'
import styles from "./Home.module.css";
import Button from '../Button/Button.jsx';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const carouselImages = [
  "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80"
];

export default function Home() {
  const { currentUser, logout } = useAuth(); // <-- FIXED HERE
  const navigate = useNavigate();
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx(idx => (idx + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  function prevImage() {
    setCarouselIdx(idx => (idx - 1 + carouselImages.length) % carouselImages.length);
  }
  function nextImage() {
    setCarouselIdx(idx => (idx + 1) % carouselImages.length);
  }

  return (
    <div className={styles.home}>
      <div className={styles.navbar}>
        <nav>
          <div className={styles.logo}>
            <h1>Grocery</h1>
          </div>
          {currentUser
            ? <Button name="Logout" onClick={logout} />
            : <Button name="Login" onClick={() => navigate("/login")} />
          }
        </nav>
      </div>
      <div className={styles.carousel}>
        <button className={styles.arrow} onClick={prevImage}>&lt;</button>
        <img src={carouselImages[carouselIdx]} alt="carousel" className={styles.carouselImg} />
        <button className={styles.arrow} onClick={nextImage}>&gt;</button>
      </div>
      <div className={styles.btn}>
        {currentUser && <Button name="Go to your cart" onClick={() => navigate("/cart")} />}
      </div>
    </div>
  );
}
