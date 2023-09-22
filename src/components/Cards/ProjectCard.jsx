import React,{useState} from 'react'
import styles from "./ProjectCard.module.css"
import { Switch } from '@mui/material'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const ProjectCard = ({projectInfo}) => {
    const [isChecked, setIsChecked] = useState(projectInfo.isActiveFlag);
    const navigate = useNavigate()

    const editProjectHandler = () => {
        navigate('/layout/newproject',{state:{project_id: projectInfo?.project_id}})
    }
    const projectShowHandler = (e) => {
      
        setIsChecked(prev=>!prev)
      
        if(isChecked){
            axios.delete(`http://127.0.0.1:3000/v1/api/project/deleteProject`,
            {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            data: {
              isActive:false,
              projectId: projectInfo?.project_id
            }
          }).then(response => {
            console.log(response);
          });

        }
        else{
            axios.delete(`http://127.0.0.1:3000/v1/api/project/deleteProject`, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            data: {
              isActive:true,
              projectId: projectInfo?.project_id
            }
          }).then(response => {
            console.log(response);
          });
        }

        
    }

  
  return (
    <div className={styles.projectcard}>
        <div className={styles.projectcard_img}>
            <img src={`http://localhost:3000/uploads/${projectInfo?.projectimage}`} alt="projectcard_image" />
        </div>
        <div className={styles.projectcard_body}>
            <div className={styles.projectcard_body_headinfo}>
                <p><strong>{projectInfo.status}</strong></p>
                <Switch onChange={projectShowHandler} checked={isChecked}  />
            </div>
            <div className={styles.projectcard_body_main}>
                <h3>{projectInfo.projectName}</h3>
            </div>
            <div className={styles.projectcard_body_btn}>
                <Button variant="outlined" onClick={editProjectHandler}>Edit</Button>
            </div>
        </div>

    </div>
  )
}

export default ProjectCard