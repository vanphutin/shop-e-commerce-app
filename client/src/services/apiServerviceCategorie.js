import { toast } from "react-toastify";
import axios from "../utils/AxiosCustom";

const getAllCategories = () => {
  return axios.get("/category");
};

const createCategory = (category) => {
  return axios.post("/category", category).catch(function (error) {
    console.error(
      "Error posting category:",
      error.response ? error.response.data : error.message
    );
    throw error;
  });
};

export { getAllCategories };
export { createCategory };
