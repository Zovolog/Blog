import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { token } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/form.css";

export const RegistrationPage = () => {
  const [login, getLogin] = useState("");
  const [validateLogin, showValidateLogin] = useState("");
  const [password, getPassword] = useState("");
  const [repeatPassword, getRepeatPassword] = useState("");
  const [validatePassword, showValidatePassword] = useState("");
  const navigate = useNavigate();
  const { accessToken, getAccessToken } = useContext(token);
  useEffect(() => {
    getAccessToken(false);
    sessionStorage.clear();
  }, []);
  const sendData = (e) => {
    e.preventDefault();
    if (!login.trim()) {
      showValidateLogin("Login can`t be empty!");
    } else if (!password.trim()) {
      showValidatePassword("Password can`t be empty");
    } else if (password !== repeatPassword) {
      showValidatePassword("Passwords are different");
    } else {
      showValidateLogin("");
      showValidatePassword("");
      axios({
        url: `https://posts-5wdw.onrender.com/registration`,
        method: "post",
        headers: {},
        data: {
          username: login,
          password: password,
        },
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data.status === "ok") {
            alert(response.data.message);
            navigate("/sign-in", { replace: true });
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    }
    showValidateLogin("");
  };
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <p className="form-header">Registration Page</p>
        <input
          type="text"
          placeholder="Enter login..."
          onChange={(e) => getLogin(e.currentTarget.value)}
        />
        <p>{validateLogin}</p>
        <input
          type="password"
          placeholder="Enter password..."
          onChange={(e) => getPassword(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Repeat password..."
          onChange={(e) => getRepeatPassword(e.currentTarget.value)}
        />
        <p>{validatePassword}</p>
        <div className="bt-row">
          <button className="form-bt" onClick={sendData}>
            Register
          </button>
          <Link to={"/sign-in"}>Already have account?</Link>
        </div>
      </div>
    </div>
  );
};
