import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a
          href="/"
          className="text-decoration-none"
          style={{ color: "inherit" }}
        >
          Sidebar
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink
            to="/admin"
            // className={({ isActive }) => (isActive ? "activeClicked" : "")}
          >
            <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "activeClicked" : "")}
          >
            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            to="/admin/product"
            className={({ isActive }) => (isActive ? "activeClicked" : "")}
          >
            <CDBSidebarMenuItem icon="table">Product</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            to="/admin/profile"
            className={({ isActive }) => (isActive ? "activeClicked" : "")}
          >
            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) => (isActive ? "activeClicked" : "")}
          >
            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            to="/admin/hero404"
            className={({ isActive }) => (isActive ? "activeClicked" : "")}
          >
            <CDBSidebarMenuItem icon="exclamation-circle">
              404 page
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <hr />
        <div style={{ padding: "20px 5px" }}>
          by
          <p>Van Phu Tin</p>
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
