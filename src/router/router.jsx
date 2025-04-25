// src/router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
// Pages
import UserProfile from "../pages/UserProfile/UserProfile.jsx";
// Layout
import Layout from "../Layout/Layout.jsx";
// import Activity from "../components/Activity/Activity.jsx";
// import AverageSessions from "../components/AverageSessions/AverageSessions.jsx";
// import Perf from "../components/Perf/Perf.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "user/:userId", // Relatif, sans "/"
        element: <UserProfile />,
      },
      // {
      //   path: "user/:userId/activity",
      //   element: <Activity />,
      // },
      // {
      //   path: "user/:userId/average-sessions",
      //   element: <AverageSessions />,
      // },
      // {
      //   path: "user/:userId/performance",
      //   element: <Perf />,
      // },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
