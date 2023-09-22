import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import styles from './Blog.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { TextField, Button } from '@mui/material'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";
import DOMPurify from 'dompurify';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize,FilePondPluginFileEncode)
function Blog() {
  const {state} = useLocation()
 
  const [files, setFiles] = useState([]);
const [formData, setFormData] = useState({
  title: "", summary: "", description: "" ,isPublished: "", blogImage: null, 
})


  const custom_config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        
        'undo',
        'redo'
      ]
    },
    table: {
      contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,      
    });
  };
  const  handleSubmit = () =>{
    if(state !== null){
    
      formData['description'] = JSON.stringify(formData?.description.trim())
      console.log("Data", formData)
      let data = {...formData, postId: state?.blogId}
      axios.post("http://165.22.210.84/node/v1/api//blog/updateBlogPost", {...data}, {
        headers: {
          'Content-type': 'multipart/form-data',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response)=>{
        console.log("response", response)
        if(response?.data?.status === 200){
          setFormData({
            title: "", summary: "", description: "" ,isPublished: "", blogImage: null,
          })
          Swal.fire({
            icon: 'success',
            title: 'Submission Successfully',
            text: 'Blog Updated Successfully',
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: response?.data?.data?.message,
          })
        }
        
      }        
      )
      .catch((err) => console.log(err));
    }
  formData['description'] = formData?.description.replace(/\/+$/, '')
    console.log("Data", formData)
    axios.post("http://165.22.210.84/node/v1/api/blog/addBlogPost", {...formData}, {
        headers: {
          'Content-type': 'multipart/form-data',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response)=>{
        console.log("response", response)
        if(response?.data?.status === 200){
          setFormData({
            title: "", summary: "", description: "" ,isPublished: "", blogImage: null,
          })
          Swal.fire({
            icon: 'success',
            title: 'Submission Successfully',
            text: 'Blog Added Successfully',
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: response?.data?.data?.message,
          })
        }
      }        
      )
      .catch((err) => console.log(err));
  }

  const handleImage = (err, item) =>{
    if(err) {
      console.warn(err); return;
    }
      setFormData({
        ...formData,
        blogImage:item.source
      })
    
  }


  useEffect(()=>{
    if (state !== null && state?.blogId) {
      axios.get(`http://165.22.210.84/node/v1/api/blog/getBlogPostById/${state?.blogId}`,{
   } )
      .then(function (response) {
       console.log("response", response?.data?.data?.result[0])
       console.log( response?.data?.data?.result[0]?.description.replace(/^"|"$/g, ''))
       setFormData(response?.data?.data?.result[0]);
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Something went wrong!",
        })
      });
  }
  }, [])


  useEffect(()=>{
    if (formData?.blogImage && files.length === 0) {
      const blogImage = { 
        source:  `http://localhost:3000/uploads/${formData?.blogImage}`,
        location: {
         type: "local"
        }
     };
      setFiles([blogImage]);
    }
  })
  

  const escapeSingleBackslash = (input) => {
    return input.replace(/\\/g, '\\\\');
  };

  const renderHtml = (html) => {
    const cleanHtml = DOMPurify.sanitize(html);
    return { __html: cleanHtml };
  };
  return (
  <>

    <div className="row mt-3 mb-3"> 
    <div className="col-sm-12 col-md-6 col-lg-6 mt-1">
      <div className="col-auto">
      <TextField id="title" label="title" name='title' variant="outlined" fullWidth={true}  onChange={(e)=> handleChange(e)} value={formData?.title}/>
      </div>
    </div>
    <div className="col-sm-12 col-md-6 col-lg-6 mt-1">
      <div className="col-auto">
      <TextField id="summary" label="summary" name='summary' variant="outlined" fullWidth={true} onChange={(e)=> handleChange(e)} value={formData?.summary}  />
      </div>
    </div>
  </div>
  <div className="row">
  <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="col-auto">
      
          <label htmlFor="summary">Upload Blog Image</label>
        </div>
        <div className="col-auto">


        {formData?.blogImage != null ? 
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFileSize={"1MB"}
                id={styles.formData_projectPdf}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 1MB"
                onaddfile={handleImage}
                name="blogImage" 
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              /> : <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFileSize={"1MB"}
              id={styles.formData_img}
              allowFileEncode={true}
              onaddfile={handleImage}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 1MB"
              name="blogImage"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />  }
        
        </div>
      </div>
  </div>
       
  
  <div className="row">
  <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="col-auto">
          <label htmlFor="summary">Description</label>
        </div>
        <div className="col-auto">
        <CKEditor
        config={custom_config}
        
          editor={ClassicEditor}
          data={formData?.description.replace(/^"|"$/g, '')}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
          }}
          onChange={(event, editor) => {
            const escapedData = escapeSingleBackslash(editor.getData());
          
              setFormData({
                ...formData,
                description: escapedData
              })
           
          }}
        />
        </div>
      </div>
  </div>

  <div className="row mt-2">
    
    <div className="col-sm-12 col-md-6 col-lg-6">
    <div className="col-auto">
        <label htmlFor="title">Publish the Post</label>
      </div>
      <div className="col-auto">
      <select
                id="isPublishied"
                value={formData?.isPublished}
                label="Is Published"
                name="isPublished"
                className="form-control outline-none"
                onChange={handleChange}
              >
                 <option value={null}>Select</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
               
              </select>
      </div>
   
    </div>
  </div>

  <div className="row mt-2">
    <div className="d-flex justify-contet-center">
    <Button variant="contained" className="mt-2" type="submit"  onClick={handleSubmit}>Submit</Button>
    </div>
   
  </div>
      </>
   
  );
}

export default Blog;