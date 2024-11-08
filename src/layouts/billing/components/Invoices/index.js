import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Invoice from "layouts/billing/components/Invoice";
import axios from "axios";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  useEffect(async () => {

    try {
      const response = await axios.get(`http://localhost/backend/web5/title_deeds/`);
      console.log(`hey prince am here` ,response.data)
      setInvoices(response.data)
    } catch (error) {
      console.log(error)
    }
   
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" fontWeight="medium">
          Land Deeds
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          Search
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {invoices.map((invoice, index) => (
            <Invoice
              id={invoice.land_code
              }
              key={index}
              title_deed={invoice.title_deed_name}
              deed_number={invoice.title_deed_number}
              date={invoice.transaction_hash
                }
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
