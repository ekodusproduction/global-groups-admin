import React, {useState} from 'react'
import styles from "./Dropdown.module.css"
import { Link } from 'react-router-dom'

import {FaAngleRight} from "react-icons/fa"
import {BsFillBuildingsFill} from "react-icons/bs"
import {AiFillContacts} from 'react-icons/ai'
import {BsDot} from "react-icons/bs"
import { CSSTransition } from 'react-transition-group'

const Dropdown = (props) => {
   
    const [openDropdown,setOpenDropdown] = useState(false);
   
    const dropdownOpenHandler = () =>{
        if(openDropdown){
            setOpenDropdown(false)

           
        }
        else {
            setOpenDropdown(true)
            
        }
    }
  return (
   <>
   <div className={styles.dropdown_container}>
        <div className={styles.dropdown_link}>
            <button onClick={dropdownOpenHandler}>
                <p>{props.icon} {props.title}</p>
                <FaAngleRight style={{ transform: openDropdown ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </button>    
        </div>
        {openDropdown ?(
            <div className={`${styles.dropdown} ${openDropdown? styles.dropdownOpenAnimation : styles.dropdownCloseAnimation  }`}>
            {props.subMenu.map((subMenuItem,index) => (
                // {console.log(subMenuItem)}
                 <Link to={subMenuItem.subMenuLink} key={index} className={styles.dropdown_element}><BsDot size={20}/>{subMenuItem.subMenuTitle}</Link>

            ))}
            {/* <a href="#" className={styles.dropdown_element}><BsDot size={20}/> All Projects</a>
            <a href="#" className={styles.dropdown_element}><BsDot size={20}/> Add New</a> */}

        </div>
        ):''
    }
        
   </div>
   
   </>
  )
}

export default Dropdown