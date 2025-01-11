"use client";

import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-6 relative w-1/5">
      <HiMagnifyingGlass className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 p-2 bg-[#0d1117] rounded-md focus:outline-none mb-4 border border-gray-600 text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}