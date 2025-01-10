"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import SearchModal from "./SearchModal";
import MenuOptions from "./MenuOptions";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
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

  return (
    <>
      <nav className="bg-[#0d1117] p-4 flex justify-between items-center text-white">
        <Header isLoggedIn={isLoggedIn} toggleSearch={toggleSearch} />
      </nav>

      {isSearchOpen && (
        <SearchModal
          searchText={searchText}
          setSearchText={setSearchText}
          toggleSearch={toggleSearch}
        >
          <MenuOptions searchText={searchText} />
        </SearchModal>
      )}
    </>
  );
}
