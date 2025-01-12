"use client";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { FaLink, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";

const options = {
  General: [
    { name: "Dashboard", icon: <MdOutlineDashboard />, href: "/dashboard/links" },
    { name: "Links", icon: <FaLink />, href: "/dashboard/links" },
    { name: "Settings", icon: <IoSettingsOutline />, href: "/dashboard/settings" },
  ],
  Social: [
    { name: "GitHub", icon: <FaGithub />, link: "https://github.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com" },
  ],
};

export default function MenuOptions({ searchText, onClose }) {
  const filteredOptions = Object.keys(options).reduce((acc, section) => {
    const filteredItems = options[section].filter((item) =>
      !searchText || item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredItems.length > 0) acc[section] = filteredItems;
    return acc;
  }, {});

  return (
    <>
      {Object.keys(filteredOptions).map((section) => (
        <div key={section} className="mb-4">
          <h3 className="truncate font-mono font-semibold text-sm mb-2 text-[#8b949e]">
            {section}
          </h3>
          <ul>
            {filteredOptions[section].map((item, index) => (
              <li
                key={index}
                className="truncate font-mono p-2 rounded-md cursor-pointer transition-colors duration-300 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] flex items-center gap-2"
                onClick={onClose} // Cierra el modal en cualquier clic
              >
                {item.href ? (
                  <Link href={item.href} className="flex items-center gap-2 w-full h-full">
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full h-full"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
