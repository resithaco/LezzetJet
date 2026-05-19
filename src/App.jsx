import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./CartContext/CartContext";
import Restaurant from "./RestaurantCard/Restaurant";
import AuthPage from "./Auth/AuthPage";
import Dashboard from "./Dashboard";
import FavoritesPage from "./FavoritesPage/FavoritesPage";
import "./App.css";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
