import { token } from "../../App";
import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../BlogPage/572.png";
import "./Post.css";
export const Post = () => {
  const { accessToken, getAccessToken } = useContext(token);
  const [postInfo, getInfoPost] = useState([]);
  const [comments, getComments] = useState([]);
  const [comment, getComment] = useState("");
  const [count, setCount] = useState(0);
  const [opinion, setOpinion] = useState(0);
  const like = useRef(null);
  const dislike = useRef(null);
  const userName = sessionStorage.getItem("userName");

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://posts-5wdw.onrender.com/post/${id}`)
      .then(function (response) {
        console.log(response.data.post);
        getInfoPost(response.data.post);
        getComments(response.data.comments);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://posts-5wdw.onrender.com/post/${id}`)
      .then(function (response) {
        getInfoPost(response.data.post);
        getComments(response.data.comments);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, [count, opinion]);
  const sendComment = () => {
    axios
      .post("https://posts-5wdw.onrender.com/create-comment", {
        username: userName,
        postid: id,
        commenttext: comment,
      })
      .then(function (response) {
        console.log(response.data);
        setCount(count + 1);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };
  const sendOpinion = (key) => {
    axios
      .post(`https://posts-5wdw.onrender.com/${key}`, {
        username: userName,
        postid: id,
      })
      .then(function (response) {
        console.log(response.data);
        setOpinion(opinion + 1);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <div className="blog-header">
        <img src={logo} alt="logo" style={{ height: "100%" }} />
        <Link to={"/blog-page"}>Return to all posts</Link>
        {userName ? (
          <p>Привіт, {userName}!</p>
        ) : (
          <Link to={"/sign-in"}>You need to login!</Link>
        )}
      </div>
      <div className="blog-main">
        {postInfo.length > 0 ? (
          <div className="post-post-block">
            <p
              className="post-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                alt="icon"
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${postInfo[0].user_name}`}
                className="blog-icon"
              />{" "}
              {postInfo[0].user_name} posted{" "}
              <span className="post-under-text">{postInfo[0].created_at}</span>
            </p>
            <p className="post-name">{postInfo[0].post_name}</p>
            <p className="post-text">{postInfo[0].post_text}</p>
            <p className="post-text">Rating: {postInfo[0].rating}</p>
            {accessToken ? (
              <div className="row">
                <button
                  ref={like}
                  onClick={() => sendOpinion("like")}
                  className="bt-like"
                >
                  Like!
                </button>
                <button
                  ref={dislike}
                  onClick={() => sendOpinion("dislike")}
                  className="bt-dislike"
                >
                  Dislike!
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="post-comment-block">
          <p className="post-name">Comment block</p>
          {comments.length > 0 ? (
            <div>
              {" "}
              {comments.map((comment, i) => (
                <div key={i} className="comment-block">
                  <img
                    alt="icon"
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user_name}`}
                    className="blog-icon"
                  />
                  <div className="comment-block-text">
                    <p className="comment-name">{comment.user_name}</p>
                    <p className="comment-text">{comment.comment_text}</p>
                    <p className="post-date">{comment.created_at}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No comments yet!</div>
          )}
          <div>
            {accessToken ? (
              <div className="post-comment-block-form">
                <img
                  alt="icon"
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${userName}`}
                  className="blog-icon"
                />
                <input
                  type="text"
                  placeholder="Type your text"
                  onChange={(e) => getComment(e.currentTarget.value)}
                  className="input-comment"
                />
                <button className="form-bt" onClick={sendComment}>
                  Add comment
                </button>
              </div>
            ) : (
              <div>
                You need to be <Link to={"/sign-in"}>loggined</Link> to comment
                posts!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
