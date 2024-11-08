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
import DataTable from "react-data-table-component";
//import DataTable from "examples/Tables/DataTable";
// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import ModalPopup from "./model";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MyModal from "./registered";
import ApplicationsModal from "./applications";
import { useState } from "react";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";
import OffersModal from "./offers";
import icon from "assets/theme/components/icon";
import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";
import MDAlert from "components/MDAlert";

function LandView({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["phone_number"]);

  // land collums
  const column = [
    {
      name: "Land Code",
      selector: (row) => row.land_id,
    },
    {
      name: "Land loard",
      selector: (row) => row.land_loard,
    },
    {
      name: "Size(ha)",
      selector: (row) => row.size,
    },
    {
      name: "View",
      selector: (row) => row.layout,
    },
  ];
  // columns: [
  //   { Header: "LandCode", accessor: "project", width: "30%", align: "left" },
  //   { Header: "LandLoard", accessor: "budget", align: "left" },
  //   { Header: "size(ha)", accessor: "status", align: "center" },
  //   { Header: "view", accessor: "completion", align: "center" },
  //   { Header: "action", accessor: "action", align: "center" },
  // ]

  //application colllumn
  const applicationsColumn = [
    {
      name: "Application Number",
      selector: (row) => row.id,
    },
    {
      name: "Applicant ID",
      selector: (row) => row.national_id,
    },
    {
      name: "From",
      selector: (row) => row.user_id,
    },
    {
      name: "To",
      selector: (row) => row.to_id,
    },
    {
      name: "Date",
      selector: (row) => row.application_date,
    },
  ];

  //offers collumn
  const OffersCollum = [
    {
      name: "Offer Number",
      selector: (row) => row.id,
    },
    {
      name: "Application Number",
      selector: (row) => row.application_id,
    },
    {
      name: "Applicant ",
      selector: (row) => row.applicant_id,
    },
    {
      name: "Status",
      selector: (row) => (row.offer_accepted ? "Accepted" : "Pending"),
    },
  ];

  //transfers collumn
  const TransferCollum = [
    {
      name: "Deed Number",
      selector: (row) => row.deed_number,
    },
    {
      name: "Ownership Title",
      selector: (row) => row.title_deed,
    },
    {
      name: "Date Created ",
      selector: (row) => row.expiary_date,
    },
  ];

  //minting
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // offers model
  const [modalOpenOffer, setModalOpenOffer] = useState(false);

  const handleModalOpenOffer = () => {
    setModalOpenOffer(true);
  };

  const handleModalCloseOffer = () => {
    setModalOpenOffer(false);
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
    const fetchData = async () => {
      axios("http://localhost/backend/web5/land_layouts/")
        .then((res) => setRecord(res.data))
        .catch((err) => console.log(err));
    };
    const fetchOffers = async () => {
      axios("http://localhost/backend/web5/offers/")
        .then((res) => setOffers_record(res.data))
        .catch((err) => console.log(err));
    };
    const fetchApplication = async () => {
      axios("http://localhost/backend/web5/application/")
        .then((res) => setApplication_record(res.data))
        .catch((err) => console.log(err));
    };
    const fetchTitleDeeds = async () => {
      axios("http://localhost/backend/web5/title_deeds/")
        .then((res) => setLand_title_record(res.data))
        .catch((err) => console.log(err));
    };
    fetchOffers();
    fetchData();
    fetchApplication();
    fetchTitleDeeds();

    swal("1 New Record");
  }, [refresher]);

  const [record, setRecord] = useState([]);
  const [offers_record, setOffers_record] = useState([]);
  const [applicatin_record, setApplication_record] = useState([]);
  const [land_title_record, setLand_title_record] = useState([]);

  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
    swal("Hello ", cookies.phone_number.toString());
  }, [pathname]);

  useEffect(() => {
    swal("Hello ", cookies.phone_number.toString());
  }, []);

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
                <Icon>add</Icon> New Land
              </MDButton>
              <center>Prepared land layout</center>
            </MDTypography>
          </MDBox>

          <MDBox pt={3}>
            <ModalPopup open={showModal} onClose={toggleModal} />
            <DataTable columns={column} data={record}></DataTable>
          </MDBox>
        </Grid>

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

            {/* <DataTable
              table={{ applicationsColumn, applicatin_record }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            /> */}
          </MDBox>
        </Grid>

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
              <MDButton onClick={handleModalOpenOffer}>
                <Icon>add</Icon> Enter Offer
              </MDButton>
              <center> Recent Land Offers</center>
            </MDTypography>
          </MDBox>

          <MDBox pt={3}>
            <OffersModal
              open={modalOpenOffer}
              onClose={handleModalCloseOffer}
            />
            <DataTable columns={OffersCollum} data={OffersCollum}></DataTable>
            {/* <DataTable
              table={{ OffersCollum, applicatin_record }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            /> */}
          </MDBox>
        </Grid>
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
              <MDButton onClick={handleModalOpen}>
                <Icon>add</Icon> New Land
              </MDButton>
              <center>Title Deeds</center>
            </MDTypography>
          </MDBox>

          <MDBox pt={3}>
            <MyModal open={modalOpen} onClose={handleModalClose} />
            {/* <DataTable
              columns={TransferCollum}
              data={land_title_record}
            ></DataTable> */}
          </MDBox>
        </Grid>
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
                <Icon>search</Icon> Official Search
              </MDButton>
              <center>Encumbalances</center>
            </MDTypography>
          </MDBox>

          <MDBox pt={3}>
            {/* <DataTable columns={column} data={record}></DataTable> */}
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

export default LandView;
