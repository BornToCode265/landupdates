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
//Axios imports
import axios from "axios";
import { ethers } from "ethers";
import swal from "sweetalert";
import { useState, useRef } from "react";

const OffersModal = ({ open, onClose }) => {
  const [developmentCharge, setDevelopmentCharge] = useState("");
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [application_id, setApplicationId] = useState("");
  const [land_id, setLandId] = useState(" ");

  const [GrNo, setGrNo] = useState("");
  const [national_id, setNationalId] = useState("");
  const inputFile = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [landTerm, setLandTerm] = useState("6");

  const handleGrNo = (event) => {
    setGrNo(event.target.value);
  };
  const handleLandId = (event) => {
    setLandId(event.target.value);
  };
  const handleDevelopmentCharge = (event) => {
    setDevelopmentCharge(event.target.value);
  };

  const handleApplicationNumber = (e) => {
    setApplicationId(e.target.value);
  };

  const handleApplicationNationId = (e) => {
    setNationalId(e.target.value);
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
const handleCancel = ()=>{
  onClose()
}
  const handleMints = () => {
    swal("Great Job !! Done", "your offer is ready", "success");

    axios
      .post(`${baseUrl}/web5/offers/index.php`, {
        land_id: land_id,
        application_id: application_id,
        applicant_id: national_id,
        developmental_charge: developmentCharge,
        gr_no: GrNo,
      })
      .then((response) => {
        // Handle success, e.g., update state or show a success message
        console.log(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        // Handle error, e.g., show an error message to the user
      });
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
                Recent Land Offers
              </MDTypography>
              <MDTypography
                display="block"
                variant="button"
                color="white"
                my={1}
              >
                New Offers Details
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Application Number"
                        variant="standard"
                        onChange={handleApplicationNumber}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Applicant National ID"
                        variant="standard"
                        onChange={handleApplicationNationId}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Land Id"
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
                        label="Development Charge"
                        variant="standard"
                        onChange={handleDevelopmentCharge}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="GR No"
                        variant="standard"
                        onChange={handleGrNo}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="file"
                        label="building plans"
                        variant="standard"
                        id="file"
                        ref={inputFile}
                        onChange={handleChange}
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
                        Create
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDButton
                        variant="gradient"
                        color="primary"
                        onClick={handleMints}
                        fullWidth
                      >
                        Accept
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

export default OffersModal;
