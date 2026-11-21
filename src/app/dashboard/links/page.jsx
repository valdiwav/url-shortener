"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LuChartNoAxesColumnIncreasing, LuLink2, LuSearch } from "react-icons/lu";
import Shortener from "../../components/Shortener";
import { fetchUserLinks } from "../../utils/api";
import LinksList from "./components/linksList";

export default function UserLinks() {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    setError("");
    try {
      const data = await fetchUserLinks();
      if (id === requestId.current) setLinks(data);
    } catch {
      if (id === requestId.current) setError("No pudimos cargar tus enlaces.");
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    return () => { requestId.current++; };
  }, [refresh]);

  const term = search.trim().toLocaleLowerCase();
  const filteredLinks = links.filter((link) => [link.shortUrl, link.newLink, link.url]
    .some((value) => value?.toLocaleLowerCase().includes(term)));
  const visits = links.reduce((sum, link) => sum + link.visits, 0);

  function applyChange(shortUrl, updatedUrl) {
    setLinks((current) => updatedUrl
      ? current.map((link) => link.shortUrl === shortUrl ? { ...link, url: updatedUrl } : link)
      : current.filter((link) => link.shortUrl !== shortUrl));
  }

  return (
    <main className="workspace">
      <div className="workspace-header">
        <div>
          <h1 className="workspace-title">Mis enlaces</h1>
          <p className="subtle">Crea, comparte y administra tus enlaces cortos.</p>
        </div>
        {!loading && !error && (
          <span className="button button-outline button-small">
            <LuChartNoAxesColumnIncreasing aria-hidden="true" /> {visits.toLocaleString("es-CL")} {visits === 1 ? "clic" : "clics"} en total
          </span>
        )}
      </div>
      <section className="workspace-creator" aria-labelledby="create-title">
        <h2 id="create-title">Nuevo enlace</h2>
        <Shortener compact onCreated={refresh} />
      </section>
      <section aria-labelledby="list-title">
        <div className="links-heading">
          <h2 className="section-title" id="list-title">Biblioteca {!loading && !error && <span className="subtle">({links.length})</span>}</h2>
          <label className="search-field">
            <LuSearch aria-hidden="true" />
            <span className="sr-only">Buscar enlaces</span>
            <input className="text-field" type="search" placeholder="Buscar por enlace o destino" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
        </div>
        {error && (
          <div className="workspace-card">
            <p role="alert">{error}</p>
            <button type="button" className="button button-outline button-small mt-2" onClick={refresh}>Reintentar</button>
          </div>
        )}
        {loading && <p className="workspace-status" role="status">Cargando enlaces…</p>}
        {!loading && !error && !filteredLinks.length && (
          <div className="workspace-card workspace-empty">
            <span className="section-icon lilac"><LuLink2 aria-hidden="true" /></span>
            <p>{term ? "No encontramos enlaces con esa búsqueda." : "Los enlaces que crees aparecerán aquí."}</p>
          </div>
        )}
        <LinksList links={filteredLinks} onChange={applyChange} />
      </section>
    </main>
  );
}
