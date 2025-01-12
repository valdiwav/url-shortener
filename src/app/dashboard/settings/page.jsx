"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function Settings() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");

  // Obtener los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      if (session) {
        setUserName(session.user.name); // Asignar el nombre del usuario
        setUserEmail(session.user.email); // Asignar el correo del usuario
      }
    };

    fetchUserData();
  }, []);

  // Función para actualizar el nombre del usuario
  const handleUpdateUsername = async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName }),
      });

      if (response.ok) {
        alert("Username updated successfully!");
      } else {
        alert("Failed to update username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  // Función para eliminar la cuenta del usuario
  const handleDeleteAccount = async () => {
    if (confirmEmail !== userEmail) {
      alert("The email you entered does not match!");
      return;
    }

    try {
      const response = await fetch("/api/user/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        alert("Account deleted successfully!");
        window.location.href = "/"; // Redirigir al usuario
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="flex justify-center items-start pt-12">
      <div className="w-3/4 md:w-1/2 rounded-lg p-5 shadow-lg bg-gray-800 text-white">
        <h1 className="text-2xl font-bold mb-4">Account</h1>
        <h2 className="text-xl mb-6">Update your personal information</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userName} // Mostrar nombre dinámicamente
            onChange={(e) => setUserName(e.target.value)} // Permitir cambiar el nombre
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Your Email:
          </label>
          {/* Mostrar el correo de forma fija */}
          <p className="w-full p-2 text-white">{userEmail}</p>
        </div>

        <button
          onClick={handleUpdateUsername}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 mb-4"
        >
          Save
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 border border-gray-700 bg-red-700 text-white rounded hover:bg-red-600"
        >
          Delete Account
        </button>

        {/* Modal para eliminar cuenta */}
        {showDeleteModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg text-white">
              <h2 className="text-xl font-bold mb-4">
                Are you sure you want to delete your account?
              </h2>
              <p>Please enter your email to confirm:</p>
              <input
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white mt-2 mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
