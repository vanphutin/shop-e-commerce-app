import axios from "../utils/AxiosCustom";

const getAllProducts = (sort, categories) => {
  let url = "/product?";

  if (sort) {
    url += `sort=${sort}&`;
  }

  if (categories && categories.length > 0) {
    url += `categories=${categories.join(",")}&`;
  }

  // Xóa '&' cuối nếu cần thiết
  url = url.endsWith("&") ? url.slice(0, -1) : url;

  return axios.get(url);
  // try {
  //   const response = await axios.get(url);
  //   return response; // Trả về dữ liệu từ phản hồi
  // } catch (error) {
  //   console.error(
  //     "Error fetching products:",
  //     error.response ? error.response.data : error.message
  //   );
  //   throw error; // Ném lỗi để người gọi xử lý
  // }
};

const postCreateProduct = async (
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductLongDesc,
  ProductCategoryID,
  ProductStock,
  ProductImage,
  id
) => {
  try {
    const formData = new FormData();
    formData.append("ProductName", ProductName);
    formData.append("ProductPrice", ProductPrice);
    formData.append("ProductWeight", ProductWeight);
    formData.append("ProductLongDesc", ProductLongDesc);
    formData.append("ProductCategoryID", ProductCategoryID);
    formData.append("ProductStock", ProductStock);
    formData.append("ProductImage", ProductImage);
    formData.append("UserID", id);

    // Log dữ liệu để debug
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // Gửi dữ liệu dưới dạng FormData
    const response = await axios.post("/product/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Cài đặt Content-Type cho FormData
      },
    });
    console.log("response", response);
    return response; // Trả về đối tượng Axios responses
  } catch (error) {
    console.error("Error posting user:", error); // In lỗi ra console
    // Ném lỗi để người gọi xử lý
    throw error;
  }
};

const getDetailProduct = (id) => {
  return axios.get(`product/detail/${id}`);
};
const deleteProduct = (ProductID, UserID) => {
  return axios.patch(`product/delete/${ProductID}`, { UserID });
};

const updateProduct = (
  ProductID,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductLongDesc,
  ProductStock,
  UserID
) => {
  return axios.patch(`product/update/${ProductID}`, {
    ProductName,
    ProductPrice,
    ProductWeight,
    ProductLongDesc,
    ProductStock,
    UserID,
  });
};

const getSearchProduct = (keyword) => {
  let url = "/product/search?";

  if (keyword) {
    url += `keyword=${keyword}`;
  }
  return axios.get(url);
};

export { getAllProducts };
export { postCreateProduct };
export { getDetailProduct };
export { deleteProduct };
export { updateProduct };
export { getSearchProduct };
