import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import swal from "sweetalert";
import { useCookies } from "react-cookie";

const ApplicationDataTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const [cookies] = useCookies(["user_id"]);
  const user_id = cookies.user_id;
  const [data, setData] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/web5/applications/`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (applicationId, action) => {
    console.log(
      `applications id : ${applicationId}== and accepted flag ${action} ---end`
    );
    try {
      const response = await axios.put(`${baseUrl}/web5/applications/`, {
        id: applicationId,
        accepted: action,
      });

      console.log(`response from put request : `, response.data);
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
          { Header: "Application ID", accessor: "application_id" },
          { Header: "Applicant Name", accessor: "full_name" },
          { Header: "Phone Number", accessor: "phone_number" },
          { Header: "Email", accessor: "email" },
          { Header: "Land ID", accessor: "application_land_id" },
          { Header: "Price", accessor: "price" },
          { Header: "Size", accessor: "size" },
          { Header: "Type", accessor: "type" },
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

              // Define button pairs based on `accepted` status
              const renderButtons = () => {
                switch (accepted) {
                  case 0: // New Application
                    return (
                      <>
                        <MDButton
                          variant="gradient"
                          onClick={() => handleAction(application_id, 2)}
                          color="success"
                        >
                          Approve
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          color="error"
                          onClick={() => handleAction(application_id, 3)}
                        >
                          Disapprove
                        </MDButton>
                      </>
                    );
                  case 1: // Canceled
                    return (
                      <>
                        <MDButton
                          variant="gradient"
                          onClick={() => handleAction(application_id, 0)}
                          color="info"
                        >
                          Reapply
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          color="error"
                          onClick={() => handleAction(application_id, 4)} // Assuming 4 is a "delete" or similar action
                        >
                          Delete
                        </MDButton>
                      </>
                    );
                  case 2: // Approved
                    return (
                      <>
                        <MDButton
                          variant="gradient"
                          color="warning"
                          onClick={() => handleAction(application_id, 1)}
                        >
                          Suspend Approval
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          color="error"
                          onClick={() => handleAction(application_id, 4)}
                        >
                          Disapprove
                        </MDButton>
                      </>
                    );
                  case 3: // Disapproved
                    return (
                      <>
                        <MDButton
                          variant="gradient"
                          color="primary"
                          onClick={() => handleAction(application_id, 4)}
                        >
                          Delete
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          onClick={() => handleAction(application_id, 0)}
                        >
                          Cancel Disapproval
                        </MDButton>
                      </>
                    );
                  case 4:
                    return null;
                  case 6: // apply for titlte deed
                    return (
                      <>
                        <MDButton
                          variant="gradient"
                          onClick={() => handleAction(application_id, 6)}
                        >
                          Re View Apllication
                        </MDButton>
                      </>
                    );
                  default:
                    return null;
                }
              };

              return renderButtons();
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
