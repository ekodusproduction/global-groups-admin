import React,{useEffect, useState, useCallback} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
const Ammenities = () => {
    const [allProjects, setAllProjects] = useState([])
    const [amenities, setAmenities] = useState([])
    const [project,setProject]= useState({})
    const [projectAmenit, setProjectAmenity] = useState([])
   
    const [selected, setSelected] = useState([]);
    
    useEffect(()=> {
      axios.get('http://165.22.210.84/node/v1/api/project/getAllProjectDropDownList')
      .then(function (response) {
        setAllProjects(response?.data?.data?.result);
      })
      .catch(function (error) {
        console.log(error);
      })
    },[])

    useEffect(()=> {
      axios.get('http://165.22.210.84/node/v1/api/amenity/getallamenity')
      .then(function (response) {
        console.log("response", response)
        setAmenities(response?.data?.data?.result);
        
      })
      .catch(function (error) {
        console.log(error);
      })
    },[])

    const handleAmmenities = (e) => {
      e.preventDefault()
      console.log("projectId", project?.projectId)
      if(project?.projectId === "" || project?.projectId === undefined){

        Swal.fire({
          icon: 'error',
          title: 'Amenities',
          text: 'Select the Project',
        })
      }
    
       else if(selected?.length === 0){
        Swal.fire({
          icon: 'error',
          title: 'Amenities',
          text: 'Select the Amenities',
        })
      }else{
        const data = {
          amenities: selected,
          projectId: project?.projectId
        }
        console.log("data", data)
        axios.post(`http://165.22.210.84/node/v1/api/amenity/addAminity`, {
         ...data
        },
      
        )
        .then(function (response) {
          Swal.fire({
            icon: 'success',
            title: 'Submission Successfully',
            text: 'The Amenities was successfully submitted',
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

     const handleChange = (e) => {
      const { value, checked } = e.target;
     const image =  e.target.getAttribute('data-id');
     const idValue =e.target.getAttribute('data-id-attribute');
      if (checked) {
       setAmenities(amenities.map((e)=> {
        if(e.id == idValue){
          e['checked'] = true
          return e
        }
        return e
      }))
        setSelected([...selected, {id: idValue, image: image, name: value, checked: true}])
      }
      else {
        setAmenities(amenities.map((e)=> {
          if(e.id == idValue){
            e['checked'] = false
            return e
          }
          return e
        }))
       
        setSelected(selected.filter((e)=> e.id !== idValue))
      }
    };
   
    
  return (
    <>
  
    <div className="container">
        <div className="row">
        <h2>Add Ammenities</h2>
        </div>
     
        <div className="row">
        <form onSubmit={handleAmmenities}>
            <div  className='row'>
             <div className='col-sm-12 col-md-6 col-lg-6'>
             <label htmlFor="galleryProjectSelect">Select Project: </label>
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(event) => {
                  
     const dropDownItem = allProjects.find(project => project.projectName === event.target.value);
    setProject(dropDownItem)
    console.log("Thar", dropDownItem?.projectId)
  
    axios.get(`http://165.22.210.84/node/v1/api/amenity/getProjectAmenities/${dropDownItem?.projectId}`

  )
  .then(function (response) {

    setProjectAmenity(response?.data?.data?.result)
    setSelected(response?.data?.data?.result)
    const destructuredId = response?.data?.data?.result?.map(({ id }) => parseInt(id))
const finalAmenity = amenities?.map((amenity) => ({
  ...amenity,
  checked: destructuredId.includes(amenity.id),
}));
setAmenities(finalAmenity)

  })
  }
    
                }
                >
                  <option value={"null"}>Select the Project</option>
                  {allProjects.map((project,i) => {
                    return ( 
                      <option key={i} value={project.projectName}  >
                        {project.projectName}
                      </option>
                    );
                  })}
                </select>
             </div>
            </div>

<div className='row'>

  <div className='d-flex justify-content-around'>

{amenities.map(({id, name, image, checked }, index) => {
     return(
  <>
  <div class="form-check form-switch">
  <input class="form-check-input"
  id={`amenitiy${index}`}
   type="checkbox"
    value={name}
          name='amenities'
          data-id-attribute={id}
          data-id={image}
          onChange={handleChange}
          checked={checked}/>
  <label class="form-check-label" for={`amenitiy${index}`}>{name}</label>
</div>


  </>
    
    
  )

})}
 </div>
</div>
          <Button variant="contained" type='submit'>Submit</Button>
        </form>
        </div>
       
    </div>
    </>
  )
}

export default Ammenities