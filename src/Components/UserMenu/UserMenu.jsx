import React, { useContext, useState } from "react";
import "./UserMenu.css";
import { uploadImage } from "../../api";
import { Link } from "react-router-dom";
const UserMenu = () => {
  // const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await uploadImage(formData, token).then((data) => {
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {/* <IoMdArrowDropup className="user-menu-arrow" /> */}
      <div className="user-menu">
        <ul>
          <li>
            <label htmlFor="upload-photo">
              change photo
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                onChange={handleImageChange}
                // disabled
              />
            </label>
          </li>
          <li>
            <Link
              to={`${token} ? "./" :"/signin"`}
              onClick={() => {
                if (token) {
                  localStorage.removeItem("token");
                }
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
