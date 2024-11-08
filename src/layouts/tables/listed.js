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

const ListPopup = ({ open, onClose }) => {
  const [landCode, setLandCode] = useState("MZ");
  const baseUrl = "http://localhost/backend"
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleLandCode = (e) => {
    setLandCode(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleCancel = () => {
    onClose();
  };
  const handleMints = () => {
    axios
      .put(`${baseUrl}/web5/land_layouts/index.php`, null, {
        params: { land_code: landCode, price: price },
      })
      .then((response) => {
        // Handle success, e.g., update state or show a success message
        console.log(response.data);
        onClose();
        swal("Great Job !! Requested to Buy", landCode.toString(), "success");
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        swal("Failed to list Land", error.toString(), "error");
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
                Land Details
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
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
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        value={price}
                        label="Price"
                        variant="standard"
                        onChange={handlePrice}
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

export default ListPopup;
