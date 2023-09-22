import React,{useState} from 'react'
import { Switch } from '@mui/material'
import {Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser';
const BlogCard = ({blogDetails}) => {
    const [isChecked, setIsChecked] = useState(blogDetails.isActive);
    const navigate = useNavigate()

    const editBlogHandler = () => {
        navigate('/layout/blog',{state:{blogId: blogDetails?.id}})
    }
    const blogShowHandler = (e) => {
      
        setIsChecked(prev=>!prev)
      
        if(isChecked){
            axios.delete(`http://165.22.210.84/node/v1/blog/deleteBlogPost`,
            {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            data: {
              isActive:false,
              blogId: blogDetails?.id
            }
          }).then(response => {
            console.log(response);
          });

        }
        else{
            axios.delete(`http://165.22.210.84/node/v1/blog/deleteBlogPost`, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            data: {
                isActive:false,
                blogId: blogDetails?.id
              }
          }).then(response => {
            console.log(response);
          });
        }

        
    }

  
  return (
    <>

    <div className="card" style={{"width": "18rem"}}>
    <img src={`http://localhost:3000/uploads/${blogDetails?.image_name}`} alt="projectcard_image" />
  <div className="card-body">
    <h5 className="card-title">{blogDetails?.title}</h5>
    <p className="card-text">{parse(blogDetails?.summary)}</p>
    <Switch onChange={blogShowHandler} checked={isChecked}  />
    <Button variant="outlined" onClick={editBlogHandler}>Edit</Button>
  </div>
</div>
    </>
  )
}

export default BlogCard