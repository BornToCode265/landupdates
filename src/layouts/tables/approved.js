// ModalPopup.js
import React from 'react';
import { Modal, Box, Button } from '@mui/material';


import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Icon, IconButton } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import { useCookies } from 'react-cookie';
import MDAlert from "components/MDAlert";
import DataTable from "react-data-table-component";
import { ModalDialog } from "react-bootstrap";
import Card from "@mui/material/Card";
//Axios imports 
import axios from "axios";
import { ethers } from "ethers"

import {useState,useRef} from 'react'


const approvedModalPopup = ({ open, onClose }) => {
    const [landId, setLandId] = useState(9);
    const [id, setId] = useState(9);
    const [land_loard , setLand_loard] = useState("")
    const baseUrl = process.env.REACT_BACKEND_BASE_URL;
    const [url, setUrl] = useState(`${baseUrl}/web5/images/`)
    const [description, setDescription] = useState("Description")
    const [coordinates, setCoordinates] = useState("Bearing Url")
  
    const [name, setName] = useState("Mw Land")

    const inputFile = useRef(null);
  
  
   const [selectedFile, setSelectedFile] = useState(null);
    
  const handleLand_loard = event => {
        setLand_loard(event.target.value);  
      };
      
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };
    
      const handleCoordinatesChange = (e) => {
        setCoordinates(e.target.value);
      };

      const handleChange = (event) => {
        setSelectedFile(event.target.files[0]);
      
      }
  
      const handleMints = ()=>{
     
        const formData = new FormData();
        formData.append('selectedFile', selectedFile);
        formData.append('land_loard' , land_loard);
        formData.append('description', description);
        formData.append('coordinates' , coordinates);
    
        axios.post(`${baseUrl}uploads/index.php`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
       
            // Handle success, e.g., update state or show a success message
            setUrl(response.data)
  
            
          })
          .catch(error => {
            console.error('Error uploading file', error);
            // Handle error, e.g., show an error message to the user
          });
      };
  return ( 
    <Modal open={open} onClose={onClose}>
      <Grid container justifyContent="center" >
      <Grid  item xs={12} md={6} lg={4} >
              
             <Card>
           
                  
             <IconButton onClick={onClose}>
              <Icon>close</Icon>
            </IconButton>
        
                    <MDBox
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="success"
                      mx={2}
                      mt={-3}
                      p={3}
                      mb={1}
                      textAlign="center"
                     
                     
                    >
                      <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Approved
                      </MDTypography>
                      <MDTypography display="block" variant="button" color="white" my={1}>
                        Enter approve
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={4} pb={3} px={3}>
                      <form >
                        <MDBox mb={2}>
                          <MDInput type="text" label="Description" variant="standard" value={description} onChange={handleDescriptionChange} fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput type="text" label="Coordinates" variant="standard" value={coordinates} onChange={handleCoordinatesChange} fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput type="text" label="Land Lord" variant="standard" value={land_loard} onChange={handleLand_loard} fullWidth />
                        </MDBox>
                        <MDBox mb={2}>
              <MDInput type="file" label="Land" variant="standard" 
                  id="file"
                  ref={inputFile}
                  onChange={handleChange}
                
                  fullWidth />
            </MDBox>



          


                        <MDBox mt={4} mb={1}>
                          <MDButton variant="gradient" color="info" onClick={handleMints} fullWidth>
                            Mint
                          </MDButton>
                        </MDBox>
                      </form>
                       
        
      
                    </MDBox>
                    
                  </Card>
               
              </Grid>
       
            </Grid>
    </Modal>
  );
};

export default ModalPopup;
