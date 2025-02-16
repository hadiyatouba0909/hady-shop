// src/components/products/ProductList.js
import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsEye } from 'react-icons/bs';

const ProductList = ({ products, onEdit, onDelete, onView }) => {
 return (
   <div className="bg-pink-700 rounded-lg shadow overflow-hidden">
     <table className="min-w-full text-white">
       <thead>
         <tr className="border-b border-pink-600">
           <th className="px-6 py-3 text-left text-xs font-medium uppercase">
             Images
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium uppercase">
             Nom
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium uppercase">
             Description
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium uppercase">
             Prix 
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium uppercase">
             Catégorie
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium uppercase">
             Stock Total
           </th>
           <th className="px-6 py-3 text-right text-xs font-medium uppercase">
             Actions
           </th>
         </tr>
       </thead>
       <tbody>
         {products.map((product) => (
           <tr key={product._id} className="border-b border-pink-600">
             <td className="px-6 py-4">
               <div className="flex -space-x-2">
                 {product.images.slice(0, 3).map((image, index) => (
                   <img
                     key={index}
                     src={image.url}
                     alt={`${product.name}-${index}`}
                     className="h-10 w-10 rounded-full border-2 border-white object-cover"
                   />
                 ))}
                 {product.images.length > 3 && (
                   <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                     +{product.images.length - 3}
                   </div>
                 )}
               </div>
             </td>
             <td className="px-6 py-4">
               <div className="text-sm font-medium">
                 {product.name}
               </div>
             </td>
             <td className="px-6 py-4">
               <div className="text-sm">
                 {product.description.substring(0, 50)}
                 {product.description.length > 50 && '...'}
               </div>
             </td>
             <td className="px-6 py-4">
               <div className="text-sm">
                 {product.price.toLocaleString()} FCFA
               </div>
             </td>
             <td className="px-6 py-4">
               <div className="text-sm">
                 {product.category.name}
               </div>
             </td>
             <td className="px-6 py-4">
               <div className="text-sm">
                 {product.totalQuantity}
               </div>
             </td>
             <td className="px-6 py-4 text-right">
               <div className="flex justify-end space-x-3">
                 <button
                   onClick={() => onView(product)}
                   className="text-white hover:text-gray-200"
                   title="Voir les détails"
                 >
                   <BsEye className="h-5 w-5" />
                 </button>
                 <button
                   onClick={() => onEdit(product)}
                   className="text-white hover:text-gray-200"
                   title="Modifier"
                 >
                   <FiEdit2 className="h-5 w-5" />
                 </button>
                 <button
                   onClick={() => onDelete(product)}
                   className="text-white hover:text-gray-200"
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
 );
};

export default ProductList;