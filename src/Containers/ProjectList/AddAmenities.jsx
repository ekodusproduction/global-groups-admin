import React,{useRef,useState, useEffect} from 'react'
import { TextField } from '@mui/material'
import { Button} from '@mui/material'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import axios from 'axios'
import Swal from 'sweetalert2'
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize,FilePondPluginFileEncode)


const AddAmenities = () => {
  const [formData, setFormData] = useState({ name: ""});
  const [files, setFiles] = useState([]);
 
  const handleChange = e => {
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,      
    });
  };


  function handleImage(err, item) {
    if(err) {
      console.warn(err); return;
    }
      console.log("handleImage")
    formData['image'] = item.source
    
   
  }
 const projectFormSubmitHandler = () => {

    console.log("FormData", formData)
    axios.post(`http://165.22.210.84/node/v1/amenity/createAminity`, {
      ...formData
    },
    {
      headers: {
        'Content-type': 'multipart/form-data',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        'apptoken': ""
      }
    }
    )
    .then(function (response) {
        setFormData({name: ""})
        setFiles([])
      Swal.fire({
        icon: 'success',
        title: 'Submission Successfully',
        text: 'The project was successfully edited',
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
    <div className="container">
        <div className="row">
          <h2>Add Amenity</h2>
        </div>
        <div className="row">

        <div className="col-sm-12 col-md-12 col-lg-12 mt-1">
 
 <div className="col-auto">
 <TextField  label="Amenity Name" name='name' variant="outlined" onChange={handleChange} fullWidth value={formData?.projectName} />
    </div>
    </div>

    <div className="col-sm-12 col-md-12 col-lg-12 mt-1">
    <label htmlFor="">Upload Amenity Image</label>
 <div className="col-auto">
 <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFileSize={"1MB"}
              id="amenityImage"
              allowFileEncode={true}
              onaddfile={handleImage}
              labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
              labelMaxFileSize = "Maximum file size can be 1MB"
              name="image"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              

            />
    </div>
    </div>


    <Button variant="contained" onClick={projectFormSubmitHandler}>Submit</Button>


          
        </div>
        
    </div>
  )
}

export default AddAmenities














