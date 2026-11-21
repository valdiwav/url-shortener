"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import Dialog from "../../components/Dialog";

export default function Settings() {
  const { data: session, update } = useSession();
  const [editingName, setEditingName] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = session?.user;

  async function saveName(event) {
    event.preventDefault();
    if (busy) return;
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const response = await fetch("/api/userUpdate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: editingName ?? user.name }),
      });
      if (!response.ok) {
        setError(await response.text());
        return;
      }
      await update();
      setNotice("Nombre actualizado.");
    } catch {
      setError("No pudimos guardar el nombre. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="workspace">
      <div className="workspace-header">
        <div>
          <h1 className="workspace-title">Configuración</h1>
          <p className="subtle">Administra los datos de tu cuenta.</p>
        </div>
      </div>
      {user ? (
        <div className="settings-cards">
          <section className="workspace-card">
            <h2 className="section-title">Perfil</h2>
            <p className="subtle">{user.email}</p>
            <form className="edit-form" onSubmit={saveName}>
              <label className="field-label">
                Nombre
                <input className="text-field" autoComplete="name" minLength={3} maxLength={100} required value={editingName ?? user.name} onChange={(event) => setEditingName(event.target.value)} />
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-lime" type="submit" disabled={busy}>{busy ? "Guardando…" : "Guardar nombre"}</button>
              {notice && <p className="subtle" role="status">{notice}</p>}
            </form>
          </section>
          <section className="workspace-card">
            <h2 className="section-title">Eliminar cuenta</h2>
            <p className="subtle">Se borrarán tu cuenta y todos los enlaces que hayas creado.</p>
            <button className="button button-outline mt-3" type="button" onClick={() => setDeleting(true)}>
              <LuTrash2 aria-hidden="true" /> Eliminar mi cuenta
            </button>
          </section>
        </div>
      ) : <p className="subtle" role="status">Cargando perfil…</p>}
      {deleting && user && <DeleteAccount email={user.email} onClose={() => setDeleting(false)} />}
    </main>
  );
}

function DeleteAccount({ email, onClose }) {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function discard(event) {
    event.preventDefault();
    if (busy) return;
    if (confirmEmail.trim() !== email) {
      setError("El correo de confirmación no coincide.");
      return;
    }

    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/deleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        setError("No pudimos eliminar la cuenta.");
      }
    } catch {
      setError("No pudimos conectar. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog title="Eliminar cuenta" onClose={() => { if (!busy) onClose(); }}>
      <p className="subtle">Confirma tu correo para borrar permanentemente tu cuenta y tus enlaces.</p>
      <form className="edit-form" onSubmit={discard}>
        <label className="field-label">
          Correo de confirmación
          <input className="text-field" type="email" autoComplete="off" required value={confirmEmail} onChange={(event) => setConfirmEmail(event.target.value)} />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="dialog-actions">
          <button type="button" className="button button-outline button-small" onClick={onClose} disabled={busy}>Cancelar</button>
          <button type="submit" className="button button-danger button-small" disabled={busy}>{busy ? "Eliminando…" : "Eliminar cuenta"}</button>
        </div>
      </form>
    </Dialog>
  );
}
