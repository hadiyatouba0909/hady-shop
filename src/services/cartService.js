// src/services/cartService.js
// src/services/cartService.js
const API_URL = "http://localhost:5000/api/cart";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const cartService = {
  addToCart: async (productId, variantInfo, quantity) => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          productId,
          variantInfo,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Créer une erreur avec des informations supplémentaires
        const error = new Error(
          data.message || "Erreur lors de l'ajout au panier"
        );
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Erreur addToCart:", error);
      throw error;
    }
  },

  getCart: async () => {
    try {
      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération du panier"
        );
      }

      const data = await response.json();
      return data || { items: [], total: 0 };
    } catch (error) {
      console.error("Erreur getCart:", error);
      throw error;
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ itemId, quantity }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la mise à jour de la quantité"
        );
      }

      const data = await response.json();
      return data || { items: [], total: 0 };
    } catch (error) {
      console.error("Erreur updateCartItem:", error);
      throw error;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/remove/${itemId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la suppression de l'article"
        );
      }

      const data = await response.json();
      return data || { items: [], total: 0 };
    } catch (error) {
      console.error("Erreur removeFromCart:", error);
      throw error;
    }
  },
  submitOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/submit-order`, {
        // URL corrigée
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la soumission de la commande"
        );
      }

      const data = await response.json();
      console.log("Réponse du serveur:", data); // Pour déboguer
      return data;
    } catch (error) {
      console.error("Erreur submitOrder:", error);
      throw error;
    }
  },
};
