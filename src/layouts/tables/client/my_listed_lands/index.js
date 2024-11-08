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
import { Grid, Card, Typography, Modal } from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { useNavigate, Routes, Route} from 'react-router-dom';
import ClientDashboardLayout from "examples/LayoutContainers/DashboardLayout/client_dashboard_layout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import land4sale from "assets/images/land4sale.webp"
import LandListedDetails from "../land_listed_details.js";
import { useCookies } from "react-cookie";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox/index.js";
import MDInput from "components/MDInput/index.js";
import MDTypography from "components/MDTypography/index.js";

import swal from "sweetalert";
import MDButton from "components/MDButton/index.js";


function MyListedLands() {
 const [projects, setProjects] = useState([]);
 const [buyClicked, setBuyClicked] = useState(false)
 const navigate = useNavigate();
 const [cookies, setCookie, removeCookie] = useCookies(["land_listed_id"]);
 const baseUrl = "http://localhost/backend/web5";

const [price, setPrice] = useState()
const [land_id, setLand_id] = useState()
 const phoneNumber = cookies.phone_number;
const [message, setMessage]= useState("Lodinng...")
const [listed_id , setListed_id]= useState("14")
const [data_status, setData_status] = useState(false)
const handleBuyClick = () => {
  setBuyClicked(!buyClicked)
   };
   const handleMints = () => {
    axios
      .put(`${baseUrl}/land_layouts/index.php`, null, {
        params: { land_code: land_id, price: price },
      })
      .then((response) => {
        // Handle success, e.g., update state or show a success message
        console.log(response.data);
       
        swal("Great Job !! you  Un listed Land", land_id.toString(), "success");
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        swal("Failed to list Land", error.toString(), "error");
        // Handle error, e.g., show an error message to the user
      });
  };
     const handlePriceChange = (event) => {
    
        event.preventDefault();
        setPrice(event.target.value);
    
       };
       
// const handleBuyClick = (projectId) => {
//   setListed_id(projectId.toString())
//   console.log(`projet id is:`, projectId)
//   setCookie("listed_land_id", projectId, { path: "/" });
//  navigate(`/tables/client/land_listed_details/${projectId}`);

// };
 useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/my_listed_lands/`,{params:{
          owner: phoneNumber
        }});
        if(response.data <1){
          setMessage("You dont have Lands")
        }else{
        setProjects(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
 }, [baseUrl]);

 return (
  
    <ClientDashboardLayout>
      <DashboardNavbar />
      <Routes>
      <Route path="/tables/client/land_listed_details/${projectId}" element={<LandListedDetails  projectId={listed_id}/>} />
      </Routes>
      
      <Grid container spacing={6} p={2}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} xl={3} key={index}>
            <DefaultProjectCard
              image={land4sale} // Assuming each project has an image property
              label={`Land #${index + 1}`}
              title={project.title} // Assuming each project has a title property
              description={project.description} 
              land_owner ={project.full_name}
              location ={"Mzuzu"}
              listed_id= {project.id}
              price = {project.price}
              size={project.size}// Assuming each project has a description property
              action={{
                type: "internal",
               
                color: "info",
                label: "view",
                onClick: () => handleBuyClick, // Add this line
              }}
              
              authors={project.authors} // Assuming each project has an authors array
            />
            <MDButton onClick={()=>{
setPrice(project.price.toString())
setLand_id(project.id)
handleBuyClick()
            }}>Un List</MDButton> 
          </Grid>
        ))}
      </Grid>
      { buyClicked && <Modal open={handleBuyClick}>
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
                Sell Land
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
                        label="Receiving Wallet"
                        value= {phoneNumber}
                        variant="standard"
                        
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={32} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Set Price (MK)"
                       
                        variant="standard"
                        onChange={handlePriceChange}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={32} sm={3}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Plot #"
                        value= {land_id}
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
                        Pay
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
    </ClientDashboardLayout>
 );
}

export default MyListedLands;


