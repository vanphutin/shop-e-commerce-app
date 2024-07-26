import axios from "../utils/AxiosCustom";

// Hàm getAllProducts lấy tất cả sản phẩm cho một người dùng dựa trên id
const getAllProducts = (id) => {
  return axios.get("/product", {
    params: { id }, // Truyền id dưới dạng tham số truy vấn
  });
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

export { getAllProducts };
export { postCreateProduct };
