// src/pages/Checkout.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService"; // Changé de cartService à orderService

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processing] = useState(false);
  const navigate = useNavigate();
  // Suppression de la ligne { user } car non utilisée
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    adresse: "",
    additionalInfo: "",
  });

  useEffect(() => {
    // Récupérer les données de l'utilisateur du localStorage
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        console.log(parsedUser);

        setUserData(parsedUser);
        setFormData((prev) => ({
          ...prev,
          adresse: parsedUser.adresse || "",
        }));
      } catch (e) {
        console.error("Erreur lors du parsing des données utilisateur:", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData || !paymentMethod || !phoneNumber) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (!phoneNumber.match(/^7[0-9]{8}$/)) {
      setError("Numéro de téléphone invalide");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        adresse: formData.adresse,
        additionalInfo: formData.additionalInfo,
        paymentMethod: paymentMethod,
        phoneNumber: phoneNumber,
      };

      const response = await orderService.submitOrder(orderData);

      if (response.success) {
        navigate("/confirmation", {
          state: {
            orderId: response.orderId,
            message: response.message,
          },
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || "Erreur lors de la soumission de la commande");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-pink-50 py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-center text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-rose-800 mb-6">
            Informations de livraison
          </h2>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center">
              <span className="font-medium w-28">Nom :</span>
              <span className="text-gray-700">{userData.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-28">Téléphone :</span>
              <span className="text-gray-700">{userData.phone}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Adresse de livraison */}
            <div>
              <label className="block text-gray-700 mb-2">
                Adresse de livraison<span className="text-rose-500">*</span>
              </label>
              <textarea
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                rows="3"
                required
                placeholder="Entrez votre adresse complète de livraison"
              />
            </div>

            {/* Instructions supplémentaires */}
            <div>
              <label className="block text-gray-700 mb-2">
                Instructions supplémentaires
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                rows="2"
                placeholder="Instructions particulières pour la livraison (optionnel)"
              />
            </div>

            {/* Section paiement */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Méthode de paiement</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 border rounded-lg text-center ${
                    paymentMethod === "OM"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                  onClick={() => setPaymentMethod("OM")}
                >
                  Orange Money
                </button>

                <button
                  type="button"
                  className={`p-4 border rounded-lg text-center ${
                    paymentMethod === "WAVE"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                  onClick={() => setPaymentMethod("WAVE")}
                >
                  Wave
                </button>
              </div>

              {/* Numéro de téléphone pour le paiement */}
              {paymentMethod && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone pour le paiement
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="7X XXX XX XX"
                    required
                  />
                </div>
              )}
            </div>

            {/* Bouton de soumission unique */}
            <button
              type="submit"
              disabled={loading || processing || !paymentMethod}
              className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50"
            >
              {processing
                ? "Traitement du paiement..."
                : loading
                ? "Traitement..."
                : "Confirmer la commande"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
