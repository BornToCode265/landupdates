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

  const [TRCoorinate, setTRCoordinate] = useState("");
  const [TLCoorinate, setTLCoordinate] = useState("");
  const [BRCoorinate, setBRCoordinate] = useState("");
  const [BLCoorinate, setBLCoordinate] = useState("");

  const inputFile = useRef(null);

  const handleTR = (event) => {
    setTRCoordinate(event.target.files[0]);
  };
  const handleTL = (event) => {
    setTLCoordinate(event.target.files[0]);
  };
  const handleBR = (event) => {
    setBRCoordinate(event.target.files[0]);
  };
  const handleBL = (event) => {
    setBLCoordinate(event.target.files[0]);
  };
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
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

  const handleMints = () => {
    const formData = new FormData();
    formData.append("selectedFile", mapUrl);
    formData.append("land_id", landCode);
    formData.append("type", type);
    formData.append("size", size);
    formData.append("land_loard", land_loard);
    formData.append("description", description);

    swal("Great Job !! Registered Land", landCode.toString(), "success");

    axios
      .post("http://localhost/backend/web5/land_layouts/index.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      <Grid
        container
        justifyContent="center"
        style={{ height: "100vh", alignItems: "center" }}
      >
        <Grid item xs={22} sm={10} md={8} lg={6} xl={4}>
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
                Land Details
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={32} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                        label="Land Lord"
                        variant="standard"
                        onChange={handleLand_loard}
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
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={handleMints}
                    fullWidth
                  >
                    Write To Binder
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
