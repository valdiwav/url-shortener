"use client";

import { useState } from "react";

export default function ConfirmDeleteModal({ shortUrl, onConfirm, onCancel }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      {/* Fondo oscuro detrás del modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        {/* Modal */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
          <h2 className="text-white text-lg font-bold mb-4">
            ¿Estás seguro de eliminar este enlace?
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Escribe el shortUrl para confirmar: <span className="text-blue-400">{shortUrl}</span>
          </p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md mb-4"
            placeholder="Escribe el shortUrl aquí"
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              disabled={inputValue !== shortUrl} // Habilitar solo si el input coincide
              onClick={onConfirm}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
