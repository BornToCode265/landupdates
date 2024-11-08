import React from "react";
import { Modal, Box, Button } from "@mui/material";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Icon, IconButton } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import MDAlert from "components/MDAlert";
import DataTable from "react-data-table-component";
import { ModalDialog } from "react-bootstrap";
import Card from "@mui/material/Card";

import swal from "sweetalert";

import { useState, useRef } from "react";

//contracts data
//Axios imports
import axios from "axios";
import { ethers } from "ethers";
import LandTransfersContractAbi from "assets/contractsData/LandTransfersContract.json";
import LandTransfersContractAddress from "assets/contractsData/LandTransfersContract-address.json";

// import LandTransfersContractAbi from "@ass"
const ApplicationsModal = ({ open, onClose }) => {
 
  const baseUrl = "http://localhost/backend";


  const [user_id, setUserId] = useState('');
  const [land_id, setLandId] = useState('');
  const [application_date, setApplicationDate] = useState('');
  const [accepted, setAccepted] = useState('');

  const [nature, setNature] = useState('');
  const [description, setDescription] = useState('');
  const [national_id, setNationalId] = useState('');
  const inputFile = useRef(null);

  const [to_id, setTo_id] = useState("");

  const handleCancel = () => {
    onClose();
  };

  
  const handleLandId = (event) => {
    setLandId(event.target.value);
  };
  const handleTo_id = (event) => {
    setTo_id(event.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleNature = (e) => {
    setNature(e.target.value);
  };
  
  const handleUserId = (e) => {
    setUserId(e.target.value);
  };
  const handleNationId = (e) => {
    setNationalId(e.target.value);
  };

 

  const handleMints = async (e) => {
      e.preventDefault();

      const applicationData = {
          user_id,
          land_id,
          application_date,
          accepted,
          to_id,
          nature,
          description,
          national_id
      };

      try {
          const response = await axios.post(`${baseUrl}/web5/customary/applications/`, applicationData);
          console.log(response.data);
          swal("Great new application added","success")
          // Handle success, e.g., show a success message or redirect
      } catch (error) {
          console.error('Error submitting application:', error);
          // Handle error, e.g., show an error message
      }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <Card>
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
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Land Applications
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="From Id"
                        variant="standard"
                        onChange={handleUserId}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="To "
                        variant="standard"
                        onChange={handleTo_id}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Nature"
                        variant="standard"
                        onChange={handleNature}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Land Code"
                        variant="standard"
                        onChange={handleLandId}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Description"
                        variant="standard"
                        onChange={handleDescriptionChange}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="National Id"
                        variant="standard"
                        onChange={handleNationId}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        onClick={handleMints}
                        fullWidth
                      >
                        Binder
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDButton
                        variant="gradient"
                        color="warning"
                        onClick={handleCancel}
                        fullWidth
                      >
                        cancel
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ApplicationsModal;
