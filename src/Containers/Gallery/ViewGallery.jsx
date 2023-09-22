import React,{useState,useEffect} from 'react'
import styles from "./ViewGallery.module.css"
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

const ViewGallery = () => {
    const [files, setFiles] = useState([]);
    const [allProjects, setAllProjects] = useState([])
    const [project,setProject]= useState({})
    const [deletedFiles, setDeletedFiles] = useState([]);
    const [getResponse, setGetResponse] = useState([])

    useEffect(()=> {
      axios.get('http://127.0.0.1:3000/v1/api/project/getAllProjectDropDownList')
        .then(function (response) {
          console.log("response", response?.data?.data?.result)
          setAllProjects(response.data.data?.result);
          
        })
        .catch(function (error) {
          console.log(error);
        })
      },[])

      // const handleFileRemove = (errRes, file) => {
      //   setDeletedFiles([...deletedFiles, file]);
      //   let deleteFile=file.source.slice(22);
      //   console.log(deleteFile)
      //   console.log(getResponse)

      //   const deletedItem = getResponse.filter(item => {
      //       if(item.filePath == deleteFile)
      //           return item;
        
      //   })
      //   console.log("deletedItem", deletedItem)
       
     
      //   console.log(deletedItem[0].id)
      //  const  headers = {
      //     'Authorization' : `Bearer ${localStorage.getItem('token')}`
      // }
      //   axios.delete(`http://127.0.0.1:3000/v1/api/gallery/deleteGalleryItem/${deletedItem[0].id}`, {
      //    headers
            
           
      //     })  .then(function (response) {
      //       if(response?.data?.status === 200){
             
      //         Swal.fire({
      //           icon: 'success',
      //           title: 'Gallery',
      //           text: response?.data?.data?.message,
      //         })
      //       }else if(response?.data?.status === 404){
      //         Swal.fire({
      //           icon: 'error',
      //           title: 'Gallery',
      //           text: response?.data?.data?.message,
      //         })
      //       }else{
      //         Swal.fire({
      //           icon: 'error',
      //           title: 'Gallery',
      //           text: "Something Went wrong",
      //         })
      //       }
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Gallery',
      //         text: "Something Went wrong",
      //       })
      //     });

        
        
      // };


      const handleFileRemove = (errRes, file) => {
        // Add the removed file to the deletedFiles array
        setDeletedFiles([...deletedFiles, file]);
        let deleteFile=file.source.slice(22);
     

        const deletedItem = getResponse.filter(item => {
            if(item.filePath == deleteFile)
                return item;
        
        })
       console.log(deletedItem)
     
        console.log(deletedItem[0].id)

        axios.delete(`http://127.0.0.1:3000/v1/api/gallery/deleteGalleryItem/${deletedItem[0].id}`, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
           
          })  .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        
        
      };

      const fetchGalleryImageHandler = () => {
        setFiles([])
        axios.get(`http://127.0.0.1:3000/v1/api/gallery/getGalleryList/${project?.projectId}`)
        .then(function (response) {
        console.log("response", response)
        if(response?.data?.data.result.length > 0){
          const projectGalleryFiles = response.data.data?.result.map(file=> ({

            id_: file.id,
            source: `http://127.0.0.1:3000/${file.filePath}`,
            location: {
              type: 'local'
            }
          }))
       
          setFiles(projectGalleryFiles)
          setGetResponse(response.data?.data?.result)
        }else if(response?.data?.data?.result.length === 0){
          Swal.fire({
            icon: 'error',
            title: 'Gallery',
            text: response?.data?.data?.message,
          })
        }
         
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      }



  return (
    <div className={styles.view_gallery}>
        <h2>Manage Gallery</h2>

        <div className={styles.gallery_images_container}>
            <div className={styles.gallery_images_project_select}>
                <label htmlFor="">Select your project</label>
               <select onChange={(event) => setProject(allProjects.find(project => project.projectName === event.target.value))}>
                 <option value="null">Sselect the Project</option>
                  {allProjects.map((project,i) => {
                    return ( 
                      <option key={i} value={project.projectName}  >
                        {project.projectName}
                      </option>
                    );
                  })}
                </select>
            </div>
            <div>
                <button className={styles.fetch_button} onClick={ () => fetchGalleryImageHandler()}>Fetch Gallery Images</button>
            </div>
            <div className={styles.gallery_images}>
                <h3>Gallery images</h3>
                <form action="">
                    <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    onremovefile={handleFileRemove}
                    maxFiles={10}
                    maxFileSize={"1MB"}
                    labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                    labelMaxFileSize = "Maximum file size can be 1MB"
                    
                    
                    // server="/api"
                    name="files" /* sets the file input name, it's filepond by default */
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
                </form>
            </div>
        </div>
    </div>
  )
}

export default ViewGallery