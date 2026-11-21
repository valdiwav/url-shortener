"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { LuChartNoAxesColumnIncreasing, LuCopy, LuDownload, LuLink2, LuQrCode, LuSquarePen, LuTrash2 } from "react-icons/lu";
import Dialog from "../../../components/Dialog";
import { destinationUrl, displayLink, httpUrl } from "../../../utils/linkUrl";

const formatDate = new Intl.DateTimeFormat("es-CL", { dateStyle: "medium" });

export default function LinksList({ links, onChange }) {
  const [active, setActive] = useState(null);
  const [notice, setNotice] = useState("");

  async function copy(link) {
    try {
      await navigator.clipboard.writeText(link.newLink);
      setNotice("Enlace copiado: " + displayLink(link.newLink));
    } catch {
      setNotice("No pudimos copiar. Abre el enlace y cópialo manualmente.");
    }
  }

  async function showQr(link) {
    try {
      const qr = link.qrCode || await QRCode.toDataURL(link.newLink);
      setActive({ kind: "qr", link, qr });
    } catch {
      setNotice("No pudimos generar el código QR.");
    }
  }

  return (
    <>
      <p role="status" className="copy-status">{notice}</p>
      {links.length > 0 && (
        <ul className="links-list">
          {links.map((link) => {
            const short = httpUrl(link.newLink)?.href || "/" + encodeURIComponent(link.shortUrl);
            return (
              <li className="workspace-card link-card" key={link.shortUrl}>
                <div className="link-details">
                  <span className="section-icon lilac"><LuLink2 aria-hidden="true" /></span>
                  <div>
                    <a className="link-short" href={short} target="_blank" rel="noopener noreferrer">{displayLink(short)}</a>
                    <p className="link-destination" title={link.url}>{link.url}</p>
                  </div>
                </div>
                <div className="link-meta">
                  <span><LuChartNoAxesColumnIncreasing aria-hidden="true" /> {link.visits.toLocaleString("es-CL")} {link.visits === 1 ? "clic" : "clics"}</span>
                  <time dateTime={link.createdAt}>{formatDate.format(new Date(link.createdAt))}</time>
                </div>
                <div className="link-actions">
                  <Action icon={LuCopy} label="Copiar enlace" onClick={() => copy(link)} />
                  <Action icon={LuQrCode} label="Ver código QR" onClick={() => showQr(link)} />
                  <Action icon={LuSquarePen} label="Editar destino" onClick={() => setActive({ kind: "edit", link })} />
                  <Action icon={LuTrash2} label="Eliminar enlace" onClick={() => setActive({ kind: "delete", link })} danger />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {active?.kind === "qr" && (
        <Dialog title="Código QR" onClose={() => setActive(null)}>
          <p className="subtle">{displayLink(active.link.newLink)}</p>
          <div className="qr-preview">
            <img src={active.qr} width="148" height="148" alt="Código QR del enlace corto" />
            <a className="button button-dark button-small" href={active.qr} download={active.link.shortUrl + "-qr.png"}>
              <LuDownload aria-hidden="true" /> Descargar PNG
            </a>
          </div>
        </Dialog>
      )}
      {active && active.kind !== "qr" && (
        <LinkEditor
          active={active}
          onClose={() => setActive(null)}
          onSaved={(updatedUrl) => {
            onChange(active.link.shortUrl, updatedUrl);
            setNotice(updatedUrl ? "Destino actualizado." : "Enlace eliminado.");
            setActive(null);
          }}
        />
      )}
    </>
  );
}

function Action({ icon: Icon, label, onClick, danger }) {
  return (
    <button type="button" className={danger ? "icon-button danger" : "icon-button"} title={label} aria-label={label} onClick={onClick}>
      <Icon aria-hidden="true" />
    </button>
  );
}

function LinkEditor({ active, onClose, onSaved }) {
  const { kind, link } = active;
  const editing = kind === "edit";
  const [url, setUrl] = useState(link.url);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setError("");
    const destination = editing ? destinationUrl(url) : null;
    if (editing && !destination) {
      setError("Ingresa una URL válida.");
      return;
    }

    setBusy(true);
    try {
      const response = editing
        ? await fetch("/api/updateLink", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shortUrl: link.shortUrl, destinationUrl: destination.href }),
          })
        : await fetch("/api/deleteLink?shortUrl=" + encodeURIComponent(link.shortUrl), { method: "DELETE" });
      if (!response.ok) {
        setError(editing ? "No pudimos actualizar el destino." : "No pudimos eliminar el enlace.");
        return;
      }
      onSaved(destination?.href);
    } catch {
      setError("No pudimos conectar. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  const closeWhenIdle = () => { if (!busy) onClose(); };
  return (
    <Dialog title={editing ? "Editar destino" : "Eliminar enlace"} onClose={closeWhenIdle}>
      <p className="subtle">{editing ? displayLink(link.newLink) : "Este enlace dejará de redirigir al destino."}</p>
      <form className="edit-form" onSubmit={submit}>
        {editing && (
          <label className="field-label">
            URL de destino
            <input className="text-field" inputMode="url" autoComplete="off" value={url} onChange={(event) => setUrl(event.target.value)} required />
          </label>
        )}
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="dialog-actions">
          <button type="button" className="button button-outline button-small" onClick={onClose} disabled={busy}>Cancelar</button>
          <button type="submit" className={"button button-small " + (editing ? "button-lime" : "button-danger")} disabled={busy}>
            {busy ? "Guardando…" : editing ? "Guardar destino" : "Eliminar enlace"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
