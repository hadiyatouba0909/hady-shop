import React, { useState, useEffect } from "react";
import { categoryService } from "../../services/categoryService";
import { productService } from "../../services/productService";
import Modal from "../shared/Modal";

const ProductForm = ({ isOpen, onClose, product = null, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    variants: [{ size: '', color: '', quantity: 0 }]
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effet pour charger les catégories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Effet pour charger les données du produit lors de la modification
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category._id,
        images: [],
        variants: product.variants,
      });
    } else {
      // Réinitialiser le formulaire si pas de produit
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        images: [],
        variants: [{ size: '', color: '', quantity: 0 }]
      });
    }
  }, [product]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError("Erreur lors du chargement des catégories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    if (field === "quantity") {
      value = parseInt(value) || 0;
    }
    newVariants[index] = { ...newVariants[index], [field]: value };
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", color: "", quantity: 0 }],
    }));
  };

  const removeVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const parsedVariants = formData.variants.map((variant) => ({
        size: variant.size.trim(),
        color: variant.color.trim(),
        quantity: parseInt(variant.quantity) || 0,
      }));

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("variants", JSON.stringify(parsedVariants));

      // Gérer les images
      if (!product && formData.images.length === 0) {
        throw new Error("Veuillez sélectionner au moins une image");
      }

      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      let response;
      if (product) {
        // Mode modification
        response = await productService.update(product._id, formDataToSend);
        setSuccess("Produit modifié avec succès!");
      } else {
        // Mode création
        response = await productService.create(formDataToSend);
        setSuccess("Produit créé avec succès!");
      }

      console.log("Réponse du serveur:", response);
      onSuccess();
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error("Erreur détaillée:", err);
      setError(err.message || `Erreur lors de ${product ? 'la modification' : "l'ajout"} du produit.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Modifier le produit" : "Ajouter un produit"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Champs de base */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          {/* Afficher les images actuelles en mode modification */}
          {product && product.images && product.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${product.name}-${index}`}
                  className="h-24 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="mt-1 block w-full"
            required={!product} // Requis seulement en création
          />
          {product && (
            <p className="text-sm text-gray-500 mt-1">
              Laissez vide pour garder les images actuelles
            </p>
          )}
        </div>

        {/* Variantes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Variantes
          </label>
          {formData.variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Taille"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Couleur"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
                required
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Quantité"
                  value={variant.quantity}
                  onChange={(e) => handleVariantChange(index, "quantity", parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Ajouter une variante
          </button>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : (product ? "Modifier" : "Ajouter")}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;