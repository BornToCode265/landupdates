/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import Card from "@mui/material/Card";
import swal from "sweetalert";

//Axios imports
import axios from "axios";
import { ethers } from "ethers";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon, IconButton } from "@mui/material";
import ApplicationDataTable from "./application_data";

// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import { useEffect } from "react";


import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import ApplicationsModal from "./applications";
import { useState } from "react";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";

import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";
import MDAlert from "components/MDAlert";

//contracts data


import LandTransfersContractAbi from "assets/contractsData/LandTransfersContract.json";
import LandTransfersContractAddress from "assets/contractsData/LandTransfersContract-address.json";


function ApplicationsView({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["phone_number"]);
  const baseUrl = process.env.REACT_BACKEND_BASE_URL;



  //minting
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  
  //apprication

  const [modalOpenApplication, setModalOpenApplication] = useState(false);

  const handleModalOpenApplication = () => {
    setModalOpenApplication(true);
  };

  const handleModalCloseApplication = () => {
    setModalOpenApplication(false);
  };

  //regitration
  const [showModal, setShowModal] = useState(false);
  const [refresher, setRefresher] = useState(1);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
  
  
    const fetchApplication = async () => {
      axios.get(`http://localhost/backend/web5/application/`)
        .then((res) => setApplication_record(res.data))
        .catch((err) => console.log(err));
    };
    
  
    fetchApplication();
  

   
  },);

  const handleMints = async () => {
    swal("Good job!", "You Register the application!", "success");

    //creating provider
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const wallet = ethers.Wallet.createRandom().connect(provider);

    //instance of contract for land transfers
    const LandProcessContract = new ethers.Contract(
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

   
  };


  const [applicatin_record, setApplication_record] = useState([]);


  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");

  }, [pathname]);

 

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {" "}
      <DashboardNavbar />
      <Grid container spacing={9}>
        {/* Applications  grid */}
        <Grid item xs={12}>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              <MDButton onClick={handleModalOpenApplication}>
                <Icon>add</Icon> New Application
              </MDButton>
              <center> Recent Application</center>
            </MDTypography>
          </MDBox>

          <MDBox pt={3}>
            <ApplicationsModal
              open={modalOpenApplication}
              onClose={handleModalCloseApplication}
            />
           

            <ApplicationDataTable />

         

            {/* <DataTable
              table={{ applicationsColumn, applicatin_record }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            /> */}
          </MDBox>
        </Grid>

        {children}
      </Grid>
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
// DashboardLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default ApplicationsView;
