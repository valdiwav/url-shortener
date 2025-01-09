"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLaptopChromebook } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaArrowRightLong } from "react-icons/fa6";


export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchText(""); // Limpiar la búsqueda al abrir/cerrar
  };

  // Opciones de las secciones
  const options = {
    General: [
      { name: "Dashboard", icon: <MdOutlineDashboard /> },
      { name: "URLs", icon: <FaLink /> },
      { name: "Profile", icon: <CgProfile /> },
      { name: "Settings", icon: <IoSettingsOutline /> }
    ],
    Theme: [
      { name: "Dark", icon: <FaRegMoon /> },
      { name: "Light", icon: <IoSunnyOutline /> },
      { name: "System", icon: <MdLaptopChromebook /> }
    ],
    Social: [
      { name: "GitHub", icon: <FaGithub />, link: "https://github.com" },
      { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com" }
    ],
  };
  
  const filteredOptions = Object.keys(options).reduce((acc, section) => {
    const filteredItems = options[section].filter((item) =>
      !searchText || item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    if (filteredItems.length > 0) {
      acc[section] = filteredItems;
    }
    return acc;
  }, {});
  
  

  return (
    <>
      <nav className="bg-[#0d1117] p-4 flex justify-between items-center text-white">
        {/* Izquierda: Título y Beta */}
        <div className="flex items-center">
        <Link href="/" className="text-4xl font-extrabold text-white font-sans">
          LnKut
        </Link>

          <span className="ml-2 bg-[#238636] text-xs font-semibold py-1 px-2 rounded-full uppercase">
            Beta
          </span>
        </div>
  
        {/* Derecha: Lupa y Get Started */}
        <div className="flex items-center gap-6">
          {/* Lupa */}
          <button
            onClick={toggleSearch}
            aria-label="Buscar"
            className="w-8 h-8 bg-[#161b22] rounded-full flex items-center justify-center hover:bg-[#21262d]"
          >
            <HiMagnifyingGlass />
          </button>
  
          {/* Botón de usuario o Get Started */}
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
      </nav>
  
      {/* Modal de búsqueda */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0d1117] text-white p-4 ring-1 ring-[#262626] rounded-lg shadow-lg w-[550px] max-h-[350px] relative flex flex-col">
            {/* Botón de cerrar */}
            <button
              onClick={toggleSearch}
              className="absolute top-4 right-4 text-[#8b949e] hover:text-white focus:outline-none"
            >
              ✕
            </button>
  
            {/* Buscador Fijo */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 bg-[#0d1117] rounded-md focus:outline-none mb-4"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
  
            {/* Contenedor con scroll estilizado */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-[#0d1117]">
              {Object.keys(filteredOptions).map((section) => (
                <div key={section} className="mb-4">
                  <h3 className="font-semibold text-sm mb-2 text-[#8b949e]">
                    {section}
                  </h3>
                  <ul>
                    {filteredOptions[section].map((item, index) => (
                      <li
                      key={index}
                      className="p-2 rounded-md cursor-pointer transition-colors duration-300 
                                 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] flex items-center gap-2"
                    >
                      {/* Icono */}
                      {item.icon && (
                        <span className="text-lg transition-colors duration-300 
                                         text-[#8b949e] hover:text-[#f0f6fc]">
                          {item.icon}
                        </span>
                      )}
                      {/* Nombre del ítem */}
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-300 text-inherit"
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </li>
                    
                    ))}
                  </ul>
                </div>
              ))}
              {Object.keys(filteredOptions).length === 0 && (
                <p className="text-center text-[#8b949e]">Sin resultados</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}  