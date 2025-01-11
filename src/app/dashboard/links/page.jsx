"use client";

import { useEffect, useState } from "react";
import SearchBar from "./components/searchBar";
import LinksList from "./components/linksList";
import QrCodeModal from "./components/QrCodeModal";
import { fetchUserLinks } from "../../utils/api"; // Ruta hacia el archivo con la función

export default function UserLinks() {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [qrModal, setQrModal] = useState(null);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const links = await fetchUserLinks(); // Llama a la función
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
    <div className="container mx-auto p-4">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <LinksList links={filteredLinks} handleCopy={handleCopy} setQrModal={setQrModal} />
      {qrModal !== null && (
        <QrCodeModal
          qrModal={qrModal}
          filteredLinks={filteredLinks}
          setQrModal={setQrModal}
          handleDownloadQrCode={handleDownloadQrCode}
        />
      )}
    </div>
  );
}
