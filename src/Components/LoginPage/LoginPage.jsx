import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/form.css";
import { token } from "../../App";
export const LoginPage = () => {
  const [login, getLogin] = useState("");
  const [password, getPassword] = useState("");

  const { accessToken, getAccessToken } = useContext(token);
  const navigate = useNavigate();

  useEffect(() => {
    getAccessToken(false);
    sessionStorage.clear();
  }, []);

  const sendData = (e) => {
    console.log(login, password);
    e.preventDefault();
    axios
      .post("https://posts-5wdw.onrender.com/login", {
        username: login,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "ok") {
          getAccessToken(true);
          sessionStorage.setItem("token", true);
          sessionStorage.setItem("userName", login);
          navigate("/blog-page", { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <p className="form-header">Login Page</p>
        <input
          type="text"
          placeholder="Enter login..."
          onChange={(e) => getLogin(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Enter password..."
          onChange={(e) => getPassword(e.currentTarget.value)}
        />
        <div className="bt-row">
          <Link to={"/sign-up"}>Don`t have an account?</Link>
          <button className="form-bt" onClick={sendData}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
