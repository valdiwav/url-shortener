"use client";

import { useEffect, useId, useRef } from "react";
import { LuX } from "react-icons/lu";

export default function Dialog({ title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => { if (dialog.open) dialog.close(); };
  }, []);

  return (
    <dialog
      className="editor-dialog"
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
    >
      <div className="dialog-header">
        <h2 className="section-title" id={titleId}>{title}</h2>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar">
          <LuX aria-hidden="true" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
