"use client";

import { useState, useRef } from "react";

export default function ShortUrlModal({ isOpen, onClose }) {
  const inputRef = useRef();
  const [shortURL, setShortURL] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = inputRef.current.value;

    try {
      setLoading(true);
      const res = await fetch("/api/shortUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortURL(data.shortUrl);
        setQrCode(data.qrCode);
        setError(null);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" bg-[#0d1117] border border-gray-700 p-6 rounded-lg shadow-lg w-96">
        <button
          className="text-white text-right mb-4"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-white mb-4">Create New Link</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            ref={inputRef}
            type="url"
            placeholder="https://"
            className="p-2  bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Processing..." : "Shorten"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
