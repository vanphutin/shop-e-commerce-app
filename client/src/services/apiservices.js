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
    const form = new FormData();
    form.append("UserFirstName", UserFirstName);
    form.append("UserLastName", UserLastName);
    form.append("UserCity", UserCity);
    form.append("UserCountry", UserCountry);
    form.append("Birthday", Birthday);
    form.append("UserName", UserName);
    form.append("UserPassword", UserPassword);
    form.append("UserEmail", UserEmail);
    form.append("Role", Role);
    form.append("Gender", Gender);

    const response = await axios.post("/auth/register", form);
    return response; // Return the full Axios response object
  } catch (error) {
    // Re-throw the error so it can be handled by the caller
    throw error;
  }
};

export { postCreateUser };
