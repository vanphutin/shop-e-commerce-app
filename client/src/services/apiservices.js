import axios from "../utils/AxiosCustom";
const postCreateUser = async (
  UserFirstName,
  UserLastName,
  UserCity,
  UserCountry,
  Birthday,
  UserName,
  UserPassword,
  UserEmail,
  Role,
  Gender
) => {
  try {
    // Tạo đối tượng dữ liệu
    const data = {
      UserFirstName,
      UserLastName,
      UserCity,
      UserCountry,
      Birthday,
      UserName,
      UserPassword,
      UserEmail,
      Role,
      Gender,
    };

    // Log dữ liệu để debug
    console.log("Data to be sent:", data);

    // Gửi dữ liệu dưới dạng JSON
    const response = await axios.post("/auth/register", data, {
      headers: {
        "Content-Type": "application/json", // Cài đặt Content-Type cho JSON
      },
    });
    console.log("response", response);
    return response; // Trả về đối tượng Axios response
  } catch (error) {
    console.error("Error posting user:", error); // In lỗi ra console
    // Ném lỗi để người gọi xử lý
    throw error;
  }
};

const postLogin = (UserEmail, UserPassword) => {
  return axios.post("/auth/login", {
    UserEmail,
    UserPassword,
  });
};

// Client-side code
const patchRegisterSeller = async (
  id,
  UserFirstName,
  UserLastName,
  UserCity,
  UserCountry,
  UserAvatar, // This should be the file object
  Role
) => {
  try {
    const form = new FormData();
    form.append("id", id);
    form.append("UserFirstName", UserFirstName);
    form.append("UserLastName", UserLastName);
    form.append("UserCity", UserCity);
    form.append("UserCountry", UserCountry);
    form.append("UserAvatar", UserAvatar); // Ensure this matches the field name in the server
    form.append("Role", Role);

    const response = await axios.patch("/user/register-seller", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response; // Return the full Axios response object
  } catch (error) {
    // Re-throw the error so it can be handled by the caller
    throw error;
  }
};

export { postCreateUser };
export { postLogin };
export { patchRegisterSeller };
