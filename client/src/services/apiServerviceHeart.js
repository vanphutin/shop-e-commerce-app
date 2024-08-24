import axios from "../utils/AxiosCustom";

const postFavouriteProducts = (UserID, productID) => {
  return axios.post(`/heart/is-heart/${productID}`, { UserID });
};
const getFavourite = (UserID) => {
  return axios.get(`/heart/is-heart/${UserID}`);
};
export { postFavouriteProducts };
export { getFavourite };
