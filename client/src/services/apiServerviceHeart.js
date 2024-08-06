import axios from "../utils/AxiosCustom";

const postFavouriteProducts = (UserID, productID) => {
  return axios.post(`/heart/is-heart/${productID}`, { UserID });
};

export { postFavouriteProducts };
