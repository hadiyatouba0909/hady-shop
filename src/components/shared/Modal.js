// src/components/shared/Modal.jsx
import { IoMdClose } from 'react-icons/io';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose}>
            <IoMdClose className="text-2xl hover:text-gray-700" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;