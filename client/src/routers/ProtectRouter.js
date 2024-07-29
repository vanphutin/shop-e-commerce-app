import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
  });
  return <Outlet />;
};
export default ProtectRouter;
