import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../utils/firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../../pages/Login/Login.css";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const StudentRegister = () => {
  const navigate = useNavigate();
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    qualification: "",
    branch: "",
    regdno: "",
    pyear: "",
  });
  const {
    name,
    email,
    password,
    mobile,
    gender,
    qualification,
    branch,
    regdno,
    pyear,
  } = userRegister;
  console.log("state", userRegister);

  const auth = getAuth();
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // console.log(userRegister);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigate("/");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters");
        }
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
      });
  };
  const handleRegisterChange = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Student Registration</h1>
      <form onSubmit={handleRegisterSubmit}>
        <div className="login-input-box">
          <label>Enter your Name</label>
          <input
            type="text"
            required
            name="name"
            value={userRegister.name}
            onChange={handleRegisterChange}
          />
        </div>
        <div className="login-input-box">
          <label>Enter your Email</label>
          <input
            type="email"
            required
            name="email"
            value={userRegister.email}
            onChange={handleRegisterChange}
          />
        </div>
        <div className="login-input-box">
          <label>Enter your Password</label>
          <input
            type="password"
            required
            name="password"
            value={userRegister.password}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="login-input-box">
          <label>Enter your Mobile Number</label>
          <input
            type="number"
            required
            name="mobile"
            value={userRegister.mobile}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="login-input-box">
          <label>Enter your Gender</label>
          <select
            style={{ height: "40px" }}
            name="gender"
            required
            value={userRegister.gender}
            onChange={handleRegisterChange}
          >
            <option>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* <div className="login-input-box">
          <label>Enter your Institution Name</label>
          <input
            type="text"
            required
            name="institution"
            value={userRegister.institution}
            onChange={handleRegisterChange}
          />
        </div> */}

        <div className="login-input-box">
          <label>Enter your Qualification</label>
          <input
            type="text"
            required
            name="qualification"
            value={userRegister.qualification}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="login-input-box">
          <label>Enter your Registration Number</label>
          <input
            type="number"
            required
            name="regdno"
            value={userRegister.regdno}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="login-input-box">
          <label>Enter your Branch</label>
          <select
            style={{ height: "40px" }}
            name="branch"
            required
            value={userRegister.branch}
            onChange={handleRegisterChange}
          >
            <option>Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EE">EE</option>
            <option value="I&E">I&E</option>
            <option value="CE">CE</option>
            <option value="ME">ME</option>
          </select>
        </div>

        <div className="login-input-box">
          <label>Enter your Passout Year</label>
          <input
            type="date"
            required
            name="pyear"
            value={userRegister.pyear}
            onChange={handleRegisterChange}
          />
        </div>

        <div className="login-input-box">
          <button>Signup</button>
        </div>
      </form>
      <div className="login-input-box" style={{ textAlign: "center" }}>
        <p>
          Already have an account !{" "}
          <span className="render-to-signup">
            <Link to="/login">Sign in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
