import React,{useEffect,useState} from 'react'
import styles from "./Sidebar.module.css"
import logo from "../../assets/icons/globalgroupsne_logo.png"
import Dropdown from '../Dropdown/Dropdown'
import {BsFillBuildingFill} from "react-icons/bs"
import {BiSolidContact} from "react-icons/bi"
import {RxDashboard} from 'react-icons/rx'
import {RiMessage2Fill} from 'react-icons/ri'
import {RiGalleryFill} from 'react-icons/ri'
import {MdOutlineRateReview} from 'react-icons/md'
import { Link } from 'react-router-dom'

const Sidebar = ({openNavbar}) => {
 


  const Menu = [
    {
      id: 1,
      title: "Projects",
      icon: <BsFillBuildingFill/>,
      subMenu: [
        {
          id_: 1,
          subMenuTitle: "Our Projects",
          subMenuLink: "projectlist"
        },
        // {
        //   id_: 2,
        //   subMenuTitle: "Completed Projects",
        //   subMenuLink: "projectlist"
        // },
        // {
        //   id_: 3,
        //   subMenuTitle: "Ongoing Projects",
        //   subMenuLink: "projectlist"
        // },
        // {
        //   id_: 4,
        //   subMenuTitle: "Upcoming Projects",
        //   subMenuLink: "projectlist"
        // },
        {
          id_: 5,
          subMenuTitle: "Add New Project",
          subMenuLink: "newproject"
        },
        {
          id_: 6,
          subMenuTitle: "Create Amenity",
          subMenuLink: "createamenity"
        },
        {
          id_: 6,
          subMenuTitle: "Manage Amenity",
          subMenuLink: "addamenity"
        },
        {
          id_: 7,
          subMenuTitle: "Add Highlights",
          subMenuLink: "addhighlight"
        },
      ]
    },
    {
      id: 2,
      title: "Contact",
      icon: <BiSolidContact/>,
      subMenu: [
        {
          id_: 1,
          subMenuTitle: "Contact List",
          subMenuLink: "contactlist"
        },
        
      ]
    },
    {
      id: 3,
      title: "Enquiry",
      icon: <RiMessage2Fill/>,
      subMenu: [
        {
          id_: 1,
          subMenuTitle: "Enquiry List",
          subMenuLink: "enquirylist"
        },
        
      ]
    },
    {
      id: 4,
      title: "Gallery",
      icon: <RiGalleryFill/>,
      subMenu: [
        {
          id_: 1,
          subMenuTitle: "Add Gallery",
          subMenuLink: "addgallery"
        },
        {
          id_: 2,
          subMenuTitle: "Manage Gallery",
          subMenuLink: "viewgallery"
        },
        
      ]
    },
    {
      id: 5,
      title: "Testimonials",
      icon: <MdOutlineRateReview/>,
      subMenu: [
        {
          id_: 1,
          subMenuTitle: "Add Testimonial",
          subMenuLink: "addtestimonial"
        },
        {
          id_: 2,
          subMenuTitle: "Manage Testimonials",
          subMenuLink: "managetestimonial"
        },
        
      ]
    },


    {
      id: 6,
      title: "Blog",
      icon: <MdOutlineRateReview/>,
      subMenu: [
        {
          id_: 1,
          subMenuTitle: "Add Blog",
          subMenuLink: "blog"
        },
        {
          id_: 2,
          subMenuTitle: "Manage Blogs",
          subMenuLink: "viewblog"
        },
        
      ]
    },
    // {
    //   id: 6,
    //   title: "Banner",
    //   icon: <MdOutlineRateReview/>,
    //   subMenu: [
    //     {
    //       id_: 1,
    //       subMenuTitle: "Add Banner",
    //       subMenuLink: "addbanner"
    //     },
    //     {
    //       id_: 2,
    //       subMenuTitle: "Manage Banner",
    //       subMenuLink: "managebanner"
    //     },
        
    //   ]
    // },
  ]
  return (
    <>
    {openNavbar? (<div className={styles.sidebar}>
      <div className={styles.sidebarlogo}>
          <img src={logo} alt="" />
      </div>
      <div className={styles.sidebar_nav}>
          <Link to="/layout" className={styles.sidebar_link}><RxDashboard/> Dashboard</Link>
          {Menu.map((menuItem)=>(
 
            <Dropdown title={menuItem.title} key={menuItem.id} icon={menuItem.icon} subMenu={menuItem.subMenu}  />

          ))}
          {/* <Dropdown title="Projects" icon={<BsFillBuildingFill/>} />
          <Dropdown title="Contact" icon={<BiSolidContact/>} />
          <Dropdown title="Enquiry" icon={<BiSolidContact/>} /> */}
          
      </div>
  </div>): ''}
  </>
    
  )
}

export default Sidebar