"use client";

import { useState } from "react";
import { LuArrowUpRight, LuCheck, LuCopy, LuDownload, LuQrCode } from "react-icons/lu";
import { displayLink } from "../utils/linkUrl";

export default function LinkResult({ result }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [showQr, setShowQr] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopyStatus("Copiado");
    } catch {
      setCopyStatus("Selecciona el enlace y cópialo manualmente.");
    }
  }

  return (
    <div className="link-result">
      <strong><LuCheck aria-hidden="true" /> Tu enlace está listo</strong>
      <div className="result-row">
        <a className="result-url" href={result.shortUrl} target="_blank" rel="noopener noreferrer">
          {displayLink(result.shortUrl)} <LuArrowUpRight aria-hidden="true" />
        </a>
        <div className="result-actions">
          <button type="button" className="button button-outline button-small" onClick={copy}>
            <LuCopy aria-hidden="true" /> Copiar
          </button>
          {result.qrCode && (
            <button type="button" className="button button-outline button-small" aria-expanded={showQr} onClick={() => setShowQr(!showQr)}>
              <LuQrCode aria-hidden="true" /> QR
            </button>
          )}
        </div>
      </div>
      <p className="copy-status" role="status">{copyStatus}</p>
      {showQr && (
        <div className="qr-preview">
          <img src={result.qrCode} width="148" height="148" alt="Código QR del enlace corto" />
          <a className="button button-dark button-small" href={result.qrCode} download="lnkut-qr.png"><LuDownload aria-hidden="true" /> Descargar PNG</a>
        </div>
      )}
    </div>
  );
}
