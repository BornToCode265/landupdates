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

const MyModal = ({ open, onClose }) => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  //variables

  const [offerNumber, setOfferNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [GrNo, setGrNo] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  //setter functions
  const handleType = (event) => {
    setType(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleGrNo = (event) => {
    setGrNo(event.target.value);
  };
  const handleRegistrationNumber = (event) => {
    setRegistrationNumber(event.target.value);
  };

  const handleOfferNumberChange = (e) => {
    setOfferNumber(e.target.value);
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //api request to register ownership
  const handleMints = () => {
    swal("Great Job !! Done", "Title registered", "success");
    axios
      .post(`${baseUrl}web5/title_deeds/index.php`, {
        title_deed: title,
        type: type,
        offer_number: offerNumber,
        deed_number: registrationNumber,
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

  //api request to transer ownership rights
  const handleTranser = () => {
    swal("Great Job !! Done", "Transfer Successful", "success");
    axios
      .put(`${baseUrl}web5/title_deeds/index.php`, {
        title_deed: title,

        deed_number: registrationNumber,
        gr_no: GrNo,
      })
      .then((response) => {
        // Handle success, e.g., update state or show a success message
        console.log(response.data);
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
                Binder
              </MDTypography>
              <MDTypography
                display="block"
                variant="button"
                color="white"
                my={1}
              >
                Ownership Transfer
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Offer Number"
                        variant="standard"
                        onChange={handleOfferNumberChange}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Registration Number"
                        variant="standard"
                        onChange={handleRegistrationNumber}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Title"
                        variant="standard"
                        onChange={handleTitle}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Type"
                        variant="standard"
                        onChange={handleType}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      City
                      <MDInput
                        type="file"
                        label="Land"
                        variant="standard"
                        id="file"
                        ref={inputFile}
                        onChange={handleChange}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      MRA
                      <MDInput
                        type="file"
                        label="Land"
                        variant="standard"
                        id="file"
                        ref={inputFile}
                        onChange={handleChange}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    Lawyer
                    <MDBox mb={2}>
                      <MDInput
                        type="file"
                        label="Land"
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
                        Register
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDButton
                        variant="gradient"
                        color="warning"
                        onClick={handleTranser}
                        fullWidth
                      >
                        Transfer
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

export default MyModal;
