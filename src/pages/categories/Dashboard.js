// src/pages/categories/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categoryService } from "../../services/categoryService";
import { BsEye } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import CategoryForm from "../../components/categories/CategoryForm";
import DeleteModal from "../../components/categories/DeleteModal";
import DetailModal from "../../components/categories/DetailModal";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Erreur lors du chargement des catégories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      await categoryService.delete(selectedCategory._id);
      fetchCategories();
      setShowDeleteModal(false);
      setSelectedCategory(null);
      setSuccess("Catégorie supprimée avec succès");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError("Erreur lors de la suppression de la catégorie");
      console.error("Erreur de suppression:", err);
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setShowDetailModal(true);
  };

  const handleSuccess = () => {
    fetchCategories();
    setSelectedCategory(null);
    setIsEditing(false);
  };

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Liste des catégories</h2>

        <div className="bg-pink-700 p-4 rounded-lg flex justify-between items-center mb-6">
          <Link
            to="/categories/deleted"
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <span className="mr-2">🗑️</span>
            Voir les catégories supprimées
          </Link>

          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Rechercher...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <button
            onClick={() => {
              setIsEditing(false);
              setSelectedCategory(null);
              setShowForm(true);
              resetMessages();
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            Ajouter catégorie
          </button>
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

        <div className="bg-pink-700 rounded-lg overflow-hidden">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-purple-700">
                <th className="text-left p-4">Images</th>
                <th className="text-left p-4">Nom de la catégorie</th>
                <th className="text-left p-4">Description</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
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
                  <td className="p-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleView(category)}
                        className="text-white hover:text-gray-200"
                      >
                        <BsEye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-white hover:text-gray-200"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowDeleteModal(true);
                        }}
                        className="text-white hover:text-gray-200"
                      >
                        <RiDeleteBinLine className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedCategory(null);
          setIsEditing(false);
          resetMessages();
        }}
        category={isEditing ? selectedCategory : null}
        onSuccess={handleSuccess}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCategory(null);
          resetMessages();
        }}
        onConfirm={handleDelete}
      />

      <DetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedCategory(null);
          resetMessages();
        }}
        category={selectedCategory}
      />
    </div>
  );
};

export default Dashboard;
