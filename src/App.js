// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/categories/Dashboard";
import DeletedCategories from "./pages/categories/DeletedCategories";
import ProductDashboard from "./pages/products/Dashboard";
import DeletedProducts from "./pages/products/DeletedProducts";
import ClientView from "./pages/ClientView";
import HomePage from "./pages/HomePage";
import OrderList from "./pages/orders/OrderList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import MyOrders from "./pages/MyOrders";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return user.role === "admin" ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/client-view" />
    );
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Routes protégées pour admin */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Routes pour les catégories */}
              <Route
                path="/categories/deleted"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <DeletedCategories />
                  </PrivateRoute>
                }
              />

              {/* Routes pour les produits */}
              <Route
                path="/products"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <ProductDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/products/deleted"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <DeletedProducts />
                  </PrivateRoute>
                }
              />

              {/* Routes protégées pour client */}
              <Route
                path="/client-view"
                element={
                  <PrivateRoute allowedRoles={["client"]}>
                    <ClientView />
                  </PrivateRoute>
                }
              />

              {/* Routes pour les commandes */}
              <Route
                path="/orders"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <OrderList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute allowedRoles={["client"]}>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute allowedRoles={["client"]}>
                    <Checkout />
                  </PrivateRoute>
                }
              />
              <Route
                path="/confirmation"
                element={
                  <PrivateRoute allowedRoles={["client"]}>
                    <Confirmation />
                  </PrivateRoute>
                }
              />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
