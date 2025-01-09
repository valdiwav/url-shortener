"use client"; // Esto convierte el componente en un Client Component
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const inputRef = useRef();
  const [shortURL, setShortURL] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    // Deshabilitar el scroll en la página
    document.body.style.overflow = 'hidden';

    // Restaurar el scroll cuando el componente se desmonte o cambie
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value;
    
    fetch('./api/shortUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    })
    .then(res => res.json())
    .then((data) => {console.log(data); setShortURL(data.shortUrl); setQrCode(data.qrCode)}); 
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 p-8 sm:p-20 font-sans">
      <title>LnKut | Shorten Your URLs</title>


      <main className="flex flex-col gap-12 items-center">
        {/* Descripción Principal */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-100">
          Simplify Your Links with Style
          </h2>
          <p className="text-lg text-gray-400">
            With LnKut, you can easily shorten, share, and customize your URLs.
          </p>
        </div>

        {/* Formulario para Acortar URL */}
        <form
          className="flex flex-col gap-4 w-full max-w-lg bg-gray-800 p-8 rounded-md shadow-lg"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            type="url"
            placeholder="Paste Your URL Here"
            className="p-4 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-4 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors"
          >
            Shorten URL
          </button>
          {shortURL && (
            <div className="mt-4 p-4 bg-gray-700 text-gray-100 rounded-md">
              <p>Shortened URL:</p>
              <a
                href={shortURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {shortURL}
              </a>
              {qrCode && (
                <Image
                  src={qrCode}
                  alt="Código QR generado"
                  width={200} // Define un ancho fijo
                  height={200} // Define un alto fijo
                  className="mt-4"
                />
              )}
            </div>
          )}


        </form>

        {/* Funcionalidades Adicionales */}
        <section className="w-full max-w-lg bg-gray-800 p-8 rounded-md border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Customize Your Link </h3>
          <p className="text-gray-400 mb-6">
          Personalize your links with aliases or your own domain. <br/><span className="text-[#238636]">Soon!</span>
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Alias (e.g., my-short-url)"
              className="p-4 bg-gray-700 border border-gray-600 rounded-md text-gray-400 placeholder-gray-500 cursor-not-allowed"
              disabled
            />
            <input
              type="text"
              placeholder="Custom Domain (e.g., my-domain.com)"
              className="p-4 bg-gray-700 border border-gray-600 rounded-md text-gray-400 placeholder-gray-500 cursor-not-allowed"
              disabled
            />
            <button
              className="p-4 bg-gray-600 text-gray-400 rounded-md cursor-not-allowed"
              disabled
            >
              Save Changes (Unavailable)
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © 2025 LnKut.
      </footer>
    </div>

  );
}