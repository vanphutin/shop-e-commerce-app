import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const PrivateRouter = (allowedRoles) => {
  // Lấy thông tin người dùng từ Redux store
  const { user } = useContext(AuthContext);

  // Kiểm tra quyền
  return user && allowedRoles?.includes(user.role);
};

export default PrivateRouter;
