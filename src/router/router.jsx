// src/router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
// Pages
import UserProfile from "../pages/UserProfile/UserProfile.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
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
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
