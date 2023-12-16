import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginUser from "./pages/auth/LoginUser";
import RegisterUser from "./pages/auth/RegisterUser";
import HomePage from "./pages/home/HomePage";
import GetBlog from "./pages/home/GetBlog";
import GetAllUsers from "./pages/users/GetAllUsers";
import GetOneUser from "./pages/users/getOneUser";

import CreatePost from "./pages/posts/CreatePost";
import GetOnePost from "./pages/posts/GetOnePost";
import GetAllPostComments from "./pages/comments/GetAllPostComments";
import NotFoundPage from "./pages/NotFoundPage";
import GetAllPosts from "./pages/posts/GetAllPosts";

{
  /*import GetMisPosts from "./pages/posts/GetMisPosts";*/
}
{
  /*import GetOnePostPorAutor from "./pages/posts/GetOnePostPorAutor";*/
}

function AppRouter() {
  return (
    <>
      <Routes>
        {/* Rutas Protegidas */}
        <Route>
          <Route path="/" element={<HomePage />} />

          <Route path="/users" element={<GetAllUsers />} />
          <Route path="/users/:userId" element={<GetOneUser />} />

          <Route path="/posts" element={<GetAllPosts />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<GetOnePost />} />
          {/*<Route path="/posts/misposts" element={<GetMisPosts />} />*/}
          {/*<Route path="/posts/mipost" element={<GetOnePostPorAutor />} />*/}

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
