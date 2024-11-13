import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import swal from "sweetalert";
import { useCookies } from "react-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ApplicationDataTable = () => {
  const [isLoading, setIsLoading] = useState(true); // For initial data fetch
  const [isActionLoading, setIsActionLoading] = useState(false); // For actions like Approve/Disapprove
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [cookies] = useCookies(["user_id"]);
  const user_id = cookies.user_id;
  const [data, setData] = useState([]);

  const fetchApplications = async () => {
    setIsLoading(true); // Start initial loading animation
    try {
      const response = await axios.get(`${baseUrl}/web5/applications/`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
    setIsLoading(false); // Stop initial loading animation
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (applicationId, action) => {
    setIsActionLoading(true); // Start loading animation for the action
    try {
      const response = await axios.put(`${baseUrl}/web5/applications/`, {
        id: applicationId,
        accepted: action,
      });

      console.log(`response from put request: `, response.data);
      if (response.data.status === "success") {
        swal("Success", response.data.message, "success");
        fetchApplications(); // Refresh data after action
      } else {
        swal("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      swal("Error", "Failed to update application status", "error");
    }
    setIsActionLoading(false); // Stop loading animation for the action
  };

  // Display loading spinner while initial data is being fetched
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DataTable
      table={{
        columns: [
          { Header: "Application ID", accessor: "application_id" },

          { Header: "Land ID", accessor: "application_land_id" },
          { Header: "Price", accessor: "price" },
          { Header: "Size", accessor: "size" },

          {
            Header: "Layout",
            accessor: "layout",
            Cell: ({ value }) =>
              value ? <MDButton variant="gradient">View</MDButton> : "N/A",
          },
          {
            Header: "Action",
            accessor: "accepted",
            Cell: ({ row }) => {
              const { application_id, accepted } = row.original;

              // Define button configurations based on application state
              const buttonConfig = {
                0: [
                  { label: "Cancel Application", action: 1, color: "success" },
                  { label: "Delete", action: 4, color: "error" },
                ],
                1: [
                  { label: "Reactivate", action: 0, color: "info" },
                  { label: "Cancel Approval", action: 2, color: "warning" },
                ],
                2: [
                  { label: "Cancel", action: 1, color: "warning" },
                  { label: "Apply Title Deed", action: 6, color: "success" },
                ],
                3: [
                  { label: "Approve", action: 2, color: "success" },
                  { label: "Cancel Disapproval", action: 1, color: "warning" },
                ],
                6: [
                  {
                    label: "Cancel Title deed application",
                    action: 2,
                    color: "warning",
                  },
                  { label: "", action: 6, color: "disabled" },
                ],
              };

              // Retrieve appropriate buttons for current state
              const buttons = buttonConfig[accepted];

              return (
                <>
                  {buttons.map(({ label, action, color }) => (
                    <MDButton
                      key={label}
                      variant="gradient"
                      color={color}
                      onClick={() => handleAction(application_id, action)}
                      disabled={isActionLoading} // Disable buttons during action loading
                    >
                      {isActionLoading ? <CircularProgress size={16} /> : label}{" "}
                      {/* Show loading spinner on button during action */}
                    </MDButton>
                  ))}
                </>
              );
            },
          },
        ],
        rows: data.map((item) => ({
          application_id: item.application_id,
          full_name: item.full_name || "N/A",
          phone_number: item.phone_number || "N/A",
          email: item.email || "N/A",
          application_land_id: item.application_land_id || "N/A",
          price: item.price || "N/A",
          size: item.size || "N/A",
          type: item.type || "N/A",
          layout: item.layout || "N/A",
          accepted: item.accepted,
        })),
      }}
    />
  );
};

export default ApplicationDataTable;
