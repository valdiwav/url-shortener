"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuClipboard, LuLink2, LuShieldCheck } from "react-icons/lu";
import { destinationUrl, LINK_DRAFT_KEY } from "../utils/linkUrl";
import LinkResult from "./LinkResult";

export default function Shortener({ onCreated, compact = false }) {
  const router = useRouter();
  const { status } = useSession();
  const input = useRef(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (compact) return;
    try {
      const draft = sessionStorage.getItem(LINK_DRAFT_KEY);
      if (draft) {
        setUrl(draft);
        if (window.location.hash === "#acortar") input.current?.focus({ preventScroll: true });
      }
    } catch {
      // The form also works when browser storage is unavailable.
    }
  }, [compact]);

  async function pasteUrl() {
    try {
      setUrl(await navigator.clipboard.readText());
      setError("");
    } catch {
      setError("Pega el enlace directamente en el campo.");
    }
    input.current?.focus();
  }

  async function shorten(event) {
    event.preventDefault();
    if (busy || status === "loading") return;
    const destination = destinationUrl(url);
    setError("");
    if (!destination) {
      setError("Ingresa una URL válida, por ejemplo https://ejemplo.com.");
      input.current?.focus();
      return;
    }

    if (status !== "authenticated") {
      goToLogin();
      return;
    }

    setBusy(true);
    setResult(null);
    try {
      const response = await fetch("/api/shortUrl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: destination.href }),
      });
      if (response.status === 401) {
        goToLogin();
        return;
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No pudimos crear el enlace.");
      if (!compact) {
        try { sessionStorage.removeItem(LINK_DRAFT_KEY); } catch {}
      }
      setResult(data);
      setUrl("");
      onCreated?.(data);
    } catch (failure) {
      setError(failure.message === "Failed to fetch" ? "No pudimos conectar. Intenta de nuevo." : failure.message);
    } finally {
      setBusy(false);
    }
  }

  function goToLogin() {
    try { sessionStorage.setItem(LINK_DRAFT_KEY, url); } catch {}
    router.push("/auth/login?next=shorten");
  }

  return (
    <div className="shortener-body">
      <form onSubmit={shorten} noValidate>
        <label className="sr-only" htmlFor={compact ? "new-url" : "long-url"}>URL original</label>
        <div className="shortener-fields">
          <div className="url-field">
            <LuLink2 aria-hidden="true" />
            <input
              id={compact ? "new-url" : "long-url"}
              ref={input}
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={8192}
              placeholder="https://pega-tu-enlace.com"
              value={url}
              onChange={(event) => { setUrl(event.target.value); setError(""); }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? (compact ? "new-url-error" : "long-url-error") : undefined}
              required
            />
            <button type="button" className="paste-button" onClick={pasteUrl} aria-label="Pegar URL">
              <LuClipboard aria-hidden="true" /><span>Pegar</span>
            </button>
          </div>
          <button type="submit" className="button button-lime shorten-submit" disabled={busy || status === "loading"}>
            {busy ? "Acortando…" : "Acortar enlace"} <LuArrowRight aria-hidden="true" />
          </button>
        </div>
        {error && <p className="form-error" role="alert" id={compact ? "new-url-error" : "long-url-error"}>{error}</p>}
        {!compact && status !== "authenticated" && (
          <p className="shortener-note"><LuShieldCheck aria-hidden="true" /> Inicia sesión para guardar y gestionar tus enlaces.</p>
        )}
        {!compact && status === "authenticated" && (
          <p className="shortener-note"><LuShieldCheck aria-hidden="true" /> Tus enlaces se guardan en <Link href="/dashboard">mi panel</Link>.</p>
        )}
      </form>
      {result && <LinkResult result={result} />}
    </div>
  );
}
