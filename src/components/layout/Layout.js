// src/components/layout/Layout.js
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16"> {/* Ajout de mt-16 */}
        {children}
      </main>
    </div>
  );
};

export default Layout;