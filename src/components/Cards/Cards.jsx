import React, {useState} from 'react'
import styles from "./Cards.module.css"
import {BsThreeDotsVertical} from "react-icons/bs"

const Cards = (props) => {
    const [openCard,setOpenCard] = useState(false)
    const cardSourceHandler = () => {
        if(openCard){
            setOpenCard(false)
        }
        else{
            setOpenCard(true)
        }

    }
  
  return (
    <div className={styles.card}>
        <div className={styles.project_card_header}>
            <img src={props.icon} alt="" />
            <div className={styles.card_source}>
               
                
            </div>
        </div>
        <div className={styles.project_card_body}>
            <h4>{props.title}</h4>
            <p>{props.value}</p>
        </div>
    </div>
  )
}

export default Cards