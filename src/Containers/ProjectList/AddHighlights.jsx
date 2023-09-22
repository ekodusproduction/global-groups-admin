import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCircleXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const AddHighlights = () => {
  const [rows, setRows] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [project, setProject] = useState({});
  useEffect(() => {
    axios
      .get("http://165.22.210.84/node/v1/api/project/getAllProjectDropDownList")
      .then(function (response) {
        setAllProjects(response?.data?.data?.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const highlightFormSubmitHandler = () => {
    console.log(project?.projectId)
    if(project?.projectId == "" || project?.projectId === undefined){
        Swal.fire({
            icon: "error",
            title: "Highlight",
            text: "Select the Project to add Highlight",
          });
    }
    
   else if (rows.length > 0) {
      const isEmpty = [...rows]?.some(function (object) {
        return object.highlight === "";
      });
      if (isEmpty) {
        Swal.fire({
          icon: "error",
          title: "Highlight",
          text: "Enter the highlights",
        });
      } else {
       
        axios
          .post(`http://165.22.210.84/node/v1/api//project/addhighlights`, {
            highlights: rows,
            projectId: project?.projectId,
          }, {
            headers:{
              'apptoken': ""
            }
          })
          .then(function (response) {
            setRows([])
            Swal.fire({
              icon: "success",
              title: "Submission Successfully",
              text: "The HighLight was Suucessfully added",
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong!",
            });
          });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Highlight",
        text: "Add Highlight Row ",
      });
    }
  };
  const handleAddRow = () => {
    if (rows?.length >= 4) {
      Swal.fire({
        icon: "error",
        title: "Highlight",
        text: "Maximum of 4 Highlight can be added ",
      });
    } else {
      console.log("row", rows);
      const item = {
        highlight: "",
      };
      setRows([...rows, item]);
    }
  };

  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };
  const handleRemoveSpecificRow = (idx) => {
    const clone = [...rows];
    clone.splice(idx, 1);
    setRows(clone);
  };
  const handleChange = (idx, id, e) => {
    const clone = [...rows];
    clone[idx] = {
      ...clone[idx],
      [id]: e,
    };

    setRows(clone);
  };

  return (
    <div className="container">
      <div className="row">
        <h2>Add Highlights</h2>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <select
            className="form-control"
            onChange={(event) =>
              setProject(
                allProjects.find(
                  (project) => project.projectName === event.target.value
                )
              )
            }
          >
            <option value={"null"}>Select the Project</option>
            {allProjects.map((project, i) => {
              return (
                <option key={i} value={project.projectName}>
                  {project.projectName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row mt-2">
        <div className="d-flex justify-content-end">
          <FontAwesomeIcon
            icon={faAdd}
            size="2x"
            onClick={handleAddRow}
            className="me-2"
          />
          <FontAwesomeIcon
            icon={faTrash}
            size="2x"
            onClick={handleRemoveRow}
            className="me-2"
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-sm-12 col-md-6 col-lg-6 mt-1">
          {rows &&
            rows.length > 0 &&
            rows?.map((row, idx) => {
              return (
                <div className="d-flex justify-content-start mb-2">
                  <TextField
                    label="Highlight Description"
                    name="highlight"
                    variant="outlined"
                    onChange={(e) => {
                      handleChange(idx, "highlight", e.target.value);
                    }}
                    multiline
                    rows={2}
                    fullWidth
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <FontAwesomeIcon
                      className="ms-2"
                      icon={faCircleXmark}
                      onClick={() => handleRemoveSpecificRow(idx)}
                      size="2x"
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <Button
          variant="contained"
          className="mt-2"
          onClick={highlightFormSubmitHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddHighlights;
