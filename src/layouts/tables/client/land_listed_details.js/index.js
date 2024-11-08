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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Grid, Card, Typography } from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { useNavigate,Route, Routes } from "react-router-dom";
import ClientDashboardLayout from "examples/LayoutContainers/DashboardLayout/client_dashboard_layout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useCookies } from "react-cookie";

import List from "@mui/material";
//import MDTypography from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import land4sale from "assets/images/land4sale.webp"
import { useParams } from 'react-router-dom';

function LandListedDetails({projectId}) {
 const [cookies, setCookie] = useCookies(['land_listed_id']);
 const listed_id = cookies.land_listed_id;
 const phoneNumber = cookies.phone_number;
 console.log("------start----------")
 console.log(`listed is id`, listed_id)
 console.log(`project id `, phoneNumber)
 console.log("---------end----------")

 const [projects, setProjects] = useState([]);
 const navigate = useNavigate();
 //const { listed_id } = useParams();
 const baseUrl = "http://localhost/backend/web5";

 const [buyClicked , setBuyClicked] = useState(false)
 const [pin , setPin] = useState("")
 const handleBuyClick = () => {
setBuyClicked(!buyClicked)
 };
 const handleMints = () => {
  setBuyClicked(!buyClicked)
   };
   const handlePriceChange = () => {
    setBuyClicked(!buyClicked)
     };

 useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/listed_land`,{params
        :{
          listed_land_id: parseInt({projectId})
        }});
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
   
 }, [baseUrl]);

 return (
    <ClientDashboardLayout>
      <DashboardNavbar />

      <Grid container spacing={6} p={2}>
 {projects.map((project, index) => (
  
 
    <Grid item xs={12} key={index}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={land4sale} alt={`Land #${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={6}>
 <Grid container spacing={2}>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        Plot #
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        {`${index + 1}`}
      </MDTypography>
    </Grid>
 <Grid item xs={6}>
      <MDTypography variant="body2" >
        Owner
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        {project.full_name}
      </MDTypography>
    </Grid>
   
    
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        Size (ha)
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        {project.size}
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        Description
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2"  >
        {project.description} +  {listed_id}  ++
      </MDTypography>
    </Grid>

    <Grid item xs={6}>
      <MDTypography variant="body2" >
        Location
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        Mzuzu
      </MDTypography>
    </Grid>

    <Grid item xs={6}>
      <MDTypography variant="body2" >
        Tax (MK)
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        {project.price * 0.3}
      </MDTypography>
    </Grid>

    <Grid  item xs={6}>
      <MDTypography variant="body2" >
        Land Price (MWK)
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        {project.price}
      </MDTypography>
    </Grid>

    <Grid item xs={6}>
      <MDTypography variant="body2" >
        Total Price (MWK)
      </MDTypography>
    </Grid>
    <Grid item xs={6}>
      <MDTypography variant="body2" >
        {parseInt(project.price * 0.3) + parseInt(project.price)}
      </MDTypography>
    </Grid>

   

   
 </Grid>
 {
  buyClicked && <Modal open={handleBuyClick}>
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
            Pay
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
              <Grid item xs={32} sm={3}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Pin"
                    variant="standard"
                    onChange={handlePriceChange}
                    fullWidth
                  />
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={32} sm={3}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label={project.phone_number}
                    value= {project.phone_number}
                    variant="standard"
                    
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
                    onClick={handleBuyClick}
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
 }
 <MDButton
 variant="contained"
 color="primary"
 onClick={handleBuyClick}
 sx={{
    backgroundColor: '#007bff', // Customize the background color
    '&:hover': {
      backgroundColor: '#0056b3', // Darken the background color on hover
    },
    fontSize: '16px', // Adjust the font size
    fontWeight: 'bold', // Make the text bold
    padding: '10px 40px', // Double the horizontal padding to double the width
    borderRadius: '5px', // Add rounded corners
    textTransform: 'none', // Keep the text as is, without transforming to uppercase
    width: '100%', // Double the width
 }}
>
 Buy
</MDButton>
       </Grid>

      </Grid>
    </Grid>
  ))
  
  
  
  }


</Grid>


    </ClientDashboardLayout>
 );
}

export default LandListedDetails;
