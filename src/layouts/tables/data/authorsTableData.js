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

// axios
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useState, useRef, useEffect } from "react";

export default function data() {
  var imageA = [],
    nameA = [],
    emailA = [],
    addressA = [],
    landProcess;

  const Author = ({ imageT, nameT, emailT }) => {
    const [id, setId] = useState("9");
    const [url, setUrl] = useState("http://localhost/backend/images/");
    const [description, setDescription] = useState("Description");
    const [coordinates, setCoordinates] = useState("Bearing Url");
    const [feeAmount, setFeeAount] = useState("Fee Amount");
    const [feeAccount, setFeeAccount] = useState("Fee Account");
    const [approver, setApprover] = useState("Approver");
    const [totalSupply, setTotalSupply] = useState("Get");
    const [landTotalCounter, setLandTotalCounter] = useState("0");
    const [price, setPrice] = useState("1");
    const baseUrl = process.env.REACT_BACKEND_BASE_URL;
    const getDetails = async () => {
      try {
        axios
          .get(`${baseUrl}backend/users/ `)
          .then(function (response) {
            const res = response.data;

            res.map((results) => {
              nameA.push(results.name);
              emailA.push(results.email);
              imageA.push(results.image);
              addressA.push(results.address);
            });
          });
      } catch (error) {
        console.log(error);
      }

      const countLand = await landProcess.getlandCount();
      const tempDesc = await landProcess.getDescription(countLand.toString());
      const tempCoords = await landProcess.getCoordinates(countLand.toString());
      const tempPrice = await landProcess.getTotalPrice(countLand.toString());
      const tempApprover = await landProcess.getApprover();
      const tempfeeAccount = await landProcess.getFeeAccount();
      const tempFeePercent = await landProcess.getFeePercent();

      setDescription(tempDesc);
      setTotalSupply(countLand.toString());
      setCoordinates(tempCoords);
      setPrice(tempPrice);
      setApprover(tempApprover.toString());

      setFeeAccount(tempfeeAccount.toString());
      setFeeAount(tempFeePercent.toString());
    };
  };

  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={imageA} name={nameA} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {nameA}
        </MDTypography>
        <MDTypography variant="caption">{emailA}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: (
          <Author
            image={team2}
            name="John Michael"
            email="john@creative-tim.com"
          />
        ),
        function: <Job title="Manager" description="Organization" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="online"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author
            image={team3}
            name="Alexa Liras"
            email="alexa@creative-tim.com"
          />
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="offline"
              color="dark"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author
            image={team4}
            name="Laurent Perrier"
            email="laurent@creative-tim.com"
          />
        ),
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="online"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author
            image={team3}
            name="Michael Levi"
            email="michael@creative-tim.com"
          />
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="online"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author
            image={team3}
            name="Richard Gran"
            email="richard@creative-tim.com"
          />
        ),
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="offline"
              color="dark"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author
            image={team4}
            name="Miriam Eric"
            email="miriam@creative-tim.com"
          />
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="offline"
              color="dark"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            14/09/20
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
