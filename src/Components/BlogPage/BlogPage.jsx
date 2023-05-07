import "./BlogPage.css";
import logo from "./572.png";
import { token } from "../../App";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
export const BlogPage = () => {
  const { accessToken, getAccessToken } = useContext(token);
  const userName = sessionStorage.getItem("userName");
  const [name, getName] = useState("");
  const [text, getText] = useState("");
  const [count, setCount] = useState(0);
  const [data, getData] = useState([]);
  const [openCreateWindow, setOpenCreateWindow] = useState(false);
  const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
  const navigate = useNavigate();
  const openModalWindow = () => {
    setOpenCreateWindow(true);
  };

  const closeModalWindow = () => {
    setOpenCreateWindow(false);
  };
  const createPost = () => {
    axios
      .post("https://posts-5wdw.onrender.com/create-post", {
        username: userName,
        postname: name,
        posttext: text,
      })
      .then(function (response) {
        console.log(response.data);
        setOpenCreateWindow(false);
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
  const deleteUser = () => {
    axios
      .post("https://posts-5wdw.onrender.com/delete-user", {
        username: userName,
      })
      .then(function (response) {
        console.log(response.data);
        setOpenCreateWindow(false);
        navigate("/sign-in");
      });
  };
  return (
    <div>
      <div className="blog-header">
        <img src={logo} alt="logo" style={{ height: "100%" }} />
        {userName ? (
          <div>
            <p style={{ marginBottom: "10px" }}>Привіт, {userName}!</p>
            <button className="bt-create" onClick={openModalWindow}>
              Create post
            </button>
            <button
              className="bt-delete"
              onClick={(e) => setOpenDeleteWindow(true)}
            >
              Delete account
            </button>
          </div>
        ) : (
          <Link to={"/sign-in"}>You need to login!</Link>
        )}
      </div>
      <div className="blog-main">
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
      <Dialog open={openCreateWindow} onClose={closeModalWindow}>
        <DialogTitle>Add new album</DialogTitle>
        <DialogContent>
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
          </div>
        </DialogContent>
        <DialogActions>
          <button className="bt-create" onClick={createPost}>
            Create post
          </button>
          <button className="bt-delete" onClick={closeModalWindow}>
            Cancel
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteWindow}
        onClose={(e) => setOpenDeleteWindow(false)}
      >
        <DialogTitle>Add new album</DialogTitle>
        <DialogContent>
          <p className="blog-head-text">
            Are you sure that you want to delete your account?
          </p>
        </DialogContent>
        <DialogActions>
          <button className="bt-create" onClick={deleteUser}>
            Delete user
          </button>
          <button
            className="bt-delete"
            onClick={(e) => setOpenDeleteWindow(false)}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
