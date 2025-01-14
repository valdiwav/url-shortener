"use client";

import { IoQrCodeOutline } from "react-icons/io5";
import { LuClipboard } from "react-icons/lu";
import { useEffect } from "react";

export default function Modal({ modalRef, handleCopy, setQrModal, closeModal }) {
  // Manejar clics fuera del modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Cierra el modal si se hace clic fuera
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);

  return (
    <div
      ref={modalRef}
      className="absolute z-50 top-5 left-[-5px] bg-[#0d1117] border border-gray-600 rounded-md p-2 shadow-lg"
    >
      <button
        className="truncate font-mono w-full text-left py-[3.3px] px-[3px]  text-sm text-white flex items-center space-x-2"
        onClick={() => {
          handleCopy();
          closeModal(); // Cierra el modal después de copiar
        }}
      >
        <LuClipboard className="text-base" />
        <span>Copy to Clipboard</span>
      </button>
      <button
        className="truncate font-mono w-full text-left py-[3.3px] px-[3px] text-sm text-white flex items-center space-x-2"
        onClick={() => {
          setQrModal();
          closeModal(); // Cierra el modal después de generar el QR
        }}
      >
        <IoQrCodeOutline className="text-base" />
        <span>Download QR</span>
      </button>
    </div>
  );
}
