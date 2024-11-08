import React, { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import MDButton from "components/MDButton";
import swal from "sweetalert";
//Axios imports

import { ethers } from "ethers";
import LandTransfersContractAbi from "assets/contractsData/LandTransfersContract.json";
import LandTransfersContractAddress from "assets/contractsData/LandTransfersContract-address.json";
import { date } from "yup";

const ApplicationDataTable = () => {
  const [data, setData] = useState([]);
  const [blockChainData, setBlockChainData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  const price = "9500";

  const handleLayoutClick = (landCode) => {
    axios
      .put(`${baseUrl}/web5/approve/`, {
        params: { land_code: landCode.value },
      })
      .then((response) => {
        // Handle success, e.g., update state or show a success message
        console.log(response.data);

        swal("Great Job ", landCode.toString(), "success");
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        swal("Failed to list Land", error.toString(), "error");
        // Handle error, e.g., show an error message to the user
      });
  };

  const handleMints = async (land_code_id) => {
    //creating provider
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const private_key =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(private_key, provider);

    //instance of contract for land transfers
    const LandProcessContract = new ethers.Contract(
      LandTransfersContractAddress.address,
      LandTransfersContractAbi.abi,
      wallet
    );

    //getting address
    const address = await wallet.getAddress();
    //console.log("Wallet address:", address);

    try {
      const response = await axios.get(
        `http://localhost/backend/web5/web3/title_deeds/`,
        {
          params: {
            listed_land_id: land_code_id.value.toString(),
          },
        }
      );

      setBlockChainData(response.data);

      const increment_land = await LandProcessContract.getTotal();
      const land_new_id = parseInt(increment_land) + 1;

      const title_deed_number = response.data[0]["land_id"];
      const title_deed_name = response.data[0]["full_name"];
      const land_code = response.data[0]["land_id"] + land_new_id.toString();
      const owner_nation_id = response.data[0]["nation_id"];
      const owner_phone_number = response.data[0]["phone_number"];
      const land_type = response.data[0]["type"];
      const land_layout_url = response.data[0]["layout"];

      const tx = await LandProcessContract.make_transaction(
        title_deed_number.toString(),
        title_deed_name.toString(),
        land_code.toString(),
        owner_nation_id.toString(),
        owner_phone_number.toString(),
        land_type.toString(),
        land_layout_url.toString()
      );

      // console.log("----tx start ---")
      // console.log(tx.hash)
      // console.log("----end----")

      try {
        axios
          .post(`${baseUrl}/web5/web3/title_deeds/index.php`, {
            tx_hash: tx.hash,
            title_deed_number: title_deed_number.toString(),
            title_deed_name: title_deed_name.toString(),
            land_code: land_code.toString(),
            owner_nation_id: owner_nation_id.toString(),
            owner_phone_number: owner_phone_number.toString(),
            land_type: land_type.toString(),
            land_layout_url: land_layout_url.toString(),
          })
          .then(function (response) {
            console.log(response.data);
            try {
              //update table of land to nomal land
              axios
                .put(`${baseUrl}/web5/web3/title_deeds/index.php`, null, {
                  params: { land_code: land_code_id.value.toString() },
                })
                .then((response) => {
                  // Handle success, e.g., update state or show a success message
                  console.log(response.data);

                  swal(
                    "You have add approved the title deed",
                    land_code.toString(),
                    "success"
                  );
                })
                .catch((error) => {
                  console.error("Error uploading file", error);
                  swal("Failed to list Land", error.toString(), "error");
                  // Handle error, e.g., show an error message to the user
                });
            } catch (error) {
              console.log(error);
            }
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/backend/web5/application`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      table={{
        columns: [
          { Header: "Land ID", accessor: "land_id" },
          { Header: "Applicant Name", accessor: "applicant_name" },

          { Header: "Price", accessor: "price" },
          { Header: "Size", accessor: "size" },
          { Header: "Type", accessor: "type" },
          {
            Header: "Layout",
            accessor: "layout",
            Cell: ({ value }) => (
              <MDButton
                variant="gradient"
                color="primary"
                onClick={() => handleLayoutClick(value)}
              >
                view
              </MDButton>
            ),
          },

          {
            Header: "Action",
            accessor: "accepted",
            Cell: ({ value }) => (
              <MDButton
                variant="gradient"
                color="warning"
                onClick={handleMints({ value })}
              >
                {" "}
                Approve{" "}
              </MDButton>
            ),
          },
        ],
        rows: data.map((item) => ({
          land_id: item.land_id,
          applicant_name: item.full_name,
          price: item.price,
          size: item.size,
          type: item.type,
          layout: item.layout,

          accepted: item.land_id,
        })),
      }}
    />
  );
};

export default ApplicationDataTable;
