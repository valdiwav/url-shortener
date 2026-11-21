"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LuArrowRight, LuKeyRound, LuUserRoundPlus } from "react-icons/lu";
import { passwordHelp } from "../utils/account";

export default function AuthForm({ register = false, returnToShortener, registered = false }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const query = returnToShortener ? "?next=shorten" : "";
  const submitLabel = register ? "Crear cuenta" : "Iniciar sesión";

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setError("");
    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    if (register && password !== form.get("confirmPassword")) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setBusy(true);
    try {
      if (register) {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.get("name").trim(), email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "No pudimos crear tu cuenta.");
        const params = new URLSearchParams({ registered: "1" });
        if (returnToShortener) params.set("next", "shorten");
        router.replace("/auth/login?" + params.toString());
        return;
      }

      const response = await signIn("credentials", { email, password, redirect: false });
      if (!response?.ok || response.error) throw new Error("Revisa tu correo y contraseña e intenta de nuevo.");
      window.location.assign(returnToShortener ? "/#acortar" : "/dashboard");
    } catch (failure) {
      setError(failure.message === "Failed to fetch" ? "No pudimos conectar. Intenta de nuevo." : failure.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="frame auth-main">
      <section className="auth-card" aria-labelledby="auth-title">
        <span className="section-icon lilac">
          {register ? <LuUserRoundPlus aria-hidden="true" /> : <LuKeyRound aria-hidden="true" />}
        </span>
        <h1 id="auth-title">{submitLabel}</h1>
        <p className="subtle">
          {registered ? "Tu cuenta está lista. Inicia sesión para entrar." :
            returnToShortener ? "Entra a tu cuenta para continuar con tu enlace." :
            register ? "Guarda tus enlaces y administra sus destinos y códigos QR." : "Accede a tus enlaces y sus estadísticas."}
        </p>
        <form className="auth-form" onSubmit={submit}>
          {register && (
            <label className="field-label">
              Nombre
              <input className="text-field" name="name" autoComplete="name" minLength={3} maxLength={100} required />
            </label>
          )}
          <label className="field-label">
            Correo electrónico
            <input className="text-field" type="email" name="email" autoComplete="email" maxLength={254} required />
          </label>
          <label className="field-label">
            Contraseña
            <input
              className="text-field"
              type="password"
              name="password"
              autoComplete={register ? "new-password" : "current-password"}
              minLength={register ? 8 : undefined}
              maxLength={register ? 72 : undefined}
              aria-describedby={register ? "password-help" : undefined}
              required
            />
          </label>
          {register && (
            <>
              <p id="password-help" className="subtle">{passwordHelp}</p>
              <label className="field-label">
                Repite la contraseña
                <input className="text-field" type="password" name="confirmPassword" autoComplete="new-password" required />
              </label>
            </>
          )}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="button button-lime" disabled={busy}>
            {busy ? "Un momento…" : submitLabel} <LuArrowRight aria-hidden="true" />
          </button>
        </form>
        <p className="auth-switch">
          {register ? "¿Ya tienes cuenta? " : "¿Primera vez en LnKut? "}
          <Link href={(register ? "/auth/login" : "/auth/register") + query}>
            {register ? "Inicia sesión" : "Crea una cuenta"}
          </Link>
        </p>
      </section>
    </main>
  );
}
