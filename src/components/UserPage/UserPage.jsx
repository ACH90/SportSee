import React from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";

const UserPage = () => {
  const { id } = useParams();
  return <UserProfile userId={id} />;
};

export default UserPage;
