// src/components/categories/DeleteModal.jsx
import React from 'react';
import Modal from '../shared/Modal';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmer la suppression"
    >
      <p className="mb-6">Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;