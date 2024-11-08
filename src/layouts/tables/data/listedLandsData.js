/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure you have axios installed: npm install axios

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { Icon } from "@mui/material";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";

const DynamicRowsListed = () => {
  const [rowsData, setRowsData] = useState([]);
  const baseUrl = process.env.REACT_BACKEND_BASE_URL;
  useEffect(() => {
    // Assuming your PHP API endpoint is at 'http://localhost/api/get-rows'
    const fetchRowsData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/web5/listed_lands`
        );
        setRowsData(response.data);
      } catch (error) {
        console.error("Error fetching rows data:", error);
      }
    };

    fetchRowsData();
  }, []);

  const Project = ({ land_code, size, view }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography
        display="block"
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
      >
        {land_code}
      </MDTypography>
      <MDTypography
        display="block"
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
      >
        {size}
      </MDTypography>
      <MDTypography
        display="block"
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
      >
        {view}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {100}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={100} />
      </MDBox>
    </MDBox>
  );

  return (
    <div>
      {rowsData.map((row, index) => (
        <MDBox key={index} display="flex" alignItems="center" lineHeight={1}>
          <Project image={LogoAsana} name={row.name} />
          <MDTypography
            component="a"
            href="#"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            {row.budget}
          </MDTypography>
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {row.status}
          </MDTypography>
          <Progress color="info" value={row.completion} />
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        </MDBox>
      ))}
    </div>
  );
};

export default DynamicRowsListed;
