"use client";

export default function SearchModal({
  searchText,
  setSearchText,
  toggleSearch,
  children,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0d1117] text-white p-4 ring-1 ring-[#262626] rounded-lg shadow-lg w-[550px] max-h-[350px] relative flex flex-col">
        {/* Botón cerrar */}
        <button
          onClick={toggleSearch}
          className="absolute top-4 right-4 text-[#8b949e] hover:text-white focus:outline-none"
        >
          ✕
        </button>

        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 bg-[#0d1117] rounded-md focus:outline-none mb-4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* Contenido del modal */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-[#0d1117]">
          {children}
        </div>
      </div>
    </div>
  );
}
