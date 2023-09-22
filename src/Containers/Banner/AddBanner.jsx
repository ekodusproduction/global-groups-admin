import React,{useState} from 'react'
import styles from './AddBanner.module.css'

import { FilePond, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize)

const AddBanner = () => {
    const [files, setFiles] = useState([])
  return (
    <div className={styles.addbanner_container}>
        <h2>Add Banner</h2>
        <div className={styles.addbanner_form}>
            <form action="">
                <div className={styles.addbanner_banner_upload}>
                <label htmlFor="project_image_field">Upload Project Image</label>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFileSize={"1MB"}
                labelMaxFileSizeExceeded = "MAXIMUM SIZE EXCEEDED"
                labelMaxFileSize = "Maximum file size can be 1MB"
                
                // server="/api"
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
                    
                </div>
                <div className={styles.addbanner_heading}>
                    <div className={styles.addbanner_subhead}>
                        <label htmlFor="">Enter Sub heading: </label>
                        <input type="text" placeholder='Subheading'/>
                    </div>
                    <div className={styles.addbanner_mainhead}>
                        <label htmlFor="">Enter Main heading: </label>
                        <input type="text" placeholder='Heading' />
                    </div>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default AddBanner