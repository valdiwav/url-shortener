"use client";

import Link from "next/link";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegMoon, FaRegSun } from "react-icons/fa"; // Importa los íconos
import { useState, useRef } from "react";
import UserProfileModal from "./UserProfileModal";

export default function Header({
  isLoggedIn,
  toggleSearch,
  userName,
  email,
  refreshSession,
  darkMode,
  toggleDarkMode,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = async () => {
    if (!isModalOpen) {
      await refreshSession(); // Refresca la sesión al abrir el modal
    }
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center w-full">
      {/* Título y estado Alfa */}
      <div className="flex items-center px-20">
        <Link href="/" className="text-4xl font-extrabold text-white font-sans">
          LnKut
        </Link>
        <span className="ml-2 bg-[#238636] text-xs font-semibold py-1 px-2 rounded-full uppercase">
          Alfa
        </span>
      </div>

      {/* Botones de búsqueda, tema y sesión */}
      <div className="flex items-center gap-6 relative px-20">
        {/* Botón de búsqueda */}
        <button
          onClick={toggleSearch}
          aria-label="Buscar"
          className="w-10 h-10 bg-[#161b22] rounded-full flex items-center justify-center hover:bg-[#21262d]"
        >
          <HiMagnifyingGlass />
        </button>

        {/* Toggle Switch para cambio de tema */}
        <div
          onClick={toggleDarkMode}
          className={`w-16 h-8 flex items-center bg-[#161b22] rounded-full p-1 cursor-pointer transition-colors ${
            darkMode ? "justify-end bg-[#238636]" : "justify-start bg-[#21262d]"
          }`}
          aria-label="Toggle Theme"
        >
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            {darkMode ? (
              <FaRegMoon className="text-black" />
            ) : (
              <FaRegSun className="text-yellow-500" />
            )}
          </div>
        </div>

        {/* Botón de sesión o Get Started */}
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleModal}
              className="w-10 h-10 bg-[#161b22] rounded-full flex items-center justify-center hover:bg-[#21262d]"
              aria-label="User Profile"
            >
              <CgProfile />
            </button>
            {isModalOpen && (
              <UserProfileModal
                modalRef={modalRef}
                closeModal={closeModal}
                userName={userName}
                email={email}
              />
            )}
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="truncate font-mono px-2 py-1.5 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors flex items-center justify-center gap-2"
          >
            Get Started
            <FaArrowRightLong />
          </Link>
        )}
      </div>
    </div>
  );
}
