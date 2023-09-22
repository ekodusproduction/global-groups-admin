import React,{useEffect, useRef,useState} from 'react'
import styles from "./AddGallery.module.css"
import { Button } from '@mui/material'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import axios from 'axios'
import Swal from 'sweetalert2'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize)

const AddGallery = () => {
 

    const [files, setFiles] = useState([])
    const [allProjects, setAllProjects] = useState([])
    const [project,setProject]= useState({})

    useEffect(()=> {
      axios.get('http://165.22.210.84/node/v1/api/project/getAllProjectDropDownList')
      .then(function (response) {
        setAllProjects(response?.data?.data?.result);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    },[])

    // console.log(allProjects)
    const galleryHandler = (e) => {
      e.preventDefault()
      if(project?.projectId == "" || project?.projectId === undefined){
        Swal.fire({
            icon: "error",
            title: "Gallery",
            text: "Select the Project to add Gallery",
          });
    }else if(
      files?.length === 0
    ){
      Swal.fire({
        icon: "error",
        title: "Gallery",
        text: "Upload an Image to add to the Gallery",
      });
    }else{
      const updatedData = files.reduce((result, file, index) => {
        result[index] = file.source;
        return result;
      }, {});

      updatedData['projectId'] = project?.projectId
   
     console.log("updatedData", updatedData)
      console.log(project)
      axios.post(`http://165.22.210.84/node/v1/api/gallery/uploadGallery`, {
      ...updatedData
    },
    {
      headers: {
        'Content-type': 'multipart/form-data',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    }
    )
    .then(function (response) {
      setFiles([])
      Swal.fire({
        icon: 'success',
        title: 'Submission Successfully',
        text: 'The gallery was successfully submitted',
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
     
      

     }

 
   


    
  return (
    <div className={styles.addgallery}>
        <h2>Add Gallery</h2>

        <form onSubmit={galleryHandler}>
            <div id={styles.selectProject}>
                <label htmlFor="galleryProjectSelect">Select Project: </label>
                <select onChange={(event) => setProject(allProjects.find(project => project.projectName === event.target.value))}>
                <option value="null">Select the Project</option>
                  {allProjects.map((project,i) => {
                    return ( 
                      <option key={i} value={project.projectName}  >
                        {project.projectName}
                      </option>
                    );
                  })}
                </select>
            </div>


            <div id={styles.project_gallery_image}>
              <label htmlFor="project_gallery_image_field">Upload Project Image</label>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={5}
                maxFileSize={"1MB"}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 1MB"
                
                // server="/api"
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
            </div>

            <Button variant="contained" type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default AddGallery