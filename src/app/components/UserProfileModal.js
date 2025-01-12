"use client";

import { useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaLink, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserProfileModal({ modalRef, closeModal, userName, email }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);

  return (
    <>
      {/* Fondo oscuro detrás del modal */}
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeModal} />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="absolute bg-[#0d1117] border border-gray-600 rounded-md shadow-lg p-4 w-48 z-50"
        style={{ top: "calc(100% + 8px)", right: "0" }}
      >
        {/* Información del usuario */}
        <div className="mb-4">
          <p className="text-white font-bold text-sm">{userName}</p>
          <p className="text-gray-400 text-xs">{email}</p>
        </div>

        {/* Opciones del menú */}
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="text-white text-sm flex items-center gap-2 p-2 rounded-md hover:bg-gray-600"
          >
            <HiOutlineHome />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-white text-sm flex items-center gap-2 p-2 rounded-md hover:bg-gray-600"
          >
            <MdOutlineDashboard />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-white text-sm flex items-center gap-2 p-2 rounded-md hover:bg-gray-600"
          >
            <IoSettingsOutline />
            <span>Settings</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/alvaro-valdivia-miranda-a5065b178"
            className="text-white text-sm flex items-center gap-2 p-2 rounded-md hover:bg-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
            <span>Contact</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-red-500 text-sm flex items-center gap-2 p-2 rounded-md hover:bg-gray-600"
            style={{ alignSelf: "flex-start" }}
          >
            <MdLogout />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
