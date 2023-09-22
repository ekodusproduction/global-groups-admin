import React, {useState, useEffect, Suspense} from 'react'
import axios from 'axios'
import {Paper, Button} from '@mui/material'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../../components/Dialog/Dialog';
const ManageTestimonial = () => {
  const navigate = useNavigate()
const [pending, setPending] = useState(true)
const [testimony, setTestimony] = useState([])
const [deleteId, setDeleteId] = useState("")
const [showDeleteDialog, setShowDeleteDialog] = useState(false)
const columns = [
  {
    name: 'Id',
    selector: row => row.id,
    sortable: true,
    omit: true
  },
  {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
  },
  {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
  },
  {
      name: 'Review',
      selector: row => row.review,
      sortable: true,
  },
  {
    name: 'Action',
    cell:(row) => < ><FontAwesomeIcon style={{cursor: 'pointer'}} icon={faEye} onClick={()=> handleOnViewClick( row)}/>  &nbsp;&nbsp;|&nbsp;&nbsp; <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTrash} onClick={()=> handleDeleteRow(row)}/></>,
    selector: row => row.reveiw,
    sortable: true,
},
 
];

const handleOnViewClick = (row) =>{
navigate('/layout/addtestimonial',{state:{row: row}})
}
  useEffect(() => {
   fetchTestimonialList()
  }, []);

const fetchTestimonialList = ()=>{
  axios.get('http://165.22.210.84/node/v1/testimony/getTestimonyList')
  .then(response => {
   console.log(response?.data?.data?.result)
   setTestimony(response?.data?.data?.result)
   setPending(false)
  })
  .catch(error => {
    console.error(error);
  })
}


  const handleDeleteRow = (row)=>{
    console.log("clicked", row?.id)
    setShowDeleteDialog(true)
    setDeleteId(parseInt(row?.id))
   
      }

      const handleDelete = () => {
        console.log("delteId", deleteId)
       
        axios.delete(`http://165.22.210.84/node/v1/testimony/deleteTestimony/${deleteId}`, {
    })
    .then(function (response) {
        console.log("response", response)
        if(response?.status === 200){
          setDeleteId("")
          setShowDeleteDialog(false)
          Swal.fire({
            icon: 'success',
            title: ' Deleted',
            text: response?.data?.data?.message,
          })
       fetchTestimonialList()
        }else{
          setShowDeleteDialog(false)
          Swal.fire({
            icon: 'error',
            title: ' Deleted',
            text: 'failed to  Delete the Testimonial',
          })
        }
       
 
    })
    .catch(function (error) {
      setShowDeleteDialog(false)
      console.log(error);
    })  
      };
  
  return (
    <div className='container'>
    <div className='row d-flex justify-content-evenly'>
  


<Paper elevation={2}> 
  <DataTable
        title="Testimony List"
            columns={columns}
            data={testimony}
            wrap={true}
            sortable= {true}
            pagination
            progressPending={pending}
            persistTableHead
                
        /></Paper>

{showDeleteDialog && (
            <Suspense>
              <AlertDialog
                open={showDeleteDialog}
                handleClose={()=>{
                  setDeleteId("");
                  setShowDeleteDialog(false);
                }}
                description="You are about to delete one record, this procedure is irreversible.
Do you want to proceed?"
              >
                <Button
                
                  onClick={() => {
                    setDeleteId("");
                    setShowDeleteDialog(false);
                  }}
                >Disagree</Button>
                <Button variant="contained"  onClick={handleDelete} >Agree</Button>
              </AlertDialog>
            </Suspense>
          )}
    </div>
    </div>
  )
}

export default ManageTestimonial