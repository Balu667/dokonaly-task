import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="dashboard-section">
      <h1 className="title">Welcome To Dokonaly</h1>
      <h3 className="title">Mr {user && user.data ? user.data.userName : ""}</h3>
    </div>
  );
};
