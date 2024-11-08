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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Invoice({ id, deed_number, title_deed, date }) {
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const printRowToPDF = () => {
    window.open(
      `http://localhost/backend/offer_letter/pdf.php?row_id=${id}&deed_number=${deed_number}&title_deed=${title_deed}&date=${date}`,
      "_blank"
    );
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title_deed}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text">
          {deed_number}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" fontWeight="regular" color="text">
          {date}
        </MDTypography>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          ml={3}
          sx={{ cursor: "pointer" }}
        >
          <button onClick={printRowToPDF}>
            <Icon fontSize="small">picture_as_pdf</Icon>

            <MDTypography variant="button" fontWeight="bold">
              &nbsp;PDF
            </MDTypography>
          </button>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// // Setting default values for the props of Invoice
// Invoice.defaultProps = {
//   noGutter: false,
// };

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
