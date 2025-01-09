"use client"; // Esto convierte el componente en un Client Component
import { useRef, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const inputRef = useRef();
  const [shortURL, setShortURL] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [activeSection, setActiveSection] = useState("home"); // Maneja la navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = inputRef.current.value;

    fetch("./api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortURL(data.shortUrl);
        setQrCode(data.qrCode);
      });
  };

return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
        {/* Menú lateral */}
        <nav className="w-64 bg-gray-800 p-6 flex flex-col">
            <h1 className="text-2xl font-bold text-white mb-6">LnKut Dashboard</h1>
            <ul className="space-y-4">
                <li>
                    <button
                        onClick={() => setActiveSection("home")}
                        className={`w-full text-left px-4 py-2 rounded-md ${
                            activeSection === "home"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-700"
                        }`}
                    >
                        Dashboard Principal
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveSection("urls")}
                        className={`w-full text-left px-4 py-2 rounded-md ${
                            activeSection === "urls"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-700"
                        }`}
                    >
                        Mis URLs
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveSection("stats")}
                        className={`w-full text-left px-4 py-2 rounded-md ${
                            activeSection === "stats"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-700"
                        }`}
                    >
                        Estadísticas
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveSection("profile")}
                        className={`w-full text-left px-4 py-2 rounded-md ${
                            activeSection === "profile"
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-700"
                        }`}
                    >
                        Configuración de Perfil
                    </button>
                </li>
            </ul>
            <button
                onClick={() => signOut()}
                className="mt-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
            >
                Cerrar Sesión
            </button>
        </nav>

        {/* Contenido principal */}
        <main className="flex-1 p-8">
            {activeSection === "home" && (
                <div>
                    <h2 className="text-3xl font-bold mb-6">Bienvenido a tu Dashboard</h2>
                    <form
                        className="flex flex-col gap-4 w-full max-w-lg bg-gray-800 p-8 rounded-md shadow-lg"
                        onSubmit={handleSubmit}
                    >
                        <input
                            ref={inputRef}
                            type="url"
                            placeholder="Pega tu URL aquí"
                            className="p-4 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="p-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                        >
                            Acortar URL
                        </button>
                        {shortURL && (
                            <div className="mt-4 p-4 bg-gray-700 text-gray-100 rounded-md">
                                <p>URL Acortada:</p>
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
                                        width={200}
                                        height={200}
                                        className="mt-4"
                                    />
                                )}
                            </div>
                        )}
                    </form>
                </div>
            )}

            {activeSection === "urls" && (
                <div>
                    <h2 className="text-3xl font-bold mb-6">Mis URLs</h2>
                    <p>Aquí iría un listado de las URLs acortadas por el usuario.</p>
                </div>
            )}

            {activeSection === "stats" && (
                <div>
                    <h2 className="text-3xl font-bold mb-6">Estadísticas</h2>
                    <p>Aquí irían las estadísticas de los enlaces.</p>
                </div>
            )}

            {activeSection === "profile" && (
                <div>
                    <h2 className="text-3xl font-bold mb-6">Configuración de Perfil</h2>
                    <p>Aquí irían las opciones para editar el perfil del usuario.</p>
                </div>
            )}
        </main>
    </div>
);
}
