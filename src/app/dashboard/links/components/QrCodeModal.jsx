"use client";

import { FiDownload } from "react-icons/fi";

export default function QrCodeModal({ qrModal, filteredLinks, setQrModal, handleDownloadQrCode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#0d1117] p-4 rounded-md relative border border-gray-600 shadow-lg">
        <button
          onClick={() => setQrModal(null)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="truncate font-mono tracking-wide text-lg font-bold text-white text-center mb-4">
          /{filteredLinks[qrModal].shortUrl}
        </h2>
        <img
          src={filteredLinks[qrModal].qrCode}
          alt={`${filteredLinks[qrModal].shortUrl} QR Code`}
          className="mx-auto mb-4"
        />
        <div className="truncate font-mono font-bold text-sm flex justify-center space-x-4">
          <button
            onClick={() =>
              handleDownloadQrCode(
                filteredLinks[qrModal].qrCode,
                filteredLinks[qrModal].shortUrl
              )
            }
            className="flex items-center border border-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            <FiDownload className="text-base" />
            <span className="px-1">Download QR Code</span>
          </button>
          <button
            onClick={() => setQrModal(null)}
            className="border border-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
