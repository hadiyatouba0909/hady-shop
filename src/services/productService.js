// src/services/productService.js
const API_URL = "http://localhost:5000/api/products";

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

export const productService = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération des produits"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  create: async (formData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
        body: formData, // Pas besoin de JSON.stringify pour FormData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la création du produit"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  update: async (id, formData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la mise à jour du produit"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la suppression du produit"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  getDeleted: async () => {
    try {
      const response = await fetch(`${API_URL}/deleted`, {
        headers: {
          ...getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  restore: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/restore`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },
};
