import axios from "../utils/AxiosCustom";

const postAddCart = (UserID, ProductID, quantity, size, notes) => {
  return axios.post("/cart/add", { UserID, ProductID, quantity, size, notes });
};

const getCartItems = (id) => {
  return axios.get("/cart/items", { params: { id } });
};
const deleteCartItem = (id) => {
  return axios.delete(`/cart/item/${id}`);
};
export { postAddCart };
export { getCartItems };
export { deleteCartItem };
