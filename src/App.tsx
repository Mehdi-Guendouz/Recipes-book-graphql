import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/shared/Layout";
import PrivateRoutes from "./components/shared/PrivateRoutes";
import RegisterPage from "./pages/RegisterPage";
import RecipesPage from "./pages/RecipesPage";
import CommunityPage from "./pages/ComunityPage";
import CategoryPage from "./pages/Category";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
