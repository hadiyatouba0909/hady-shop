// src/services/orderService.js
const API_URL = "http://localhost:5000/api/orders";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const orderService = {
  // Obtenir toutes les commandes
  getAllOrders: async () => {
    try {
      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des commandes");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Obtenir une commande spécifique
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la commande");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  // src/services/orderService.js
  submitOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/submit-order`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la soumission de la commande"
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
  cancelOrder: async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/${orderId}/cancel`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de l'annulation de la commande"
        );
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Ajouter une méthode pour obtenir les commandes de l'utilisateur connecté
  getUserOrders: async () => {
    try {
      const headers = getAuthHeaders();
      console.log("Headers:", headers); // Vérifier le token

      const response = await fetch(`${API_URL}/user-orders`, {
        headers: headers,
      });

      console.log("Response status:", response.status); // Vérifier le code de statut

      const data = await response.json();
      console.log("Response data:", data); // Vérifier les données

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la récupération des commandes"
        );
      }

      return data;
    } catch (error) {
      console.error("Error in getUserOrders:", error);
      throw error;
    }
  },
};
