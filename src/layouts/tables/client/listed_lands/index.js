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
import { Grid, Card, Typography } from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { useNavigate } from "react-router-dom";
import ClientDashboardLayout from "examples/LayoutContainers/DashboardLayout/client_dashboard_layout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useParams } from 'react-router-dom';

function ListedLands() {

    // let { listed_land_id } = useParams();
    let { listed_land_id } = 15;

 const [projects, setProjects] = useState([]);
 const navigate = useNavigate();
 const baseUrl = "http://localhost/backend/web5";



 useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/listed_land`,  { params: { listed_land_id:  listed_land_id } });
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
          <Grid item xs={12} md={6} xl={3} key={index}>
            <DefaultProjectCard
              image={land$sale} // Assuming each project has an image property
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
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "Buy",
              }}
              authors={project.authors} // Assuming each project has an authors array
            />
          </Grid>
        ))}
      </Grid>
    </ClientDashboardLayout>
 );
}

export default ListedLands;
