import React,{useState,useRef, useEffect} from 'react'
import styles from "./AddTestimonial.module.css"
import { Button, TextField, Switch } from '@mui/material'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize)

const AddTestimonial = () => {
  const { state } = useLocation();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      designation: '',
      location: '',
      review: '',
      image: null
    })
   


    useEffect(()=>{
if(state && state !== null){
console.log("state", state)
setFormData(state?.row)
}else{
  
}
    }, [state])


    useEffect(()=>{
      if (formData?.image && files.length === 0) {
        const projectImageFile = {
          source: `http://localhost:3000/uploads/${formData.image}`,
          location: {
            type: 'local'
          }
        };
        setFiles([projectImageFile]);
      }
    },[formData])
    const handleImg = (err, item)=> {
        if(err) {
          console.warn(err); return;
        } 
          setFormData({
            ...formData,
            image:item.source
      })
     }
    const handleChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,      
        });
      };

      const submitHandler = (e) => {
        e.preventDefault()
        console.log("FormData", formData)
        axios.post(`http://165.22.210.84/node/v1/api/testimony/addTestimony`, {
          ...formData
        },
        {
          headers: {
            'Content-type': 'multipart/form-data',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }
        }
        )
        .then(function (response) {
          setFormData([])
          Swal.fire({
            icon: 'success',
            title: 'Submission Successfully',
            text: 'The Testimony was successfully added',
          })
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Something went wrong!",
          })
        });
       
    
      
      }
  return (
    <div className={styles.addtestimonial_container}>
        <div className={styles.addtestimonial_header}>
            <h2>Add Testimonial</h2>
        </div>
        <div className={styles.addtestimonial_body}>
            <form action="">
                <div id={styles.addtestimonial_profile} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Add Testimony Picture</label>

                    {formData?.image != null ?
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFileSize={"1MB"}
               
                allowFileEncode={true}
                onaddfile={handleImg}
               
                // source={`http://68.183.94.172/${formData?.projectInfo?.projectImage}`}
              //  src={baserrl+formaData?.projectInfo?.projectImage}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 1MB"
                name="image"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                

              />:  <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFileSize={"1MB"}
              id={styles.formData_img}
              allowFileEncode={true}
              onaddfile={handleImg}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 1MB"
              name="image"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />
}
                 
                    

                </div>
                <div id={styles.addtestimonial_name} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Name</label>
                    <TextField id={styles.project_floors_field} label="Name" name="name" variant="outlined" onChange={handleChange} value={formData?.name} />
                </div>
                <div id={styles.addtestimonial_location} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Desigation</label>
                    <TextField id={styles.project_floors_field} label="Designation" name="designation" variant="outlined" onChange={handleChange} value={formData?.designation}/>
                </div>
                <div id={styles.addtestimonial_location} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Location</label>
                    <TextField id={styles.project_floors_field} label="Location" name="location" variant="outlined" onChange={handleChange} value={formData?.location} />
                </div>
                {/* <div className={styles.addtestimonial_form_section}>
                    <div className={styles.addtestimonial_project_q}>
                        <label htmlFor="">Related to a project: </label>
                        <Switch
                        // checked={checked}
                        
                        onChange={handleChangeProjectSwitch}
                        inputProps={{ 'aria-label': 'controlled' }}/>
                    </div>
                    <div className={styles.addtestimonial_project_select}>
                        <label htmlFor="">Select the project: </label>
                        <select name="" id="" className={styles.addtestimonial_project_drop} disabled={disabled} >
                            <option value="">Project</option>
                            <option value="">Project</option>
                            <option value="">Project</option>
                        </select>
                    </div>
                </div> */}
                <div id={styles.addtestimonial_review} className={styles.addtestimonial_form_section}>
                    <label htmlFor="">Enter your review</label>
                    <TextField id={styles.project_floors_field} label="Review" variant="outlined" name="review"  multiline rows={4}  onChange={handleChange} value={formData?.review} />
                </div>
                <div  className={styles.addtestimonial_form_section}>
                <Button variant="contained" type="submit" onClick={submitHandler}>Submit</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddTestimonial