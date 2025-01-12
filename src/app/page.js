"use client"; // Esto convierte el componente en un Client Component
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Deshabilitar el scroll en la página
    document.body.style.overflow = "hidden";

    // Restaurar el scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 p-4 sm:p-10 font-sans">
      <title>LnKut | Shorten Your URLs</title>

      <main className="flex flex-col gap-6 items-center">
        {/* Descripción Principal */}
        <div className="text-center max-w-md">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-100">
            Simplify Your Links with Style
          </h2>
          <p className="text-sm text-gray-400">
            Discover how LnKut works! Below is a quick demo of our link-shortening magic.
          </p>
        </div>

        {/* Demostración */}
        <div className="flex flex-col gap-3 w-full max-w-md bg-gray-800 p-4 rounded-md shadow-lg">
          <h3 className="text-xl font-bold mb-2 text-white">Demo: Shorten a URL</h3>
          <div className="flex flex-col gap-2">
            {/* Input Ficticio */}
            <input
              value="https://example.com/very-long-url"
              readOnly
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
            />
            {/* Resultado */}
            <div className="mt-2 p-2 bg-gray-700 text-gray-100 rounded-md">
              <p>Shortened URL:</p>
              <span className="text-blue-400 cursor-pointer">https://lnkut.io/demo123</span>
            </div>
          </div>
          {/* Texto Explicativo */}
          <p className="text-sm text-gray-400 mt-2">
            Once logged in, you can paste your own link and get a custom shortened URL. Try it out!
          </p>
        </div>

        {/* Botón para iniciar sesión */}
        <button
          onClick={() => router.push("/auth/login")}
          className="px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors"
        >
          Create a Link
        </button>
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-500 text-xs">
        © 2025 LnKut.
      </footer>
    </div>
  );
}
