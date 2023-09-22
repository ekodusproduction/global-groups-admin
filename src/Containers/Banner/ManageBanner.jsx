import React from 'react'
import styles from "./ManageBanner.module.css"
import { Button } from '@mui/material'

const ManageBanner = () => {
  return (
    <div className={styles.manageBanner_container}>
      <h2>Manage Banner</h2>
      <div className={styles.manageBanner_cards}>
        <div className={styles.manageBanner_card}>
          <div className={styles.manageBanner_card_img}>
            <img src="" alt="" />
          </div>
          <div className={styles.manageBanner_card_body}>
            <p>Subheading</p>
            <h3>Main Heading</h3>
            <Button variant="outlined">Edit</Button>

          </div>
        </div>
        <div className={styles.manageBanner_card}>
          <div className={styles.manageBanner_card_img}>
            <img src="" alt="" />
          </div>
          <div className={styles.manageBanner_card_body}>
            <p>Subheading</p>
            <h3>Main Heading</h3>
            <Button variant="outlined">Edit</Button>

          </div>
        </div>
        <div className={styles.manageBanner_card}>
          <div className={styles.manageBanner_card_img}>
            <img src="" alt="" />
          </div>
          <div className={styles.manageBanner_card_body}>
            <p>Subheading</p>
            <h3>Main Heading</h3>
            <Button variant="outlined">Edit</Button>

          </div>
        </div>
        <div className={styles.manageBanner_card}>
          <div className={styles.manageBanner_card_img}>
            <img src="" alt="" />
          </div>
          <div className={styles.manageBanner_card_body}>
            <p>Subheading</p>
            <h3>Main Heading</h3>
            <Button variant="outlined">Edit</Button>

          </div>
        </div>
        <div className={styles.manageBanner_card}>
          <div className={styles.manageBanner_card_img}>
            <img src="" alt="" />
          </div>
          <div className={styles.manageBanner_card_body}>
            <p>Subheading</p>
            <h3>Main Heading</h3>
            <Button variant="outlined">Edit</Button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageBanner