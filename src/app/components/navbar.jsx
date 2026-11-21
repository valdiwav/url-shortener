"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LuArrowUpRight, LuLogOut } from "react-icons/lu";
import Brand from "./Brand";

export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const signedIn = status === "authenticated";
  const inAuth = pathname.startsWith("/auth/");
  const inDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="site-header">
      <div className="frame header-inner">
        <Brand />
        {!inAuth && !inDashboard && (
          <nav className="header-sections" aria-label="Secciones">
            <Link href="/#acortar">Acortador</Link>
            <Link href="/#herramientas">Herramientas</Link>
          </nav>
        )}
        <nav className="header-actions" aria-label="Cuenta">
          {signedIn ? (
            inDashboard ? (
              <button className="button button-quiet" onClick={() => signOut({ callbackUrl: "/" })}>
                <LuLogOut aria-hidden="true" /> Salir
              </button>
            ) : (
              <Link className="button button-dark button-small" href="/dashboard">
                Mi panel <LuArrowUpRight aria-hidden="true" />
              </Link>
            )
          ) : inAuth ? (
            <Link className="button button-quiet" href="/">Volver al inicio</Link>
          ) : (
            <>
              <Link className="header-login" href="/auth/login">Iniciar sesión</Link>
              <Link className="button button-dark button-small" href="/auth/register">
                Crear cuenta <LuArrowUpRight aria-hidden="true" />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
