import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Cookies, useCookies } from "react-cookie";
function Invoice({ id, deed_number, title_deed, date, blockchainHash }) {
  const printRowToPDF = () => {
    window.open(
      `http://localhost/backend/offer_letter/pdf.php?row_id=${id}&deed_number=${deed_number}&title_deed=${title_deed}&date=${date}$blockchainHash=${blockchainHash}`,
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
        <MDTypography variant="caption" fontWeight="regular" color="text">
          {blockchainHash}
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

Invoice.propTypes = {
  id: PropTypes.string.isRequired,
  deed_number: PropTypes.string.isRequired,
  title_deed: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  blockchainHash: PropTypes.string.isRequired,
};

const MyTitleDeeds = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL; // Make sure this is set in .env
  const cookies = useCookies(["user_id"]);
  const user_id = cookies.user_id;
  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/web5/all_title_deeds`, {
          params: {
            user_id: user_id,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching title deeds: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MDBox p={3}>
      <MDTypography variant="h4" fontWeight="medium" mb={3}>
        Title Deeds
      </MDTypography>
      <ul>
        {data.map((deed) => (
          <Invoice
            key={deed.id}
            id={deed.id.toString()}
            deed_number={deed.title_deed_number}
            title_deed={deed.title_deed_name}
            date={new Date().toLocaleDateString()}
            blockchainHash={deed.transaction_hash}
          />
        ))}
      </ul>
    </MDBox>
  );
};

export default MyTitleDeeds;
