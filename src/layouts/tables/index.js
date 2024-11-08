/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useRef, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";

//Axios imports
import axios from "axios";
import { ethers } from "ethers";

// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
// @mui material components

import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Icon, IconButton } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout/land.js";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";
import { array } from "prop-types";
import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";
import MDAlert from "components/MDAlert";
import DataTable from "react-data-table-component";
import { ModalDialog } from "react-bootstrap";
function Tables() {
  // const column = [
  //   {
  //     name: "id",
  //     selector: row => row.id
  //   },
  //   {
  //     name: "uri",
  //     selector: row => row.uri
  //   },
  //   {
  //     name: "landloard",
  //     selector: row => row.landloard
  //   },
  //   {
  //     name: "description",
  //     selector: row => row.description
  //   }
  // ]

  // useEffect(()=>{
  // const fetchData = async ()=>{
  //   axios('http://localhost/backend/images/').then(res=>setRecord(res.data)).catch((err)=>console.log(err));
  // }
  // fetchData();
  // })

  // const [record, setRecord]= useState([]);

  const [, dispatch] = useMaterialUIController();
  const baseUrl = process.env.REACT_BACKEND_BASE_URL;
  const [landId, setLandId] = useState(9);
  const [id, setId] = useState(9);
  const [land_loard, setLand_loard] = useState("");
  const [searchId, setSearchId] = useState(3);
  const [tempTurl, setTempUrl] = useState("http://localhost/backend/images/");
  const [url, setUrl] = useState("http://localhost/backend/images/");
  const [description, setDescription] = useState("Description");
  const [coordinates, setCoordinates] = useState("Bearing Url");
  const [feeAmount, setFeeAount] = useState("Fee Amount");
  const [feeAccount, setFeeAccount] = useState("Fee Account");
  const [approver, setApprover] = useState("Approver");
  const [totalSupply, setTotalSupply] = useState("Get");
  const [landTotalCounter, setLandTotalCounter] = useState("0");
  const [price, setPrice] = useState("1");
  const [name, setName] = useState("Mw Land");
  const [symbol, setSymbol] = useState("ML");
  const [buyer, setBuyer] = useState("Buyer nn Address");
  const [seller, setSeller] = useState("sell");
  const [landRegistered, setLandRegistered] = useState("0");
  const [listedLands, setListedLands] = useState("seller nn Address");
  const [LandOwners, setLandOwners] = useState("0");
  const inputFile = useRef(null);
  const [mintedPercentage, setMintedPrecentage] = useState("0");
  const [showForm, setShowForm] = useState(false);
  const [land, setLand] = useState("");
  const [landProcess, setLandProcess] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);


  const [cookies] = useCookies(["phone_number"]);
  const phone_number = cookies.phone_number;

  

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleMints = () => {
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    formData.append("land_loard", land_loard);
    formData.append("description", description);
    formData.append("coordinates", coordinates);

    axios
      .post(`${baseUrl}/uploads/index.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle success, e.g., update state or show a success message
        setUrl(response.data);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        // Handle error, e.g., show an error message to the user
      });
  };



  //listening to events

  //   const handleMints = async ()=>{

  //     let mintArray = [];
  //     axios.post("http://localhost/backend/images/index.php",

  //     ).then(function(response){
  //       console.log("-----------hello--------")
  //       console.log(response.data)
  //       console.log("----end----------")

  //     })
  // // const url = await land.tokenURI(counts.toString())
  // //     mintArray.push({
  // //       landId: counts.toString(),
  // //       landAddress: nft,
  // //       landUrl : url
  // //     })
  // //    setMints(mints.push(mintArray))
  //   }

  const loadRecent = async () => {
    try {
      const res = await fetch(`${baseUrl}/backend/images/`);
      const json = await res.json();
      //setCid(json.ipfs_pin_hash);
    } catch (e) {
      //console.log(e.toString());
    }
  };
  const getDetails = async () => {
    const countLand = await landProcess.getlandCount();
    const tempDesc = await landProcess.getDescription(countLand.toString());
    const tempCoords = await landProcess.getCoordinates(countLand.toString());
    const tempPrice = await landProcess.getTotalPrice(countLand.toString());
    const tempApprover = await landProcess.getApprover();
    const tempfeeAccount = await landProcess.getFeeAccount();
    const tempFeePercent = await landProcess.getFeePercent();
    const tempLandOwners = await landProcess.getLandOwners();
    const tempRegisteredLands = await landProcess.getTotalRegisteredLand();

    setLandRegistered(tempRegisteredLands.toString());
    setLandOwners(tempLandOwners.toString());
    setDescription(tempDesc.toString());
    setTotalSupply(countLand.toString());
    setCoordinates(tempCoords.toString());
    setPrice(tempPrice.toString());
    setApprover(tempApprover.toString());

    setFeeAccount(tempfeeAccount.toString());
    setFeeAount(tempFeePercent.toString());

    const per = ((countLand - tempRegisteredLands) / countLand) * 100;

    setMintedPrecentage(per.toString().concat(" %"));

    getName();
    getSymbol();
  };
  const setDetails = async () => {
    const tempApprover = await landProcess.setApproval(approver);
    const tempfeeAccount = await landProcess.setFeeAccount(feeAccount);
    const tempFeePercent = await landProcess.setFeePercent(feeAmount);
  };

  // const registerLand = async () => {
  //   loadRecent();

  //   // mint nft
  //   try {
  //     await land.mint(url.toString());
  //     // get tokenId of new nft
  //     const idc = await land.totalSupply();

  //     // approve landProces to spend nft
  //     await land.setApprovalForAll(landProcess.address, true);
  //     setId(idc.toString());
  //     // // add nft to landProcess
  //     //const listingPrice = ethers.utils.formatUnits("1")

  //     // console.log("----------------stert---------");
  //     // console.log(`land addres ${land.address.toString()}`)
  //     // console.log(`land addres ${description.toString()}`)
  //     // console.log(`land addres ${coordinates.toString()}`)
  //     // console.log(`-----------end  ${land.address.toString()}`)

  //     const price1 = ethers.utils.parseUnits(price);

  //     await await landProcess.makeland(
  //       land.address.toString(),
  //       description.toString(),
  //       coordinates.toString()
  //     );
  //     setLandTotalCounter(id.toString());
  //     console.log(`successful listing ${id.toString()}`);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const finishRegisterLand = async () => {
    console.log("----------------stert---------");

    console.log(`owner addres ${seller.toString()}`);
    console.log(`id ${landId.toString()}`);
    console.log(`-----------end  ${land.address.toString()}`);

    try {
      await await landProcess.registerLand(
        landId.toString(),
        seller.toString()
      );
      //setLandTotalCounter(landId.toString())
      console.log(`successful listing ${landId.toString()}`);
    } catch (e) {
      console.log(e.toString());
    }
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleApprover = (event) => {
    setApprover(event.target.value);
  };
  const handleBuyer = (event) => {
    setBuyer(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value.toString());
    console.log("price is:", event.target.value);
  };
  const handleFeeAccount = (event) => {
    setFeeAccount(event.target.value.toString());
    console.log("fee account is:", event.target.value);
  };
  const handleFeeAmount = (event) => {
    setFeeAount(event.target.value.toString());
    console.log("fee amount is:", event.target.value);
  };
  const handleCoordinates = (event) => {
    setCoordinates(event.target.value);
  };
  const handleLand_loard = (event) => {
    setLand_loard(event.target.value);
  };

  const handleLandId = (event) => setLandId(event.target.value);

  const fetchLandUrl = async () => {
    try {
      axios
        .get(`${baseUrl}/backend/image/`, {
          params: {
            id: searchId,
          },
        })
        .then(function (response) {
          const res = response.data;

          res.map((results) => {
            // console.log("----------start--- id -------");
            // console.log(results.uri);
            // console.log("--------------end----- id----");
            setTempUrl(results.uri);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getName = async () => {
    const name = await land.name();
    setName(name.toString());
  };

  const getSymbol = async () => {
    const symbl = await land.symbol();
    setSymbol(symbl.toString());
  };

  const handleSeller = (event) => {
    setSeller(event.target.value);
    fetchLandUrl();
  };

  // useEffect(() => {
  //   try {
  //     axios
  //       .get(
  //         "http://localhost/backend/auth",

  //         { params: { phone_number: phone_number } }
  //       )
  //       .then(function (response) {
  //         const res = response.data;

  //         //setUserName(res[0].full_name.toString());
  //         //  setLand(JSON.parse(res[0].land))
  //         //  setLandProcess(JSON.parse(res[0].land_process))
  //         // const lan = JSON.parse(res[0].land);

  //         // const name = await lan.symbol()
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   //landProcess.on("Minted", handleMints)

  //   return () => {
  //     // landProcess.removeAllListeners("Minted")
  //   };
  // }, []);

  //const [showModal, setShowModal] = useState(false);
  return (
    <>
      <DashboardLayout>
        {/*        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              
            </Grid>
          </Grid>
        </MDBox>
 
      
      <Footer /> */}
      </DashboardLayout>
    </>
  );
}

function name(params) {}

export default Tables;
