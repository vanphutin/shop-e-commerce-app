import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./content/Sidebar";

const SidebarLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          flexGrow: 1,
          padding: "20px",
          background: "rgba(233,233,233,0.75)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
