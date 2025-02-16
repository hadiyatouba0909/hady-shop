// src/components/categories/DetailModal.jsx
import React from 'react';
import Modal from '../shared/Modal';

const DetailModal = ({ isOpen, onClose, category }) => {
  if (!category) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails de la catégorie"
    >
      <div className="space-y-4">
        {category.image && (
          <img
            src={category.image.url}
            alt={category.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
        <h4 className="font-semibold text-lg">{category.name}</h4>
        <p className="text-gray-600">{category.description}</p>
        <div className="text-sm text-gray-500">
          <p>Créé le: {new Date(category.createdAt).toLocaleDateString()}</p>
          <p>Dernière modification: {new Date(category.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;