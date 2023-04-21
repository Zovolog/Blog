import "./BlogPage.css";
import logo from "./572.png";
import { token } from "../../App";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const BlogPage = () => {
  const { accessToken, getAccessToken } = useContext(token);
  const userName = sessionStorage.getItem("userName");
  const [name, getName] = useState("");
  const [text, getText] = useState("");
  const [count, setCount] = useState(0);
  const [data, getData] = useState([]);
  const createPost = () => {
    axios
      .post("https://posts-5wdw.onrender.com/create-post", {
        username: userName,
        postname: name,
        posttext: text,
      })
      .then(function (response) {
        console.log(response.data);
        setCount(count + 1);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    axios
      .get("https://posts-5wdw.onrender.com/posts")
      .then(function (response) {
        console.log(response.data.data);
        getData(response.data.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://posts-5wdw.onrender.com/posts")
      .then(function (response) {
        console.log(response.data.data);
        getData(response.data.data);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, [count]);
  return (
    <div>
      <div className="blog-header">
        <img src={logo} alt="logo" style={{ height: "100%" }} />
        {userName ? (
          <p>Привіт, {userName}!</p>
        ) : (
          <Link to={"/sign-in"}>You need to login!</Link>
        )}
      </div>
      <div className="blog-main">
        {accessToken ? (
          <div>
            <p className="blog-head-text">Create post block</p>
            <div className="blog-input-block">
              <input
                type="text"
                placeholder="Type name of post..."
                className="small-input"
                onChange={(e) => getName(e.currentTarget.value)}
              />

              <textarea
                placeholder="Type your thoughts"
                className="big-input"
                onChange={(e) => getText(e.currentTarget.value)}
              ></textarea>
              <button className="blog-bt" onClick={createPost}>
                Create post
              </button>
            </div>
          </div>
        ) : (
          <div className="blog-head-text">
            You need to be <Link to={"/sign-in"}>loggined</Link> to create
            posts!
          </div>
        )}
        <p className="blog-head-text">Post list</p>
        <div className="blog-list">
          {data.map((post, i) => (
            <Link to={`/blog-page/blog/${post.id}`} key={i}>
              <div key={i} className="post">
                <p className="post-date">{post.created_at}</p>
                <div className="row post-name">
                  <img
                    alt="icon"
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user_name}`}
                    className="blog-icon"
                  />
                  <p>
                    {post.user_name} created {post.post_name}{" "}
                  </p>
                </div>
                <p className="post-text">{post.post_text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
