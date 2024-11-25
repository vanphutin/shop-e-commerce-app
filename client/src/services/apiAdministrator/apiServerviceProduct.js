import axios from "../../utils/AxiosCustom";

const getAllProducts = () => {
  return axios.get("/products");
};

export { getAllProducts };
