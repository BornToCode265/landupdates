import React, { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import MDButton from "components/MDButton";
import swal from "sweetalert";

const DynamicDataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  // Fetch data from the title deeds endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/web5/title_deed`);
        console.log("Fetched Data:", response.data); // Debugging
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  // Handle Approve action
  const handleApprove = async (applicationId) => {
    console.log("Approving Application ID:", applicationId); // Debugging
    try {
      const response = await axios.get(`${baseUrl}/web5/title_deeds`, {
        params: {
          applicationId: applicationId,
        },
      });

      console.log("Approval Response:", response.data); // Debugging

      if (response.data.status === "success") {
        swal(
          "Approved",
          "The title deed application has been approved.",
          "success"
        );
      } else {
        swal("Error", "Failed to approve the application.", "error");
      }
    } catch (error) {
      console.error("Error approving application:", error);
      swal("Error", "Failed to approve the application.", "error");
    }
  };

  // Handle Disapprove action
  const handleDisapprove = (applications_id) => {
    console.log("Disapproving Application ID:", applications_id); // Debugging
    swal(
      "Disapproved",
      "The title deed application has been disapproved.",
      "info"
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      table={{
        columns: [
          { Header: "Application #", accessor: "applications_id" },
          { Header: "Applicant Name", accessor: "user_name" },
          { Header: "Applicant National ID", accessor: "nation_id" },
          { Header: "Land Description", accessor: "land_description" },
          { Header: "Land Size", accessor: "land_size" },
          { Header: "Land Price", accessor: "land_price" },
          { Header: "Application Date", accessor: "application_date" },
          {
            Header: "Land Layout",
            accessor: "land_layout",
            Cell: ({ value }) => (
              <MDButton
                variant="gradient"
                color="primary"
                onClick={() => window.open(value, "_blank")}
              >
                View Layout
              </MDButton>
            ),
          },
          {
            Header: "Action",
            accessor: "actions",
            Cell: ({ row }) => {
              const { applications_id } = row.original;
              return (
                <>
                  <MDButton
                    variant="gradient"
                    color="success"
                    onClick={() => handleApprove(applications_id)}
                  >
                    Approve
                  </MDButton>
                  <MDButton
                    variant="gradient"
                    color="warning"
                    onClick={() => handleDisapprove(applications_id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Disapprove
                  </MDButton>
                </>
              );
            },
          },
        ],
        rows: data.map((item) => ({
          applications_id: item.applications_id,
          user_name: item.full_name,
          nation_id: item.nation_id,
          land_description: item.description,
          land_size: item.size,
          land_price: item.price,
          application_date: item.application_date,
          land_layout: item.land_layout,
        })),
      }}
    />
  );
};

export default DynamicDataTable;
