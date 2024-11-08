import React from "react";
import { useLocation } from "react-router-dom";
import { List, Divider, Link, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

import PropTypes from "prop-types";
import Basicp from "layouts/tables/client/index";
import MyLands from "layouts/tables/client/my_lands/";
import MyListedLands from "layouts/tables/client/my_listed_lands/";
import MyTitleDeed from "layouts/tables/client/documets";
import UserApplicationsView from "layouts/tables/client/applications";

import { useEffect } from "react";

// react-router-dom components
import { NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

import { useCookies } from "react-cookie";

function ClientSidenav({ color, brand, brandName, ...rest }) {
  const [cookies, setCookie, removeCookie] = useCookies(["phone_number"]);

  const phone_number = cookies.phone_number;
  const user_name = cookies.full_name;
  // Static routes
  const routes1 = [
    {
      type: "collapse",
      name: "Listed Lands",
      key: "listed_ands",
      icon: <Icon fontSize="small">land</Icon>,
      route: "/tables/client/",
      component: <Basicp />,
    },
    {
      type: "collapse",
      name: "My Lands",
      key: "my_lands",
      icon: <Icon fontSize="small">land</Icon>,
      route: "/tables/client/my_lands/",
      component: <MyLands />,
    },
    {
      type: "collapse",
      name: "My Listed Lands",
      key: "my_listed_ands",
      icon: <Icon fontSize="small">land</Icon>,
      route: "/tables/client/my_listed_lands/",
      component: <MyListedLands />,
    },
    {
      type: "collapse",
      name: "My Applications",
      key: "my_application",
      icon: <Icon fontSize="small">land</Icon>,
      route: "/tables/client/applications/",
      component: <UserApplicationsView />,
    },
    {
      type: "collapse",
      name: "Title Deed",
      key: "my_title_deed",
      icon: <Icon fontSize="small">land</Icon>,
      route: "/tables/client/documets",
      component: <MyTitleDeed />,
    },
  ];

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    sidenavColor,
  } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /** 
    The event listener that's calling the handleMiniSidenav function when resizing the window.
   */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const renderRoutes = routes1.map(
    ({ type, name, icon, title, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink key={key} to={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }
      return returnValue;
    }
  );

  const renderExampleRoutes = routes1.map(
    ({ type, name, icon, title, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "examples") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink key={key} to={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
            />
          </NavLink>
        );
      }
      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <MDBox component="img" src={brand} alt="Brand" width="2rem" />
          )}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}
            >
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>
        <MDBox display="flex flex-col" alignItems="center">
          <MDTypography
            color={textColor}
            variant="body2"
            fontWeight="medium"
            pl="1.5rem"
          >
            {user_name}
          </MDTypography>
          {renderExampleRoutes}
        </MDBox>
        <Divider
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        ></Divider>
        {renderRoutes}
      </List>
      <MDBox p={2} mt="auto">
        <MDButton
          component="a"
          href="https://www.creative-tim.com/product/material-dashboard-pro-react-nodejs"
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          color={sidenavColor}
          fullWidth
        >
          Log Out
        </MDButton>
      </MDBox>
    </SidenavRoot>
  );
}

ClientSidenav.defaultProps = {
  color: "info",
  brand: "",
};

ClientSidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
};

export default ClientSidenav;
