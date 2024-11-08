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
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import axios from "axios";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import container from "assets/theme/components/container";
import 'react-phone-number-input/style.css' 
import PhoneInput from "react-phone-number-input";
function Cover() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [land, setLand] = useState();
  const [land_process, setLand_process] = useState();
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [date_of_birth, setDate_of_birth] = useState();
  const [nationId, setNationId] = useState('');
  const [address, setAddresss] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');


  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value.toString());
  };
 
  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value.toString());
  };
  const handleAddress = (event) => {
    event.preventDefault();
    setAddresss(event.target.value.toString());
  };
  const handlePhoneNumber = (event) => {
   
    setPhoneNumber(event.toString());
  };
  const handleConfirmPassword = (event) => {
    event.preventDefault();
    setConfirmPassword(event.target.value.toString());
  };
  const handleNationId = (event) => {
    event.preventDefault();
    setNationId(event.target.value.toString());
  };
  const handleDate_of_birth = (event) => {
    
    setDate_of_birth(event.toString());
  };
  const handleFullName = (event) => {
    event.preventDefault();
    setFullName(event.target.value.toString());
  };

  const handleGender = (event) => {
    // event.preventDefault();
    setGender(event.toString());
  };

  const genderOptions = ['Male', 'Female', 'Other'];
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const handleSubmit = async () => {
  

    axios
      .post(`${baseUrl}/web5/users/index.php`, {
        full_name: fullName,
        phone_number: phoneNumber,
        password: password,
        address: address,
        private_key: confirmPassword,
        public_key: date_of_birth,
        wallet: email,
        land: nationId,
        land_process: gender,
      })
      .then(function (response) {
        console.log("-----------start--------");
        console.log(response.data);
        console.log("----end----------");

        navigation("authentication/sign-in/", {
          land: land,
        });
      });
  };

  return (
    <BasicLayout image={bgImage}>
       <Grid
        container
        justifyContent="center"
        style={{ height: "100vh", alignItems: "center" }}
      >
          
      <Card component={Grid} spacing={6} p={2}  justifyContent="center"
        style={{ height: "100vh", alignItems: "space-between" }}>
 
 
       < Grid container spacing={2}>
        
     
       <Grid item xs={32} sm={12}>
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
            Register
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details
          </MDTypography>
        </MDBox>
                  </Grid>  
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Full Name"
                        variant="standard"
                        onChange={handleFullName}
                        fullWidth
                      />
                    </MDBox>
                  </Grid> 
                 
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Nation ID Number"
                        variant="standard"
                        onChange={handleNationId}
                        fullWidth
                      />
                    </MDBox>
                  </Grid> 
                 
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      
                      <MDInput
                        type="date"
                        label="Date Of Birth"
                        variant="standard"
                        onChange={handleDate_of_birth}
                        fullWidth
                      />
                    </MDBox>
                  </Grid> 
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="address"
                        label="Address"
                        variant="standard"
                        onChange={handleAddress}
                        fullWidth
                      />
                    </MDBox>
                  </Grid> 
                  <Grid item xs={12} sm={8}>
                    <MDBox mb={2}>
                  
                      <label htmlFor='gender'>Gender : </label>
                      <select
                      id="gender"
                      value={gender}
                      onChange={handleGender}>
                        {genderOptions.map((option) =>(
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    
                    </MDBox>
                  </Grid> 
                 
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                     
                        type="email"
                        label="Email"
                        variant="standard"
                        onChange={handleEmail}
                        fullWidth
            
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="password"
                        label="Password"
                        variant="standard"
                        onChange={handlePassword}
                        fullWidth
                      />
                    </MDBox>
                  </Grid> 
                  <Grid item xs={12} sm={4}>
                    <MDBox mb={2}>
                      <MDInput
                        type="password"
                        label="Confirm Password"
                        variant="standard"
                        onChange={handleConfirmPassword}
                        fullWidth
                      />
                    </MDBox>
                  </Grid> 
                  <Grid item xs={12} sm={8}>
                    <MDBox mb={2}>
                      <PhoneInput 
                       onChange={handlePhoneNumber}
                      defaultCountry="MW"
                      placeholder="Enter Phone Number"/>
                     
                    </MDBox>
                  </Grid> 
                  <Grid item xs={12} sm={11}>
                  <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
                  </Grid> 
                  
                  <Grid item xs={12} sm={10}>
                  <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                onClick={handleSubmit}
                fullWidth
              >
                sign up
              </MDButton>
              <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
            </MDBox>
                  </Grid> 
                
                  
                  
                  
                  
          
       

        </Grid>
    
      </Card>
      </Grid>
      </BasicLayout>
  );
}

export default Cover;
