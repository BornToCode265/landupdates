import React, { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";

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
          `http://localhost/backend/web5/listed_lands`
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
          { Header: "Land ID", accessor: "land_id" },
          { Header: "Description", accessor: "description" },

          { Header: "Size", accessor: "size" },
          {
            Header: "Layout",
            accessor: "layout",
            Cell: ({ value }) => (
              <button onClick={() => handleLayoutClick(value)}>View Map</button>
            ),
          },
          { Header: "Price", accessor: "price" },
        ],
        rows: data.map((item) => ({
          id: item.id,
          land_id: item.land_id,
          description: item.description,
          type: item.type,
          size: item.size,
          layout: item.layout,
          price: item.price,
        })),
      }}
    />
  );
};

export default DynamicDataTable;
