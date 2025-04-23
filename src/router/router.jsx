// src/router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
// Pages
import UserProfile from "../components/UserProfile/UserProfile.jsx";
// Layout
import Layout from "../Layout/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "user/:userId", // Relatif, sans "/"
        element: <UserProfile />,
      },
    ],
  },
]);

console.log("Router is set up with the following routes:", router);

export default router;
