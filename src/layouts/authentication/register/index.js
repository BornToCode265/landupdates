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

// react-router-dom components
import { Link, redirect, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { Box } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "../components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import land4sale from "assets/images/logo-ct.png";

function Register() {
  return (
    <BasicLayout image={bgImage}>
      <Card sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
        <Box
          component="img"
          src={land4sale}
          alt="Welcome to LA"
          sx={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Welcome Page
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Welcome Our Guest . This is Welcome Page For Mzuzu City Land
            Registry P.O. Box 2057 Mzuzu, Malawi, Along High Way
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox display="flex" alignItems="center" ml={-1}>
              <MDTypography fontWeight="small" textGradient></MDTypography>
            </MDBox>
            <MDTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign In
            </MDTypography>{" "}
            OR{" "}
            <MDTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Register
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Register;
