import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginUser from "./pages/auth/LoginUser";
import RegisterUser from "./pages/auth/RegisterUser";
import GetBlog from "./pages/home/GetBlog";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/home/HomePage";

function AppRouter() {
  
  return (
    <>
      <Routes>
        {/* Rutas Protegidas */}
        <Route>
          <Route path="/" element={<HomePage />} />
          </Route>

        {/* Rutas Públicas */}
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/blog" element={<GetBlog />} />
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    </>
  )
}

export default AppRouter
