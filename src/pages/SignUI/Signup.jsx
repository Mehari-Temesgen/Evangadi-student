import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { motion as m } from "framer-motion";
axios.defaults.baseURL = "https://evangadi-forum-whkm.onrender.com";
const Signup = () => {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [register, setRegister] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
  });
  const { email, password, firstname, lastname, username } = register;
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/users/register", register)
      .then((data) => {
        setError(null);
        // console.log(data.data);
        Navigate("/signin");
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err.response.data.msg);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="sign-form sign-up">
        <m.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <h2 className="">Join the network</h2>
          <div
            style={{
              color: "red",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error && <div className="">{error}</div>}
          </div>
          <p>
            <span>Already have an account? </span>

            <Link to="/signin"> Sign in</Link>
          </p>
        </m.div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleChange}
            />
            <div className="names">
              <input
                name="firstname"
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={handleChange}
              />
              <input
                name="lastname"
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={handleChange}
              />
            </div>
            <input
              name="username"
              type="text"
              placeholder="User Name"
              value={username}
              onChange={handleChange}
            />
            <input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            {!click ? (
              <FaRegEyeSlash
                className="eye"
                style={{
                  position: "absolute",
                  top: "58%",
                  right: "2%",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  opacity: "0.5",
                }}
                onClick={() => {
                  setClick(!click);
                  setShow(true);
                }}
              />
            ) : (
              <MdOutlineRemoveRedEye
                className="eye"
                style={{
                  position: "absolute",
                  top: "58%",
                  right: "2%",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  color: "#fe8402",
                }}
                onClick={() => {
                  setClick(!click);
                  setShow(false);
                }}
              />
            )}
            <div className="agree">
              <p>
                <span>
                  I agree to the <a href="#"> Privacy Policy </a>and
                  <a href="#"> terms of service.</a>
                </span>
              </p>
            </div>
            <button>Agree and Join</button>
            <div className="account">
              <Link to="/signin">Already have an account? </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
