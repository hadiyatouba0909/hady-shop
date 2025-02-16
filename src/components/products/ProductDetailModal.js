// src/components/products/ProductDetailModal.jsx
import React from 'react';
import Modal from '../shared/Modal';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails du produit"
    >
      <div className="space-y-6">
        {/* Images du produit */}
        <div className="grid grid-cols-3 gap-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${product.name}-${index}`}
              className="h-32 w-full object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Informations principales */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-gray-500">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Prix</h4>
              <p className="text-gray-600">{product.price.toLocaleString()} FCFA</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Catégorie</h4>
              <p className="text-gray-600">{product.category.name}</p>
            </div>
          </div>

          {/* Tableau des variantes */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Variantes</h4>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Taille</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Couleur</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {product.variants.map((variant, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-900">{variant.size}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{variant.color}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{variant.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stock total */}
          <div>
            <h4 className="font-medium text-gray-900">Stock Total</h4>
            <p className="text-gray-600">{product.totalQuantity} unités</p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <p>Créé le: {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p>Mis à jour le: {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;