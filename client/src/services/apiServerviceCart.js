import axios from "../utils/AxiosCustom";

const postAddCart = (UserID, ProductID, quantity, size, notes) => {
  return axios.post("/cart/add", { UserID, ProductID, quantity, size, notes });
};
export { postAddCart };
