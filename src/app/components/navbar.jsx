"use client";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Header from "./Header";
import SearchModal from "./SearchModal";
import MenuOptions from "./MenuOptions";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
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
        <Header
          isLoggedIn={isLoggedIn}
          toggleSearch={toggleSearch}
          userName={sessionData?.user?.name || session?.user?.name || ""}
          email={sessionData?.user?.email || session?.user?.email || ""}
          refreshSession={refreshSession} // Pasa la función al header
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
