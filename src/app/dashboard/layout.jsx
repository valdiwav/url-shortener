"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLink } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

export default function DashboardLayout({ children }) {
    const pathname = usePathname(); // Obtiene la ruta actual

    return (
        <div className="truncate font-mono">
            <nav className="bg-[#0d1117] flex border-b border-gray-600">
                <Link href="/dashboard/links">
                    <div
                        className={`px-5 py-2 cursor-pointer hover:text-gray-200 flex items-center ${
                            pathname === "/dashboard/links" ? "border-b-2 border-white text-white" : "text-gray-400"
                        }`}
                    >
                        <FaLink className="mr-2"/>
                        Links
                    </div>
                </Link>
                <Link href="/dashboard/settings">
                    <div
                        className={`px-5 py-2 cursor-pointer hover:text-gray-200 flex items-center ${
                            pathname === "/dashboard/settings" ? "border-b-2 border-white text-white" : "text-gray-400"
                        }`}
                    >
                        <IoSettingsOutline className="mr-2"/>
                        Settings
                    </div>
                </Link>
            </nav>
            <div>{children}</div>
        </div>
    );
}
