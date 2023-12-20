import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginUser from "./pages/auth/LoginUser";
import RegisterUser from "./pages/auth/RegisterUser";
import HomePage from "./pages/home/HomePage";
import GetBlog from "./pages/home/GetBlog";
import GetAllUsers from "./pages/users/GetAllUsers";
import GetOneUser from "./pages/users/getOneUser";
import GetMyPosts from "./pages/posts/GetMyPosts";
import CreatePost from "./pages/posts/CreatePost";
import GetOnePost from "./pages/posts/GetOnePost";
import GetAllPostComments from "./pages/comments/GetAllPostComments";
import NotFoundPage from "./pages/NotFoundPage";


function AppRouter() {
  return (
    <>
      <Routes>
        {/* Rutas Protegidas */}
        <Route>
          <Route path="/" element={<HomePage />} />

          <Route path="/users" element={<GetAllUsers />} />
          <Route path="/users/:userId" element={<GetOneUser />} />

          <Route path="/posts" element={<GetMyPosts />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<GetOnePost />} />

          <Route path="/comments/:postId" element={<GetAllPostComments />} />
        </Route>

        {/* Rutas Públicas */}
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/blog" element={<GetBlog />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRouter;
