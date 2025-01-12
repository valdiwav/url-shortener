"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "./modal";
import ConfirmDeleteModal from "./deleteModal";

export default function LinksList({ links, handleCopy, setQrModal, handleDeleteLink }) {
  const [showModal, setShowModal] = useState(null);
  const [deleteModalIndex, setDeleteModalIndex] = useState(null);
  const modalRef = useRef();

  const formatDate = (dbDate) => {
    const date = new Date(dbDate);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ul className="grid grid-cols-2 gap-4">
      {links.map((link, index) => (
        <li
          key={index}
          className="border border-gray-700 rounded-lg py-1 px-4 relative text-white"
        >
          <div className="flex items-center justify-between">
            <Link href={`/${link.shortUrl}`} legacyBehavior>
              <a
                className="truncate font-mono text-lg tracking-wider break-all cursor-pointer hover:dark:text-neutral-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>/</span>
                {link.shortUrl}
              </a>
            </Link>
            <div className="flex space-x-4 text-neutral-100 dark:text-neutral-100 relative">
              <button className="flex items-center">
                <MdOutlineSignalCellularAlt className="text-base" />
                <span className="ml-1 text-sm tracking-wide truncate font-mono font-bold">
                  {link.visits}
                </span>
                <span className="ml-1 text-sm tracking-wide truncate font-mono font-bold">
                  clicks
                </span>
              </button>
              <button
                className="flex items-center cursor-pointer hover:text-gray-700"
                onClick={() => setShowModal(showModal === index ? null : index)}
              >
                <LuCopy className="text-base" />
              </button>
              {showModal === index && (
                <Modal
                  modalRef={modalRef}
                  handleCopy={() => handleCopy(link.shortUrl)}
                  setQrModal={() => setQrModal(index)}
                  closeModal={() => setShowModal(null)} // Pasa la función para cerrar el modal
                />
              )}
              <button className="flex items-center cursor-pointer hover:text-gray-700">
                <IoSettingsOutline className="text-base" />
              </button>
              <button
                className="flex items-center cursor-pointer hover:text-red-700"
                onClick={() => setDeleteModalIndex(index)}
              >
                <FaRegTrashAlt className="text-base flex items-center" />
              </button>
            </div>
          </div>
          <Link href={link.url} legacyBehavior>
            <a
              className="truncate font-mono font-bold text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer hover:text-gray-200 mt-1"
              target="_blank"
              rel="noopener noreferrer"
              title={link.url}
            >
              {link.url.length > 45 ? `${link.url.slice(0, 45)}...` : link.url}
            </a>
          </Link>
          <div className="flex justify-end mt-0.5">
            <p className="truncate font-mono font-bold text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              {formatDate(link.createdAt)}
            </p>
          </div>
          {deleteModalIndex === index && (
            <ConfirmDeleteModal
              shortUrl={link.shortUrl}
              onConfirm={() => {
                handleDeleteLink(link.id); // Pasa el ID del enlace a la función de eliminación
                setDeleteModalIndex(null);
              }}
              onCancel={() => setDeleteModalIndex(null)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
