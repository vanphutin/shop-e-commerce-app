import logo from "./logo.svg";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import "react-tooltip/dist/react-tooltip.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
