import React, { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import MDButton from "components/MDButton";
import swal from "sweetalert";
import { ethers } from "ethers";
import LandTransfersContractAbi from "assets/contractsData/LandTransfersContract.json";
import LandTransfersContractAddress from "assets/contractsData/LandTransfersContract-address.json";
import { useCookies } from "react-cookie";

const UserApplicationDataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [cookies] = useCookies(["user_id"]);
  const user_id = cookies.user_id;
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const getIsAcceptedStatus = (accepted) =>
    accepted === 1 ? "Accepted" : "Submitted";

  const handleLayoutClick = (landCode) => {
    axios
      .put(`${baseUrl}/web5/approve/`, { params: { land_code: landCode } })
      .then(() => {
        swal(
          "Success",
          `Land layout for ${landCode} is ready to view`,
          "success"
        );
      })
      .catch((error) => {
        console.error("Error accessing land layout", error);
        swal("Failed to view Land", error.toString(), "error");
      });
  };

  const handleMints = async (landCode) => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const privateKey =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(privateKey, provider);

    const LandProcessContract = new ethers.Contract(
      LandTransfersContractAddress.address,
      LandTransfersContractAbi.abi,
      wallet
    );

    try {
      const response = await axios.get(`${baseUrl}/web5/web3/title_deeds/`, {
        params: { listed_land_id: landCode },
      });

      const landData = response.data[0];
      const landNewId = (await LandProcessContract.getTotal()).toNumber() + 1;

      const tx = await LandProcessContract.make_transaction(
        landData.land_id.toString(),
        landData.full_name.toString(),
        `${landData.land_id}_${landNewId}`,
        landData.nation_id.toString(),
        landData.phone_number.toString(),
        landData.type?.toString() || "Unknown",
        landData.layout?.toString() || "N/A"
      );

      await axios.post(`${baseUrl}/web5/web3/title_deeds/index.php`, {
        tx_hash: tx.hash,
        title_deed_number: landData.land_id.toString(),
        title_deed_name: landData.full_name.toString(),
        land_code: `${landData.land_id}_${landNewId}`,
        owner_nation_id: landData.nation_id.toString(),
        owner_phone_number: landData.phone_number.toString(),
        land_type: landData.type?.toString() || "Unknown",
        land_layout_url: landData.layout?.toString() || "N/A",
      });

      swal(
        "Application Approved",
        `Title deed minted for ${landData.land_id}`,
        "success"
      );
    } catch (error) {
      console.error("Minting error: ", error);
      swal("Minting Failed", "Please try again later", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${baseUrl}/web5/my_applications`, {
          params: { user_id: user_id },
        });
        setData(response.data);
      } catch (error) {
        setError("Error fetching application data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, user_id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <DataTable
      table={{
        columns: [
          { Header: "Application ID", accessor: "id" },
          { Header: "Land ID", accessor: "land_id" },

          { Header: "Appliction Date", accessor: "application_date" },
          {
            Header: "Status",
            accessor: "accepted",
            Cell: ({ row }) => getIsAcceptedStatus(row.original.accepted),
          },
          {
            Header: "Action",
            accessor: "actions",
            Cell: ({ row }) => (
              <MDButton
                variant="gradient"
                color="warning"
                onClick={() => handleMints(row.original.land_id)}
              >
                Cancel
              </MDButton>
            ),
          },
        ],
        rows: data,
      }}
    />
  );
};

export default UserApplicationDataTable;
