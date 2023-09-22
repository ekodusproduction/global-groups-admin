import React,{useEffect, useState} from 'react'
import ProjectCard from '../../components/Cards/ProjectCard'
import styles from "./ProjectList.module.css"
import axios from 'axios'

const ProjectList = () => {

  const [allProjects, setAllProjects] = useState([]);

  useEffect(()=> {
    axios.get('http://165.22.210.84/node/v1/api/project/getAllProject', {
      headers: {
        'apptoken': 'eyJhbGciOiJIUzM4NCJ9.eyJJc3N1ZXIiOiJQU1NTIiwiQXBwbGljYXRpb24iOiJJUEwtTUFSS0VULVBMQUNFIiwiaWF0IjoxNjQ4NTU2MzY0fQ.sglGgNFW6XwLJ71Bz8MpDcxgX62p2eYjGJ_0vonaoQK06_SDWy92fsonk5tG2XAz',
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log("Response", response.data?.data.result)
      setAllProjects(response.data?.data.result)
 
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])


  return (
    <div className={styles.projectList_container}>
      {allProjects?.map((projectInfo,i)=> (
      
        <ProjectCard key={i} projectInfo={projectInfo}/>
      ))}
      
    </div>
  )
}

export default ProjectList