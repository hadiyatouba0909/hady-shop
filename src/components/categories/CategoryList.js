import React from 'react';
import { BsEye } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

const CategoryList = ({ categories, onEdit, onDelete, onView }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 shadow-sm">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">Aucune catégorie disponible</p>
        <p className="text-gray-400 text-sm mt-1">Commencez par créer une nouvelle catégorie</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nom
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr 
                key={category._id} 
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.image?.url ? (
                    <img
                      src={category.image.url}
                      alt={category.name}
                      className="h-12 w-12 rounded-lg object-cover shadow-sm"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-pink-50 flex items-center justify-center">
                      <svg className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 line-clamp-2">{category.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex space-x-2 justify-end">
                    <button
                      onClick={() => onView(category)}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                      title="Voir les détails"
                    >
                      <BsEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onEdit(category)}
                      className="p-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors duration-200"
                      title="Modifier"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(category)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
                      title="Supprimer"
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
  );
};

export default CategoryList;