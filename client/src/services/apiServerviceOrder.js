import axios from "../utils/AxiosCustom";

const postOrder = async (
  OrdersID,
  UserID,
  ProductID,
  quantity,
  total_price
) => {
  return axios.post("/order", {
    OrdersID,
    UserID,
    ProductID,
    quantity,
    total_price,
  });
};

export { postOrder };
