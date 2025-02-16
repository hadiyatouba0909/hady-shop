// src/services/categoryService.js
const API_URL = "http://localhost:5000/api/categories";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const categoryService = {
  // Récupérer toutes les catégories
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération des catégories"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Récupérer une catégorie
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération de la catégorie"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Créer une catégorie
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
          error.message || "Erreur lors de la création de la catégorie"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour une catégorie
  update: async (id, formData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
        },
        body: formData, // Pas besoin de JSON.stringify pour FormData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la mise à jour de la catégorie"
        );
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  // Supprimer une catégorie
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la suppression de la catégorie"
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les catégories supprimées
  getDeleted: async () => {
    try {
      const response = await fetch(`${API_URL}/deleted`, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur getDeleted:", error);
      throw error;
    }
  },
  //Restaurer
  restore: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/restore`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la restauration de la catégorie"
        );
      }

      return data;
    } catch (error) {
      console.error("Erreur de restauration:", error);
      throw error;
    }
  },
};