// ModalPopup.js
import React, { useState, useRef } from "react";
import { Modal, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import axios from "axios";
import { render } from "react-dom";
import swal from "sweetalert";

const ModalPopup = ({ open, onClose }) => {
  const [description, setDescription] = useState("Description");
  const [landCode, setLandCode] = useState("MZ");
  const [land_loard, setLand_loard] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const land_loardOptions = ['Lands', 'MHC', 'Other'];
  const landTypeOptions = ['Customary', 'Commercial', 'Other'];
  const [TRCoorinate, setTRCoordinate] = useState("");
  const [TLCoorinate, setTLCoordinate] = useState("");
  const [BRCoorinate, setBRCoordinate] = useState("");
  const [BLCoorinate, setBLCoordinate] = useState("");

  const inputFile = useRef(null);

  const handleTR = (e) => {
    setTRCoordinate(e.target.value);
  };
  const handleTL = (e) => {
    setTLCoordinate(e.target.value);
  };
  const handleBR = (e) => {
    setBRCoordinate(e.target.value);
  };
  const handleBL = (e) => {
    setBLCoordinate(e.target.value);
  };
  const handleChange = (e) => {
    setSelectedFile(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleLandCode = (e) => {
    setLandCode(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleLand_loard = (e) => {
    setLand_loard(e.target.value);
  };

  // Construct the Google Maps URL with the rectangle parameters
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${TRCoorinate},${TLCoorinate}&query=${BRCoorinate},${BLCoorinate}&view=rectangle`;

  const handleCancel = () => {
    onClose();
  };
  const handleMints = () => {
    // Construct the Google Maps URL with the rectangle parameters
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${TRCoorinate},${TLCoorinate}&query=${BRCoorinate},${BLCoorinate}&view=rectangle`;

    const formData = new FormData();
    formData.append("selectedFile", mapUrl);
    formData.append("land_id", landCode);
    formData.append("type", type);
    formData.append("size", size);
    formData.append("land_loard", land_loard);
    formData.append("description", description);

    swal("Great Job !! Registered Land", landCode.toString(), "success");

    axios
      .post(`${baseUrl}/web5/land_layouts/index.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      <Grid
        container
        justifyContent="center"
        style={{ height: "100vh", alignItems: "center" }}
      >
        <Grid item xs={22} sm={10} md={8} lg={6} xl={4}>
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
               Land Layout Details
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={32} sm={4}>
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
                        label="Land Code"
                        variant="standard"
                        onChange={handleLandCode}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Size(ha)"
                        variant="standard"
                        onChange={handleSize}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>

                
                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Top Left"
                        variant="standard"
                        onChange={handleTL}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Top Right"
                        variant="standard"
                        onChange={handleTR}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Bottom Left"
                        variant="standard"
                        onChange={handleBL}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Bottom Right"
                        variant="standard"
                        onChange={handleBR}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={11}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <MDBox mb={2}>
                        <label htmlFor='gender'>Type: </label>
                        <select
                          id="gender"
                          value={type}
                          onChange={handleType}>
                          {landTypeOptions.map((option) =>(
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </MDBox>
                    </Grid>
                    <Grid item xs={6}>
                      <MDBox mb={2}>
                        <label htmlFor='gender'>landlord </label>
                        <select
                          id="gender"
                          value={land_loard}
                          onChange={handleLand_loard}>
                          {land_loardOptions.map((option) =>(
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </MDBox>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item xs={12} sm={3}>
                    
                  </Grid> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={2}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        onClick={handleMints}
                        fullWidth
                      >
                        Write To Binder
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

export default ModalPopup;
