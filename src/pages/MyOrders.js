// src/pages/MyOrders.js
  import React, { useState, useEffect } from 'react';
  import { orderService } from '../services/orderService';
  import ConfirmationModal from '../components/modals/ConfirmationModal';
  
  const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const data = await orderService.getUserOrders();
        setOrders(data);
      } catch (err) {
        setError("Erreur lors du chargement des commandes");
      } finally {
        setLoading(false);
      }
    };
  
    const isWithin24Hours = (orderDate) => {
      const now = new Date();
      const orderTime = new Date(orderDate);
      const diffHours = (now - orderTime) / (1000 * 60 * 60);
      return diffHours < 24;
    };
  
    const handleCancelClick = (order) => {
      if (!isWithin24Hours(order.createdAt)) {
        setError("L'annulation n'est plus possible après 24h");
        setTimeout(() => setError(""), 3000);
        return;
      }
      setSelectedOrder(order);
      setShowConfirmModal(true);
    };
  
    const handleCancelConfirm = async () => {
      try {
        await orderService.cancelOrder(selectedOrder._id);
        setSuccess("Commande annulée avec succès");
        setShowConfirmModal(false);
        fetchOrders();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError(err.message || "Erreur lors de l'annulation de la commande");
        setTimeout(() => setError(""), 3000);
      }
    };
  
    if (loading) {
      return (
        <div className="min-h-screen pt-20 px-4 bg-gray-50">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-500"></div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Mes commandes</h1>
  
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}
  
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-green-700">{success}</p>
            </div>
          )}
  
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N° COMMANDE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TOTAL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {order.total.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-4">
                        {isWithin24Hours(order.createdAt) && (
                          <button
                            onClick={() => handleCancelClick(order)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            Annuler
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <ConfirmationModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleCancelConfirm}
            title="Confirmer l'annulation"
            message="Voulez-vous vraiment annuler cette commande ? Les frais de paiement ne seront pas remboursés."
          />
        </div>
      </div>
    );
  };
  
  export default MyOrders;