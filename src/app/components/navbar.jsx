"use client";

import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Header from "./Header";
import SearchModal from "./SearchModal";
import MenuOptions from "./MenuOptions";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true); // Estado del modo oscuro
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  // Función para alternar el modo oscuro
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
    setSearchText("");
  };

  const refreshSession = async () => {
    const updatedSession = await getSession(); // Refresca los datos de la sesión
    setSessionData(updatedSession); // Actualiza el estado local
  };

  useEffect(() => {
    if (status === "authenticated") {
      refreshSession();
    }
  }, [status]);

  return (
    <>
      <nav className="bg-[#0d1117] p-4 flex justify-between items-center text-white">
        {/* Pasamos darkMode y toggleDarkMode al Header */}
        <Header
          isLoggedIn={isLoggedIn}
          toggleSearch={toggleSearch}
          userName={sessionData?.user?.name || session?.user?.name || ""}
          email={sessionData?.user?.email || session?.user?.email || ""}
          refreshSession={refreshSession} // Pasa la función al header
          darkMode={darkMode} // Nuevo: pasa el estado del modo oscuro
          toggleDarkMode={toggleDarkMode} // Nuevo: pasa la función para alternar el modo oscuro
        />
      </nav>

      {isSearchOpen && (
        <SearchModal
          searchText={searchText}
          setSearchText={setSearchText}
          toggleSearch={toggleSearch}
        >
          <MenuOptions searchText={searchText} onClose={toggleSearch} />
        </SearchModal>
      )}
    </>
  );
}
