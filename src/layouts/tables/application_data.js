import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import swal from "sweetalert";
import { Cookies, useCookies } from "react-cookie";

const ApplicationDataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [cookies] = useCookies(["user_id"]);
  const user_id = cookies.user_id;

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/web5/applications/`, {});
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (applicationId, action) => {
    console.log(`here app id:   -----end`, applicationId);
    try {
      const response = await axios.put(`${baseUrl}/web5/application/`, {
        params: {
          id: applicationId,
          accepted: action,
        },
      });
      if (response.data.status === "success") {
        swal("Success", response.data.message, "success");
        fetchApplications(); // Refresh data
      } else {
        swal("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      swal("Error", "Failed to update application status", "error");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <DataTable
      table={{
        columns: [
          { Header: "Land ID", accessor: "land_id" },
          { Header: "Applicant Name", accessor: "full_name" },
          { Header: "Price", accessor: "price" },
          { Header: "Size", accessor: "size" },
          { Header: "Type", accessor: "type" },
          {
            Header: "Layout",
            accessor: "layout",
            Cell: ({ value }) => <MDButton variant="gradient">View</MDButton>,
          },
          {
            Header: "Action",
            accessor: "application_id",
            Cell: ({ value }) => (
              <>
                <MDButton
                  variant="gradient"
                  onClick={() => handleAction(value, 3)}
                >
                  Approve
                </MDButton>
                <MDButton
                  variant="gradient"
                  color="error"
                  onClick={() => handleAction(value, 2)}
                >
                  Disapprove
                </MDButton>
              </>
            ),
          },
        ],
        rows: data.map((item) => ({
          land_id: item.land_id,
          full_name: item.full_name,
          price: item.price,
          size: item.size,
          type: item.type,
          layout: item.layout,
          application_id: item.id,
        })),
      }}
    />
  );
};

export default ApplicationDataTable;
