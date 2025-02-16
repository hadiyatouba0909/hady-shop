// src/components/categories/CategoryForm.jsx
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { categoryService } from '../../services/categoryService';

const CategoryForm = ({ isOpen, onClose, category = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    image: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (category) {
        await categoryService.update(category._id, formDataToSend);
      } else {
        await categoryService.create(formDataToSend);
      }

      setSuccess(category ? 'Catégorie modifiée avec succès !' : 'Catégorie créée avec succès !');
      onSuccess();
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setError(err.message || `Erreur lors de ${category ? 'la modification' : "l'ajout"} de la catégorie.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={category ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
      className="bg-white rounded-lg shadow-xl max-w-md w-full"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          Erreur lors de {category ? 'la modification' : "l'ajout"} de la catégorie.
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom de la catégorie"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description de la catégorie"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows="4"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => document.querySelector('input[type="file"]').click()}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Choisir un fichier
            </button>
            <span className="text-sm text-gray-500">
              {formData.image ? formData.image.name : 'Aucun fichier choisi'}
            </span>
          </div>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {category?.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image actuelle
            </label>
            <img 
              src={category.image.url} 
              alt="Current" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Traitement...' : 'Ajouter'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryForm;