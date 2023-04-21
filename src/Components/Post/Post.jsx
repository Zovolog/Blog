import { token } from "../../App";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../BlogPage/572.png";
export const Post = () => {
  const { accessToken, getAccessToken } = useContext(token);
  const userName = sessionStorage.getItem("userName");
  const { id } = useParams();
  return (
    <div className="blog-header">
      <img src={logo} alt="logo" style={{ height: "100%" }} />
      {userName ? (
        <p>Привіт, {userName}!</p>
      ) : (
        <Link to={"/sign-in"}>You need to login!</Link>
      )}
      <p>{id}</p>
    </div>
  );
};
