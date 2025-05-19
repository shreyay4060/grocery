import React from 'react'
import styles from "./Btn.module.css"

export default function Btn(props) {
  return (
    <div>
        <button onClick={props.onClick} >{props.name}</button>
      
    </div>
  )
}
