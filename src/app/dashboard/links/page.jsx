"use client";

import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar";
import LinksList from "./components/linksList";
import QrCodeModal from "./components/QrCodeModal";
import ShortUrlModal from "./components/urlShortenerModal"; // Importamos el nuevo componente del modal
import { fetchUserLinks } from "../../utils/api";
import { FaPlus } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";

export default function UserLinks() {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [qrModal, setQrModal] = useState(null);
  const [isShortUrlModalOpen, setShortUrlModalOpen] = useState(false); // Estado para el modal "Create New Link"

  useEffect(() => {
    async function fetchLinks() {
      try {
        const links = await fetchUserLinks();
        setLinks(links);
        setFilteredLinks(links);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchLinks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLinks(links);
    } else {
      const filtered = links.filter((link) =>
        link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLinks(filtered);
    }
  }, [searchQuery, links]);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  const handleDownloadQrCode = (qrCode, shortUrl) => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${shortUrl}-qrcode.png`;
    link.click();
  };

  return (
    <div className="truncate font-mono container mx-auto p-4 ">
      <div className="flex items-center justify-between mb-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex items-center space-x-4 truncate font-mono font-bold">
          <button
            className="flex items-center px-4 py-2 border border-gray-600 text-white rounded-md"
            title={`You have ${links.length} links (max: 50)`}
          >
            <BsBoxSeam className="mr-2" />
            {String(links.length).padStart(2, "0")}/50
          </button>
          <button
            className="flex items-center px-4 py-2 bg-gray-700 border border-gray-600 hover:bg-gray-500 text-white rounded-md"
            onClick={() => setShortUrlModalOpen(true)} // Abre el modal
          >
            <FaPlus className="mr-2" />
            Create New Link
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <LinksList
        links={filteredLinks}
        handleCopy={handleCopy}
        setQrModal={setQrModal}
      />
      {qrModal !== null && (
        <QrCodeModal
          qrModal={qrModal}
          filteredLinks={filteredLinks}
          setQrModal={setQrModal}
          handleDownloadQrCode={handleDownloadQrCode}
        />
      )}
      {isShortUrlModalOpen && (
        <ShortUrlModal
          isOpen={isShortUrlModalOpen}
          onClose={() => setShortUrlModalOpen(false)} // Cierra el modal
        />
      )}
    </div>
  );
}
