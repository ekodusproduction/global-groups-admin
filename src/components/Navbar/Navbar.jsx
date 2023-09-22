import React, {useState, useEffect} from 'react'
import styles from "./Navbar.module.css"
import {RiMenu2Fill} from "react-icons/ri"
import { Navigate, useNavigate } from 'react-router-dom'
import profileicon from "../../assets/icons/profile.png"

const Navbar = (props) => {
  // const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const navigate = useNavigate()
  const [overlay,setOverlay] = useState(false);

  const navbarHandler = () => {
    if(props.openNavbar){
      props.setOpenNavbar(false)
      setOverlay(false)
    }
    else{
      props.setOpenNavbar(true);
      setOverlay(true)

    }
  }

//   function getCurrentDimension(){
//     return {
//       width: window.innerWidth
//     }    
// }

useEffect(() => {
  let screenSize = window.innerWidth;
  const updateDimension = () => {

    if(screenSize<=992){
      props.setOpenNavbar(false)
    }
    else{
      props.setOpenNavbar(true)
    }
  }
  updateDimension();

}, []);



const overlayClickHandler = () => {
  props.setOpenNavbar(false);
  setOverlay(false)
}
const logoutHandler = () => {
  localStorage.removeItem('token'); // Remove token from localStorage
  navigate('/'); // Navigate to the login page
}



  return (
    <div className={styles.navbar}>
      {overlay? (<div className={styles.overlay} onClick={overlayClickHandler}></div>) : ''}
     
        <div className={styles.navbar_left}>
          <button className={styles.navbar_menu} onClick={navbarHandler}><RiMenu2Fill/></button>
        <p>Hi, Admin</p>
        </div>
        <div className={styles.navbar_right}>
        <button onClick={logoutHandler}>Logout</button>
        <img src={profileicon} className={styles.navbar_profile}></img>
        </div>
       
    </div>
  )
}

export default Navbar