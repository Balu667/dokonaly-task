import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(Boolean(user));
  console.log(user, "in dashboard component");
  return (
    <div className="dashboard-section">
      <h1 className="title">Welcome To Dokonaly</h1>
      <h3 className="title">Mr {user ? user.user.name : ""}</h3>
    </div>
  );
};
