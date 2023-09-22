import React , {useEffect, useState} from 'react'
import styles from "./Dashboard.module.css"
import Cards from '../../components/Cards/Cards'
import projecticon from "../../assets/icons/project.png"
import axios from 'axios'
const Dashboard = () => {
  const [ongoingCount , setOngoingCount] = useState(0)
  const [upcomingCount , setUpComingCount] = useState(0)
  const [completedCount , setCompltedCount] = useState(0)
  const [totalProjectCount , settotatProjectCount] = useState(0)
  const [enquiryCount, setEnquiryCount] = useState(0)
  const [outReachCount, setOutReachCount] = useState(0)
const ongoing = "ongoing";
const upcoming = "upcomping";
const completed = "completed";
const defaultV = "default";
  useEffect(() => {
    axios.get(`http://165.22.210.84/node/v1/project/projectCount/${ongoing}`)
      .then(response => {
       console.log(response?.data?.data?.result)
     setOngoingCount(response?.data?.data?.result?.count)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://165.22.210.84/node/v1/project/projectCount/${upcoming}`)
      .then(response => {
       console.log(response?.data?.data?.result)
     setUpComingCount(response?.data?.data?.result?.count)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://165.22.210.84/node/v1/project/projectCount/${completed}`)
      .then(response => {
       console.log(response?.data?.data?.result)
     setCompltedCount(response?.data?.data?.result?.count)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://165.22.210.84/node/v1/project/projectCount/${defaultV}`)
      .then(response => {
       console.log(response?.data?.data?.result)
     settotatProjectCount(response?.data?.data?.result?.count)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    axios.get(`http://165.22.210.84/node/v1/contact/getEnquiryCount`)
      .then(response => {
       console.log(response?.data?.data?.result)
       setEnquiryCount(response?.data?.data?.result?.count)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://165.22.210.84/node/v1/registration/getOutReachCount`)
      .then(response => {
       console.log(response?.data?.data?.result)
       setOutReachCount(response?.data?.data?.result?.count)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


 
  return (
    <div className={styles.dashboard_center_wrapper}>
       <div className={styles.dashboard_summary}>
            <Cards icon={projecticon} title="Total Projects" value={totalProjectCount}/>
            <Cards icon={projecticon} title="Ongoing Projects" value={ongoingCount}/>
            <Cards icon={projecticon} title="Upcoming Projects"value={upcomingCount}/>
            <Cards icon={projecticon} title="Completed Projects" value={completedCount}/>
            <Cards icon={projecticon} title="Overall Outreach" value={outReachCount}/>
            <Cards icon={projecticon} title="Aggregate Inquiries" value={enquiryCount}/>
       </div>
    </div>
  )
}

export default Dashboard