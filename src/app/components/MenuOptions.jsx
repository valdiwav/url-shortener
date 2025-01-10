"use client";
import { MdOutlineDashboard } from "react-icons/md";
import { FaLink, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const options = {
  General: [
    { name: "Dashboard", icon: <MdOutlineDashboard /> },
    { name: "URLs", icon: <FaLink /> },
    { name: "Settings", icon: <IoSettingsOutline /> },
  ],
  Social: [
    { name: "GitHub", icon: <FaGithub />, link: "https://github.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com" },
  ],
};

export default function MenuOptions({ searchText }) {
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
          <h3 className="font-semibold text-sm mb-2 text-[#8b949e]">
            {section}
          </h3>
          <ul>
            {filteredOptions[section].map((item, index) => (
              <li
                key={index}
                className="p-2 rounded-md cursor-pointer transition-colors duration-300 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] flex items-center gap-2"
              >
                {item.icon}
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit"
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
    </>
  );
}
