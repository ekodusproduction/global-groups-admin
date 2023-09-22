import React,{useState,useEffect, useMemo} from 'react'
import styles from "./ContactList.module.css"
import DataTable from 'react-data-table-component';
import axios from 'axios';
import dayjs  from "dayjs";
import {  Paper } from '@mui/material';
const ContactList = () => {
  const [pending, setPending] = useState(true)
  const [ tableData, setTableData] = useState([])
    const [contactData,setContactData] = useState([]);
  
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
            name: 'Phone Number',
            selector: row => row.phonenumber,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
        },
        {
          name: 'Recieved Date',
          selector: row => row.created_at,
          sortable: true,
      },
    ];
   


    useEffect(() => {
        axios.get('http://165.22.210.84/node/v1/api/contact/getContactList')
          .then(response => {
           console.log(response?.data?.data?.result)
           setContactData(response?.data?.data?.result)
           setPending(false)
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

      const formatDate = (date) => {
        return dayjs(date).format("MM/DD/YYYY");
      };
      const data = contactData.map(item => ({
        id: item?.id,
        name: item?.name,
        email: item?.email,
        phonenumber: item?.phonenumber,
        message: item?.message,
        created_at: formatDate(item?.created_at)
      }));
    
  return (
    <>
    
    <div  className={styles.contactList}>





  <Paper elevation={2}>
  <DataTable
  title="Contact List"
            columns={columns}
            data={data}
            wrap={true}
            sortable= {true}
            pagination
            progressPending={pending}
          
           
        />
  </Paper>
    
    </div>
    </>
  )
}

export default ContactList