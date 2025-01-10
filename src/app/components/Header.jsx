"use client";
import Link from "next/link";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Header({ isLoggedIn, toggleSearch }) {
  return (
    <div className="flex justify-between items-center w-full">
      {/* Título y estado Beta */}
      <div className="flex items-center">
        <Link href="/" className="text-4xl font-extrabold text-white font-sans">
          LnKut
        </Link>
        <span className="ml-2 bg-[#238636] text-xs font-semibold py-1 px-2 rounded-full uppercase">
          Beta
        </span>
      </div>

      {/* Botones de búsqueda y sesión */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSearch}
          aria-label="Buscar"
          className="w-8 h-8 bg-[#161b22] rounded-full flex items-center justify-center hover:bg-[#21262d]"
        >
          <HiMagnifyingGlass />
        </button>
        {isLoggedIn ? (
          <Link
            href="/profile"
            className="w-8 h-8 bg-[#161b22] rounded-full flex items-center justify-center hover:bg-[#21262d]"
            aria-label="User Profile"
          >
            <CgProfile />
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="px-2 py-1.5 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors flex items-center justify-center gap-2"
          >
            Get Started
            <FaArrowRightLong />
          </Link>
        )}
      </div>
    </div>
  );
}
