import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./context/AuthProvider"; // Đảm bảo rằng đường dẫn chính xác
import { BrowserRouter as Router, RouterProvider } from "react-router-dom"; // Nếu bạn đang sử dụng React Router
import router from "./routers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </React.StrictMode>
);

reportWebVitals();
