
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
          `http://localhost/backend/web5/approving`
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
          { Header: "ID", accessor: "id" },
          { Header: "Plot #", accessor: "land_id" },
          { Header: "New Owner", accessor: "full_name" },

          { Header: "Land Loard", accessor: "land_loard" },
          {
            Header: "Action",
            accessor: "offer_accepted",
            Cell: ({ value }) => (<>
            
          
              <MDButton variant="gradient"
                        color="warning"onClick={() => handleLayoutClick(value)}>Approve</MDButton>
              </>
            ),
          },
          { Header: "view", accessor: "layout",Cell: ({ value }) => (
            
            <MDButton variant="gradient"
                          onClick={() => handleLayoutClick(value)}>view</MDButton>
          
             
             ), },
        ],
        rows: data.map((item) => ({
          id: item.id,
          land_id: item.land_id,
          full_name: item.full_name,
          land_loard: item.land_loard,
          layout: item.layout,
        
          
        })),
      }}
    />
  );
};

export default DynamicDataTable;
