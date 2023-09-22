import React, {useState} from 'react'
import styles from "./Layout.module.css"
import { Outlet } from 'react-router-dom'

import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

const Layout = () => {
    const [openNavbar,setOpenNavbar] = useState(true);
  return (
    <>
     <div className={styles.supercontainer}>
    <Sidebar openNavbar={openNavbar}/>
    <div className={styles.container}>
      <Navbar openNavbar={openNavbar} setOpenNavbar={setOpenNavbar}/>

      <Outlet/>
   
    
    </div>
      
    </div>
    </>
  )
}

export default Layout