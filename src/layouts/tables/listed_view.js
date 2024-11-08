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
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import ListPopup from "./listed";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components

import { useState } from "react";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";
import OffersModal from "./offers";
import icon from "assets/theme/components/icon";
import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";
import MDAlert from "components/MDAlert";
import DynamicDataTable from "./listed_data";

function ListedLandView({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["phone_number"]);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  //minting
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState("");

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  //regitration
  const [showModal, setShowModal] = useState(false);
  const [refresher, setRefresher] = useState(1);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/web5/listed_lands`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        {/* land preparation grid */}

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
              <MDButton onClick={toggleModal}>
                <Icon>add</Icon> New Listing
              </MDButton>
              <center>Listed Land plots</center>
            </MDTypography>
          </MDBox>

          <MDBox pt={3}>
            <ListPopup open={showModal} onClose={toggleModal} />

           <DynamicDataTable />
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

export default ListedLandView;
