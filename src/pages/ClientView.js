import React, { useState, useEffect } from "react";
import { productService } from "../services/productService";
import { cartService } from "../services/cartService";
import { categoryService } from "../services/categoryService";
import { useCart } from "../context/CartContext";

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(""); // Nouvel état pour l'erreur

  if (!isOpen) return null;

  const getAvailableSizes = () => [
    ...new Set(product.variants.map((v) => v.size)),
  ];
  const getAvailableColors = (size) => {
    return product.variants
      .filter((v) => v.size === size)
      .map((v) => ({ color: v.color, quantity: v.quantity }));
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError("Veuillez sélectionner une taille et une couleur");
      return;
    }
    onAddToCart(
      product,
      { size: selectedSize, color: selectedColor },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-96 object rounded-lg"
          />
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-pink-600">
            {product.price.toLocaleString()} FCFA
          </p>
        </div>

        {/* Sélection de la taille */}
        <div className="mb-4">
          <p className="font-medium mb-2">Taille :</p>
          <div className="flex flex-wrap gap-2">
            {getAvailableSizes().map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full border ${
                  selectedSize === size
                    ? "border-pink-500 bg-pink-50 text-pink-600"
                    : "border-gray-300 hover:border-pink-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sélection de la couleur */}
        {selectedSize && (
          <div className="mb-4">
            <p className="font-medium mb-2">Couleur :</p>
            <div className="flex flex-wrap gap-2">
              {getAvailableColors(selectedSize).map(({ color, quantity }) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  disabled={quantity === 0}
                  className={`px-4 py-2 rounded-full border ${
                    selectedColor === color
                      ? "border-pink-500 bg-pink-50 text-pink-600"
                      : quantity === 0
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 hover:border-pink-500"
                  }`}
                >
                  {color} ({quantity})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sélection de la quantité */}
        {selectedSize && selectedColor && (
          <div className="mb-6">
            <p className="font-medium mb-2">Quantité :</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 border rounded-lg"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-1 border rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        )}
        {/* Message d'erreur */}
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

const ClientView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories:", err);
    }
  };

  const handleAddToCart = async (product, variant, quantity) => {
    try {
      await cartService.addToCart(product._id, variant, quantity);
      const updatedCart = await cartService.getCart();
      updateCartCount(updatedCart.items.length);
      setSuccess("Produit ajouté au panier avec succès !");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'ajout au panier");
      setTimeout(() => setError(""), 3000);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Barre de recherche et filtres */}
      <div className="container mx-auto mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-48 px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages d'alerte */}
      {error && (
        <div className="container mx-auto mb-4">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        </div>
      )}
      {success && (
        <div className="container mx-auto mb-4">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
            {success}
          </div>
        </div>
      )}

      {/* Grille de produits */}
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-m-full object"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-pink-600">
                  {product.price.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de produit */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ClientView;
