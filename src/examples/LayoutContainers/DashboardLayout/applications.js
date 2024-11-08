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

import LandTransfersContractAbi from "assets/contractsData/LandTransfersContract.json";
import LandTransfersContractAddress from "assets/contractsData/LandTransfersContract-address.json";

const ApplicationsModal = ({ open, onClose }) => {
  const [landId, setLandId] = useState("9");

  const [land_loard, setLand_loard] = useState("");
  const [nature, setNature] = useState("");
  const [description, setDescription] = useState("Description");

  const inputFile = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [from, setFrom] = useState("");
  const [to_id, setTo_id] = useState("");

  const [regFee, setRegFee] = useState("");

  const handleLand_loard = (event) => {
    setLand_loard(event.target.value);
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
  const handleRegFee = (e) => {
    setRegFee(e.target.value);
  };

  const handleNature = (e) => {
    setNature(e.target.value);
  };
  const handleFrom = (e) => {
    setFrom(e.target.value);
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleMints = async () => {
    swal("Good job!", "You Register the application!", "success");

    //creating provider
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const wallet = ethers.Wallet.createRandom().connect(provider);

    //instance of contract for land transfers
    const landTransfersContractContract = new ethers.Contract(
      LandTransfersContractAddress.address,
      LandTransfersContractAbi.abi,
      wallet
    );

    //instance of contract for land registration
    // const landsContract = new ethers.Contract(
    //   LandAddress.address,
    //   LandAbi.abi,
    //   wallet
    // );

    //getting address
    const address = await wallet.getAddress();
    // console.log("Wallet address:", address);

    // reg user
    axios
      .post("http://localhost/backend/web5/application/index.php", {
        from: from,
        to_id: to_id,
        nature: nature,
        national_id: regFee,
        description: description,
        address: address.toString(),
        wallet: JSON.stringify(wallet),
        land: JSON.stringify(landTransfersContractContract),
        land_process: JSON.stringify(landTransfersContractContract),
        land_id: landId,
      })
      .then(function (response) {
        console.log(response);
      });
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
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
                        onChange={handleFrom}
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
                        onChange={handleRegFee}
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
                    Register
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

export default ApplicationsModal;
