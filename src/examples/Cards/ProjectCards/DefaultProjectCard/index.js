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
import { Link } from "react-router-dom";
import { useNavigate, Route, Routes } from 'react-router-dom';

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import { Grid, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { layouts } from "chart.js";
import LandListedDetails from "layouts/tables/client/land_listed_details.js";
import { useParams } from 'react-router-dom';


function DefaultProjectCard({ image, price, title, size, listed_id, land_owner, location, layout, action, authors }) {

 const  LandBuyUrl = '/tables/client/LandListedDetails'
 
// Inside your component
const navigate = useNavigate();
// Navigate to the desired route and pass the projectId as a parameter

const handleBuyClick = (projectId) => {
  // Navigate to the desired route and pass the projectId as a parameter
  window.location.href = `/tables/client/land_listed_details/`;
 };
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
        <Routes>
      <Route path="/tables/client/land_listed_details" element={<LandListedDetails  projectId={listed_id}/>} />
      </Routes>
      
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    ><Routes>
      <Route path="/tables/client/LandListedDetails/:projectId" element={<LandListedDetails />} />
      </Routes>
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
         size(ha) :{size}
        </MDTypography>
        </MDBox>
        <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
         location :{location}
        </MDTypography>
        </MDBox>
        <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
         price :{price}
        </MDTypography>
       

        <MDBox mb={1}>
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
           owner :  {land_owner}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
             <Grid container spacing={2} alignItems="center">
             <Grid item>
               <MDButton
                
               
                 variant="outlined"
                 size="small"
                 color={action.color}
                 sx={{ marginRight: 2 }} // Add spacing between buttons
                 onClick={() => handleBuyClick(listed_id)}
               >
                 {action.label}
               </MDButton>
             </Grid>
             <Grid item>
             view<IconButton component={Link} to={layout} color={action.color}>
                 <VisibilityIcon />
               </IconButton>
             </Grid>
           </Grid>
         
            
          ) : (
            <MDButton
            
              component="a"
              href={`/tables/client/land_listed_details/`}
              target="/tables/client/land_listed_details/"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
