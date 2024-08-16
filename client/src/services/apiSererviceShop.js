import axios from "../utils/AxiosCustom";

const getShopInfo = async (userid, categorie) => {
  let url = `/shop/${userid}/product?`;

  if (categorie && categorie.length > 0) {
    url += `categories=${categorie}`;
  }

  return axios.get(url);
};

export { getShopInfo };
