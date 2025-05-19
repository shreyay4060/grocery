import React from 'react'
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <div>
      <button className={styles.button}  onClick={props.onClick}>{props.name}</button>
    </div>
  )
}

