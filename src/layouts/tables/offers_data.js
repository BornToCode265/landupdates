import React, { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import MDButton from "components/MDButton";

const DynamicDataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const handleLayoutClick = (landUrl) => {
    const win = window.open(landUrl, "_blank");
    win.focus();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/backend/web5/customary/applications/`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      table={{
        columns: [
       
          { Header: "Application #", accessor: "application_id" },
          { Header: "Developmental Charge", accessor: "developmental_charge" },

          { Header: "Applicant Nation Id", accessor: "applicant_nation_id" },
          {
            Header: "Action",
            accessor: "offer_accepted",
            Cell: ({ value }) => (<>
            
           <MDButton variant="gradient"
                        color="primary" onClick={() => handleLayoutClick(value)}>Edit</MDButton>
         
              <MDButton variant="gradient"
                        color="warning"onClick={() => handleLayoutClick(value)}>Approve</MDButton>
              </>
            ),
          },
          { Header: "City Clearance", accessor: "city_layout" },
        ],
        rows: data.map((item) => ({
      
          application_id: item.id,
          developmental_charge: "9500",
          applicant_nation_id: item.national_id,
          offer_accepted: item.offer_accepted,
          city_layout: item.city_layout ? "ok": "No",
          
        })),
      }}
    />
  );
};

export default DynamicDataTable;
