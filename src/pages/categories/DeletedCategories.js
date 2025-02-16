// src/pages/categories/DeletedCategories.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Supprimé useNavigate car non utilisé
import { categoryService } from "../../services/categoryService";

const DeletedCategories = () => {
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchDeletedCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getDeleted();
      setDeletedCategories(data);
      setError("");
    } catch (err) {
      setError(
        err.message || "Erreur lors du chargement des catégories supprimées"
      );
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedCategories();
  }, []);

  const handleRestore = async (category) => {
    try {
      await categoryService.restore(category._id); // Supprimé la variable result car non utilisée
      setSuccess(`La catégorie ${category.name} a été restaurée avec succès`);

      // Rafraîchir la liste immédiatement
      await fetchDeletedCategories();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.message || "Erreur lors de la restauration de la catégorie";
      setError(errorMessage);
      console.error("Erreur de restauration:", err);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Catégories supprimées
          </h2>
          <Link
            to="/dashboard"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retour au tableau de bord
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {deletedCategories.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Aucune catégorie supprimée</p>
          </div>
        ) : (
          <div className="bg-purple-800 rounded-lg overflow-hidden">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-purple-700">
                  <th className="text-left p-4">Images</th>
                  <th className="text-left p-4">Nom de la catégorie</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Date de suppression</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deletedCategories.map((category) => (
                  <tr key={category._id} className="border-b border-purple-700">
                    <td className="p-4">
                      {category.image?.url ? (
                        <img
                          src={category.image.url}
                          alt={category.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No img</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">{category.name}</td>
                    <td className="p-4">{category.description}</td>
                    <td className="p-4">
                      {new Date(category.deletedAt).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRestore(category)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Restaurer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletedCategories;
  