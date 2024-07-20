const express = require("express");
const authRoutes = require("./auth.router");

module.exports = (app) => {
  const router = express.Router();
  router.use("/auth", authRoutes); // Mount the auth routes
  app.use("/api/v1", router); // Mount the API version 1 routes
};
