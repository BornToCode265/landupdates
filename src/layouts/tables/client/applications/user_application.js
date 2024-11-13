import React, { useState, useEffect } from "react";
import {
  Modal,
  Grid,
  Card,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { Cookies, useCookies } from "react-cookie";
import { stringify } from "stylis";

const UserApplicationsModal = ({ open, onClose }) => {
  const baseUrl = "http://localhost/backend";
  const [lands, setLands] = useState([]);
  const [selectedLandCode, setSelectedLandCode] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState(null);

  const [cookies] = useCookies(["user_id"]);
  const userId = cookies.user_id;

  // Fetch all available lands when the component mounts
  useEffect(() => {
    const fetchLands = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/web5/my_applications`);
        setLands(response.data);
      } catch (error) {
        console.error("Error fetching land data:", error);
        setError("Failed to load land data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLands();
  }, [userId]);

  // Handle selection of a land code
  const handleLandCodeChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedLandCode(selectedCode);

    // Find and set the description of the selected land
    const selectedLand = lands.find((land) => land.land_id === selectedCode);
    if (selectedLand) {
      setDescription(selectedLand.description);
    } else {
      setDescription("");
    }
  };
  // Handle application submission
  // Handle application submission
  const handleSubmitApplication = async (event) => {
    event.preventDefault();
    if (!selectedLandCode) {
      setError("Please select a valid land code.");
      swal("Please Select Land code", "error");
      return;
    }

    setApplying(true);
    const applicationData = { land_code: selectedLandCode, user_id: userId };

    console.log("Application Data:", applicationData);

    try {
      // Send POST request with applicationData in the request body
      const response = await axios.post(
        `${baseUrl}/web5/application/`,
        applicationData
      );

      console.log("Response:", response.data);
      swal(
        "Application Submitted!",
        "Your land application was successful.",
        "success"
      );
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      setError(
        "There was an issue submitting your application. Please try again."
      );
      swal(
        "Error",
        "There was an issue submitting your application. Please try again.",
        "error"
      );
    } finally {
      setApplying(false);
    }
  };

  // Handle modal cancel action
  const handleCancel = () => {
    setSelectedLandCode("");
    setDescription("");
    setError(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <Box
              sx={{
                p: 3,
                textAlign: "center",
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="h4" fontWeight="medium">
                Apply for Land Registration
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {loading ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                  <Typography variant="body1" ml={2}>
                    Loading available lands...
                  </Typography>
                </Box>
              ) : (
                <form onSubmit={handleSubmitApplication}>
                  <TextField
                    select
                    fullWidth
                    label="Select Land Code"
                    value={selectedLandCode}
                    onChange={handleLandCodeChange}
                    SelectProps={{ native: true }}
                    variant="outlined"
                    margin="normal"
                  >
                    <option value="" disabled>
                      Select a land code
                    </option>
                    {lands.map((land) => (
                      <option key={land.id} value={land.land_id}>
                        {land.land_id}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Land Description"
                    variant="outlined"
                    value={description}
                    multiline
                    rows={3}
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText="Description of the selected land"
                  />
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={applying}
                    >
                      {applying ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                    <Button
                      variant="warning"
                      color="primary"
                      onClick={handleCancel}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default UserApplicationsModal;
