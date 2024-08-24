import React, { useContext, useState } from "react";
import FormModal from "../components/profile/FormModal";
import { AuthContext } from "../context/AuthProvider";
import HOST_IMG from "../components/common/HostImg";
import { ModalEdit } from "../components/profile/ModalEdit";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = () => {
    setShow(true);
  };
  return (
    <div className="profile container">
      <div className="profile__header">
        <div className="profile__header-logo">
          <img
            src={`${HOST_IMG}/${user?.avatar}`}
            alt={user?.firstname}
            className="logo"
            height="100"
            width="100"
          />
          <button className="btn btn-dark edit mx-5" onClick={handleEdit}>
            Edit
          </button>
        </div>
        <div className="profile__header-name">
          <p className="fullname m-0">
            {user?.lastname} {user?.firstname}
          </p>
          <p className="username">@{user?.username}</p>
        </div>
      </div>
      <div className="profile__body ">
        {user && <FormModal user={user} display={false} disabled={true} />}
      </div>
      <ModalEdit
        show={show}
        handleClose={handleClose}
        user={user}
        display={true}
        disabled={false}
      />
    </div>
  );
};

export default ProfilePage;
