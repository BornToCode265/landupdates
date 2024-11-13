import Icon from "@mui/material/Icon";

import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Profile from "layouts/profile";

import OffersView from "layouts/tables/offers_view";
import ApplicationsView from "layouts/tables/applicatios_view";
import RegisterView from "layouts/tables/register_view";
import LandView from "layouts/tables/land";
import ListedLandView from "layouts/tables/listed_view";
import Basicp from "layouts/tables/client";
import MyLands from "layouts/tables/client/my_lands/";
import MyListedLands from "layouts/tables/client/my_listed_lands/";
import LandListedDetails from "layouts/tables/client/land_listed_details.js";
import UserApplicationsView from "layouts/tables/client/applications/";

import MyTitleDeed from "layouts/tables/client/documets/";

import Register from "layouts/authentication/register";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Prepared Land",
    key: "prepared-land",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/tables/land",
    component: <LandView />,
  },
  {
    type: "collapse",
    name: "Listed Land",
    key: "listed-land",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/tables/listed_view",
    component: <ListedLandView />,
  },
  {
    type: "collapse",
    name: "Application",
    key: "application",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/tables/applicatios_view",
    component: <ApplicationsView />,
  },
  {
    type: "collapse",
    name: "Offers",
    key: "offers",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/tables/offers_view",
    component: <OffersView />,
  },

  {
    type: "collapse",
    name: "Documents",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "",

    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "",

    key: "land-page",
    route: "/authentication/register",
    component: <Register />,
  },

  {
    type: "collapse",
    name: "",

    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "",
    key: "listed_ands",

    route: "/tables/client/",
    component: <Basicp />,
  },
  {
    type: "collapse",
    name: "",
    key: "my_lands",

    route: "/tables/client/my_lands/",
    component: <MyLands />,
  },
  {
    type: "collapse",
    name: "",
    key: "my_application",

    route: "/tables/client/applications/",
    component: <UserApplicationsView />,
  },
  {
    type: "collapse",
    name: "",
    key: "my_title_deed",

    route: "/tables/client/documets/",
    component: <MyTitleDeed />,
  },
  {
    type: "collapse",
    name: "",
    key: "my_listed_lands",

    route: "/tables/client/my_listed_lands/",
    component: <MyListedLands />,
  },

  {
    type: "collapse",
    name: "",
    key: "land_listed_details",

    route: "/tables/client/land_listed_details/",
    component: <LandListedDetails />,
  },
];

export default routes;
