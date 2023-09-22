import React,{useState,useEffect} from 'react'
import styles from './EnquiryList.module.css'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import dayjs  from "dayjs";
import { Paper } from '@mui/material';
const EnquiryList = () => {
    const [pending, setPending] = useState(true)
    const [enquiryData,setEnquiryData] = useState([]);
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
        },
        {
            name: 'PhoneNumber',
            selector: row => row.phone_number,
            sortable: true,
        },
        {
            name: 'Project',
            selector: row => row.project_name,
            sortable: true,
        },
      
        {
            name: 'Received Date',
            selector: row => row.created_at,
            sortable: true,
        },
    ];

    useEffect(() => {
        axios.get('http://165.22.210.84/node/v1/registration/getEnquiryList')
          .then(response => {
           console.log(response?.data?.data?.result)
           setEnquiryData(response?.data?.data?.result)
           setPending(false)
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

      const formatDate = (date) => {
        return dayjs(date).format("MM/DD/YYYY");
      };
   
    const data = enquiryData.map(item => ({
        id: item?.id,
        name: item?.name,
        email: item?.email,
        message: item?.message,
        phone_number: item?.phone_number,
        project_name: item?.project_name,
        created_at: formatDate(item?.created_at)
      }));
  return (
    <>
   
    <div  className={styles.enquiryList}>
        <Paper elevation={2}>   <DataTable
        title="Enquiry List"
            columns={columns}
            data={data}
            wrap={true}
            sortable= {true}
            pagination
            progressPending={pending}
            persistTableHead
                
        /></Paper>
 
    </div>
    </>
  )
}

export default EnquiryList