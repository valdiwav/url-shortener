"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLink2, LuSettings } from "react-icons/lu";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="frame">
      <nav className="workspace-nav" aria-label="Mi panel">
        <Link href="/dashboard/links" aria-current={pathname === "/dashboard/links" ? "page" : undefined}>
          <LuLink2 aria-hidden="true" /> Enlaces
        </Link>
        <Link href="/dashboard/settings" aria-current={pathname === "/dashboard/settings" ? "page" : undefined}>
          <LuSettings aria-hidden="true" /> Configuración
        </Link>
      </nav>
      {children}
    </div>
  );
}
