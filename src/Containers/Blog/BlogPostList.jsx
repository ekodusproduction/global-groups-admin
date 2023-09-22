import React,{useEffect, useState, Suspense} from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import AlertDialog from '../../components/Dialog/Dialog';
import {Button} from '@mui/material';
import Swal from 'sweetalert2';
const ProjectList = () => {
  const navigate = useNavigate()
  const [pending, setPending] = useState(true)
  const [allBlogPost, setAllBlogPost] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
      omit: true
    },
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Summary',
        selector: row => row.summary,
        sortable: true,
    },
    {
      name: 'Created At',
      selector: row => row.created_at,
      sortable: true,
  },
  {
    name: 'Published',
    cell:(row) => <> {row?.is_published === 1 ? "Published" : "Not Published"}</>,
    selector: row => row.is_published,
    sortable: true,
},
  
    {
      name: 'Action',
      cell:(row) => <><FontAwesomeIcon icon={faEye} style={{cursor: 'pointer'}} onClick={()=> handleOnViewClick( row)}/>  &nbsp;&nbsp;|&nbsp;&nbsp; <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTrash} onClick={()=> handleDeleteRow( row)}/></>,
      selector: row => row.reveiw,
      sortable: true,
  },
   
  ];

  const handleOnViewClick = (row)=>{
navigate('/layout/blog', {state:{blogId: row?.id}})
  }

  const handleDeleteRow = (row)=>{
    console.log("clicked", row)
    setShowDeleteDialog(true)
    setDeleteId(row?.id)
   
      }

      const handleDeleteBlogPost = () => {
        console.log("clickeddddddddd")
        axios.delete(`http://165.22.210.84/node/v1/api/blog/deleteBlogPost/${deleteId}`, {
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
        fetchBlogList()
        }else{
          Swal.fire({
            icon: 'error',
            title: ' Deleted',
            text: 'failed to  Delete the Post',
          })
        }
       
 
    })
    .catch(function (error) {
      console.log(error);
    })  
      };
  


const fetchBlogList = ()=>{
  axios.get('http://165.22.210.84/node/v1/api/blog/getAdminBlogPostList', {
  })
  .then(function (response) {
      console.log("response", response)
    console.log("Response", response.data?.data.result)
    setAllBlogPost(response.data?.data)
    setPending(false)

  })
  .catch(function (error) {
    console.log(error);
  })
}

  useEffect(()=> {
   fetchBlogList()
  },[])


  return (
  
     <>


<Paper elevation={2}> 
  <DataTable
        title="Blog Post List"
            columns={columns}
            data={allBlogPost}
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
                <Button variant="contained"  onClick={handleDeleteBlogPost} >Agree</Button>
              </AlertDialog>
            </Suspense>
          )}
     </>
  )
}

export default ProjectList