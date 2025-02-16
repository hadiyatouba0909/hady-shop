// src/components/layout/Navbar.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { cartService } from "../../services/cartService";
import { BsCart3 } from "react-icons/bs";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, updateCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      try {
        if (user && user.role === "client") {
          const cart = await cartService.getCart();
          if (isMounted) {
            updateCartCount(cart.items.length);
          }
        }
      } catch (err) {
        console.error("Erreur lors du chargement du panier:", err);
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, [user, updateCartCount]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
      }

      logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent"
            >
              Nene Shop
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === "admin" ? (
                  // Admin Menu
                  <div className="flex space-x-4 text-rose-800">
                    <Link
                      to="/dashboard"
                      className="hover:text-rose-600 transition-colors"
                    >
                      Gestion des catégories
                    </Link>
                    <Link
                      to="/products"
                      className="hover:text-rose-600 transition-colors"
                    >
                      Gestion des produits
                    </Link>
                    <Link
                      to="/orders"
                      className="hover:text-rose-600 transition-colors"
                    >
                      Gestion des commandes
                    </Link>
                  </div>
                ) : (
                  // Client Menu
                  <div className="flex space-x-4 text-rose-800">
                    <Link
                      to="/client-view"
                      className="hover:text-rose-600 transition-colors"
                    >
                      Produits
                    </Link>
                    <Link
                      to="/my-orders"
                      className="hover:text-rose-600 transition-colors"
                    >
                      Mes commandes
                    </Link>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  {user.role === "client" && (
                    <Link
                      to="/cart"
                      className="relative inline-flex items-center p-2 text-rose-600 hover:text-rose-800 transition-colors"
                    >
                      <BsCart3 size={24} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors space-x-2"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-700 text-white px-4 py-2 rounded-lg hover:bg-pink-800 transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
