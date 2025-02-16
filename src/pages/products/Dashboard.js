// src/pages/products/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import ProductForm from "../../components/products/ProductForm";
import DeleteModal from "../../components/shared/DeleteModal";
import ProductList from "../../components/products/ProductList";
import { Link } from "react-router-dom";
import ProductDetailModal from "../../components/products/ProductDetailModal";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError("Erreur lors du chargement des produits");
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await productService.delete(selectedProduct._id);
      fetchProducts();
      setShowDeleteModal(false);
      setSelectedProduct(null);
      setSuccess("Produit supprimé avec succès");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erreur lors de la suppression du produit");
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleView = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Liste des produits</h2>

        <div className="bg-pink-700 p-4 rounded-lg flex justify-between items-center mb-6">
          <Link
            to="/products/deleted"
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <span className="mr-2">🗑️</span>
            Voir les produits supprimées
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
              setSelectedProduct(null);
              setShowForm(true);
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
        <ProductDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />

        <ProductList
          products={filteredProducts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={(product) => {
            setSelectedProduct(product);
            setShowDeleteModal(true);
          }}
        />
      </div>

      <ProductForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSuccess={fetchProducts}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
        title="Supprimer le produit"
        message="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />
    </div>
  );
};

export default ProductDashboard;
