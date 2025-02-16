import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white rounded-lg">
      {/* Hero Section avec animation de fade-in */}
      <div className="bg-pink-400 text-white py-16 px-4 text-center animate-fade-in">
        <h1 className="text-4xl font-bold italic mb-4 animate-bounce">Néné-Shop</h1>
        <p className="text-lg mb-8 transition-all duration-500 hover:scale-105">
          Votre destination unique pour une collection raffinée de vêtements,
          vaisselle et accessoires. Découvrez l'élégance au quotidien.
        </p>
      </div>

      {/* Univers Section avec hover effects */}
      <div className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 transition-all duration-300 hover:text-pink-500">
          Nos Univers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Cards avec zoom et overlay effects */}
          <div className="relative h-64 rounded-lg overflow-hidden group transform transition-all duration-300 hover:scale-105">
            <img
              src="/../assets/vetement.jpg"
              alt="Mode & Vêtements"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 group-hover:bg-opacity-60 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold transform transition-all duration-300 group-hover:translate-y-0 group-hover:scale-110">
                Vêtements pour les Femmes
              </h3>
            </div>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden group transform transition-all duration-300 hover:scale-105">
            <img
              src="/../assets/homme.jpg"
              alt="Arts de la Table"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 group-hover:bg-opacity-60 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold transform transition-all duration-300 group-hover:translate-y-0 group-hover:scale-110">
                Vêtements pour les Hommes
              </h3>
            </div>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden group transform transition-all duration-300 hover:scale-105">
            <img
              src="/../assets/mariage.webp"
              alt="Accessoires"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 group-hover:bg-opacity-60 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold transform transition-all duration-300 group-hover:translate-y-0 group-hover:scale-110">
                Vêtements pour les évênnements
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section avec hover animations */}
      <div className="bg-pink-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="text-pink-500 mb-4 text-2xl transition-transform duration-300 hover:scale-110">✓</div>
            <h3 className="text-xl font-semibold mb-2">Sélection Premium</h3>
            <p className="text-gray-600">
              Des produits soigneusement choisis pour leur qualité
              exceptionnelle
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="text-pink-500 mb-4 text-2xl transition-transform duration-300 hover:scale-110">♡</div>
            <h3 className="text-xl font-semibold mb-2">Service Personnalisé</h3>
            <p className="text-gray-600">
              Une équipe attentive à vos besoins et préférences
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="text-pink-500 mb-4 text-2xl transition-transform duration-300 hover:scale-110">→</div>
            <h3 className="text-xl font-semibold mb-2">Livraison Soignée</h3>
            <p className="text-gray-600">
              Vos commandes livrées avec attention et rapidité
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section avec form animations */}
      <div className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 transition-all duration-300 hover:text-pink-500">
          Contactez-nous
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Restons en contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                <span className="text-pink-500">📞</span>
                <span>+221 77 123 87 54</span>
              </div>
              <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                <span className="text-pink-500">✉️</span>
                <span>contact@neneshop.com</span>
              </div>
              <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                <span className="text-pink-500">📍</span>
                <span>Dakar Senegal, Sicap Liberté 4</span>
              </div>
              <div className="flex gap-4 mt-6">
                <a 
                  href="https://www.instagram.com/neneshop" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pink-500 hover:text-pink-600 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@neneshop" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pink-500 hover:text-pink-600 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full p-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 hover:border-pink-400"
            />
            <input
              type="email"
              placeholder="Votre email"
              className="w-full p-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 hover:border-pink-400"
            />
            <textarea
              placeholder="Votre message"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 hover:border-pink-400"
            />
            <button className="w-full bg-pink-600 text-white py-3 rounded-lg transition-all duration-300 transform hover:bg-pink-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;