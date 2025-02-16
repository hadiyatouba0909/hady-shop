///home/ba/hady-shop/src/pages/Cart.js
import React, { useState, useEffect, useCallback } from "react";
import { cartService } from "../services/cartService";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { updateCartCount } = useCart();

  const fetchCart = useCallback(async () => {
    try {
      const data = await cartService.getCart();
      setCart(data || { items: [], total: 0 });
      updateCartCount(data?.items?.length || 0);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement du panier");
      setCart({ items: [], total: 0 });
      updateCartCount(0);
    }
  }, [updateCartCount]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemoveItem(itemId);
      return;
    }

    try {
      // Copie de sécurité de l'état actuel du panier
      const previousCart = { ...cart };

      // Mise à jour optimiste
      const updatedItems = cart.items.map((item) => {
        if (item._id === itemId) {
          // Conserver TOUTES les données du produit
          return {
            ...item,
            quantity: newQuantity,
            price: item.price * (newQuantity / item.quantity),
            productId: item.productId, // Conserver l'objet productId intact
            variant: item.variant, // Conserver l'objet variant intact
          };
        }
        return item;
      });

      const newTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);

      // Mise à jour locale immédiate
      setCart({
        ...cart,
        items: updatedItems,
        total: newTotal,
      });

      try {
        // Appel API
        const updatedCart = await cartService.updateCartItem(
          itemId,
          newQuantity
        );
        updateCartCount(updatedCart.items.length);

        // En cas de succès, mettre à jour subtilement sans perdre les données
        setCart((prev) => ({
          ...updatedCart,
          items: updatedCart.items.map((newItem) => {
            const existingItem = prev.items.find((i) => i._id === newItem._id);
            return {
              ...newItem,
              productId: existingItem?.productId || newItem.productId,
              variant: existingItem?.variant || newItem.variant,
            };
          }),
        }));

        setSuccess("Quantité mise à jour !");
        setTimeout(() => setSuccess(""), 2000);
      } catch (apiError) {
        // En cas d'erreur API, restaurer l'état précédent
        setCart(previousCart);
        throw apiError;
      }
    } catch (err) {
      const errorMessage =
        err.message || "Erreur lors de la mise à jour de la quantité";

      if (err.response?.availableStock !== undefined) {
        setError(
          `Stock insuffisant. Seulement ${err.response.availableStock} disponible(s).`
        );
      } else {
        setError(errorMessage);
      }

      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await cartService.removeFromCart(itemId);
      setCart(updatedCart || { items: [], total: 0 });
      updateCartCount(updatedCart.items.length);

      setSuccess("Article supprimé du panier !");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression de l'article");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            {success}
          </div>
        )}

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-4">Votre panier est vide</p>
            <Link
              to="/client-view"
              className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
            >
              Continuer vos achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md flex items-center p-4"
                >
                  <img
                    src={item.productId?.images?.[0]?.url || ""}
                    alt={item.productId?.name || "Produit"}
                    className="h-24 w-24 object-cover rounded-lg mr-6"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-rose-800">
                      {item.productId?.name || "Nom du produit"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.variant?.size || "Taille"} -{" "}
                      {item.variant?.color || "Couleur"}
                    </p>
                    <p className="text-pink-600 font-bold">
                      {(item.price || 0).toLocaleString()} FCFA
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item._id,
                            (item.quantity || 1) - 1
                          )
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-2">{item.quantity || 1}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item._id,
                            (item.quantity || 1) + 1
                          )
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-rose-800">
                  Résumé de la commande
                </h2>

                <div className="space-y-6">
                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-rose-600">
                        {(cart.total || 0).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Boutons */}
                  <div className="space-y-4 pt-2">
                    <Link
                      to="/checkout"
                      className="block w-full bg-rose-500 text-white py-4 rounded-lg hover:bg-rose-600 transition-colors duration-200 text-center font-semibold text-lg"
                    >
                      Passer à la caisse
                    </Link>

                    <Link
                      to="/client-view"
                      className="block w-full text-center text-gray-600 hover:text-rose-600 transition-colors duration-200 font-medium"
                    >
                      Continuer vos achats
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
