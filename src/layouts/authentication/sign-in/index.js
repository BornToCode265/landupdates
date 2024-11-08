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

import { useEffect, useState } from "react";
import routes from "../../../routes";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// react-router-dom components
// react-router-dom components
import { Link, redirect, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

//resources
import { ethers } from "ethers";

import axios from "axios";
import Icon from "@mui/material/Icon";

import NotificationItem from "examples/Items/NotificationItem";
import { Alert } from "@mui/material";
import { render } from "react-dom";
import { useCookies } from "react-cookie";
import MDAlert from "components/MDAlert";

import swal from "sweetalert";

function Basic({ route }) {
  //const [lands, landProcess] = route.params;
  const [rememberMe, setRememberMe] = useState(false);
  const [phone_number, setPhone_number] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [loginStatus, setLoginStatus] = useState(false);

  const navigation = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [cookies, setCookie, removeCookie] = useCookies(["phone_number"]);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const handlePassword = (event) => {
    event.preventDefault();

    setPassword(event.target.value.toString());
  };
  const handlePhone_number = (event) => {
    event.preventDefault();

    setPhone_number(event.target.value.toString());
  };
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const handleSubmit = async () => {
    try {
      axios
        .get(
          `${baseUrl}/web5/auth`,

          { params: { email: phone_number } }
        )
        .then(function (response) {
          const res = response.data;
          console.log(response.data);

          if (res.length > 0) {
            res.map((results) => {
              if (results.password.toString() == password) {
                setCookie("phone_number", results.phone_number, { path: "/" });
                setCookie("user_id", results.id, { path: "/" });
                setCookie("full_name", results.full_name, { path: "/" });

                //if admin
                if (results.role === 1) {
                  navigation("/tables/land");
                  //navigate("layouts/tables/land/");
                }
                //user
                else {
                  //navigate("layouts/tables/client");
                  navigation("/tables/client/");
                }
              } else {
                swal("Sorry wrong details", "Try again");
              }
            });
          } else {
            swal("Please Enter Your Details");
            setLoginStatus(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          {loginStatus ? (
            <MDAlert color="error" dismissible>
              Wrong{" "}
            </MDAlert>
          ) : (
            ""
          )}
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Email"
                onChange={handlePhone_number}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                onChange={handlePassword}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={handleSubmit}
                variant="gradient"
                color="info"
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
