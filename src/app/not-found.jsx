import Link from "next/link";
import { LuArrowLeft, LuLink2Off } from "react-icons/lu";

export default function NotFound() {
  return (
    <main className="frame auth-main">
      <section className="auth-card">
        <span className="section-icon lilac"><LuLink2Off aria-hidden="true" /></span>
        <h1>Página no encontrada</h1>
        <p className="subtle">Revisa la dirección o vuelve al acortador.</p>
        <Link className="button button-lime mt-4" href="/"><LuArrowLeft aria-hidden="true" /> Volver al inicio</Link>
      </section>
    </main>
  );
}
