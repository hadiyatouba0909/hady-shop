import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { orderId, message } = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Créer un élément HTML contenant les infos de la commande
    const content = `
      Confirmation de commande - Néné Shop
      ----------------------------------
      Numéro de commande : ${orderId}
      Date : ${new Date().toLocaleDateString()}
      
      ${message || "Commande créée avec succès"}
      
      Conservez ce document comme preuve de votre achat.
    `;

    // Créer le blob et le lien de téléchargement
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commande-${orderId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Icône de succès */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Commande confirmée !
          </h2>

          <p className="text-gray-600 mb-4">
            {message || "Votre commande a été enregistrée avec succès !"}
          </p>

          {orderId && (
            <p className="text-sm text-gray-500 mb-6">
              Numéro de commande : <span className="font-medium">{orderId}</span>
            </p>
          )}

          {/* Section importante - Sauvegarde */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left mb-6">
            <p className="text-yellow-800 font-medium mb-2">⚠️ Important</p>
            <p className="text-yellow-700 text-sm">
              Veuillez sauvegarder ou capturer cette page avant de la quitter. 
              Cette confirmation servira de preuve de votre commande.
            </p>
          </div>

          {/* Section d'avertissement - Annulation */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4 text-left mb-6">
            <p className="text-red-800 font-medium mb-2">📢 Politique d'annulation</p>
            <p className="text-red-700 text-sm">
              Vous pouvez annuler votre commande dans les 24 heures suivant l'achat.
              Veuillez noter que les frais de paiement ne seront pas remboursés en cas d'annulation.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handlePrint}
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimer
              </button>
              <button
                onClick={handleDownload}
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Télécharger
              </button>
            </div>

            <Link
              to="/client-view"
              className="block w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors text-center"
            >
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;