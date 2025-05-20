import React, { useState, useEffect } from 'react'
import styles from "./Home.module.css";
import Button from '../Button/Button.jsx';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const carouselImages = [
  "https://th.bing.com/th/id/OIP.tX2d_nhdBNijw-biOB9vCwHaE8?rs=1&pid=ImgDetMain",
  "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80",
  "https://th.bing.com/th/id/OIP.dUXVgvue3Tl2dv63UC3EaQHaDL?rs=1&pid=ImgDetMain",
  // "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=600&q=80",
  
  "https://th.bing.com/th/id/OIP.oSwfgN08ONsQG06xJba-LAHaFj?w=1307&h=979&rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.0c4W4MOYsqob4FLDhwQaAgHaD4?w=517&h=271&rs=1&pid=ImgDetMain"
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
            <img src="./images/logo.jpg" height="60px" alt="" />
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
