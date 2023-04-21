import { Post } from "./Post/Post";
import { BlogPage } from "./BlogPage/BlogPage";
import { LoginPage } from "./LoginPage/LoginPage";
import { RegistrationPage } from "./RegistrationPage/RegistraitionPage";
import { Route, Routes, Navigate } from "react-router-dom";

export const Main = (props) => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/blog-page" />}></Route>
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="/blog-page/blog/:id" element={<Post />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegistrationPage />} />
      </Routes>
    </main>
  );
};
