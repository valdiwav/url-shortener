"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { FaRegSave } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { TiWarningOutline } from "react-icons/ti";



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
  const [isLoading, setIsLoading] = useState(false);

const handleUpdateUsername = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("/api/userUpdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userName }),
    });

    if (response.ok) {
      alert("Username updated successfully!");
      const updatedUserResponse = await fetch("/api/user");
      if (updatedUserResponse.ok) {
        const updatedUser = await updatedUserResponse.json();
        setUserName(updatedUser.name);
      }
    } else {
      alert("Failed to update username");
    }
  } catch (error) {
    console.error("Error updating username:", error);
  } finally {
    setIsLoading(false);
  }
};

  
  


  

  // Función para eliminar la cuenta del usuario
  const handleDeleteAccount = async () => {
    if (confirmEmail !== userEmail) {
      alert("The email you entered does not match!");
      return;
    }
  
    try {
      console.log("Deleting account with email:", userEmail);
      const response = await fetch("/api/deleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
        credentials: "include",
      });
  
      if (response.ok) {
        alert("Account deleted successfully!");
  
        // Limpiar cookies relacionadas con NextAuth
        document.cookie = 'next-auth.session-token=; Max-Age=0; path=/;';
        document.cookie = 'next-auth.csrf-token=; Max-Age=0; path=/;';
        
        // Limpiar estado del usuario
        setUserName("");
        setUserEmail("");
  
        // Forzar cierre de sesión y redirección
        await signOut({ callbackUrl: "/" });
      } else {
        const errorData = await response.text();
        alert(`Failed to delete account: ${errorData}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account. Please try again later.");
    }
  };
  

  return (
    <div className="flex justify-center items-start pt-12">
  <div className="w-3/4 md:w-1/2 space-y-6">
    {/* Sección de Nombre */}
    <div className="rounded-lg p-5 shadow-lg bg-[#0d1117] border border-gray-700 text-white">
      <h2 className="text-xl font-bold mb-4">Update Your Name</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 rounded bg-[#0d1117] border border-gray-700 text-white"
        />
      </div>
      <button
        onClick={handleUpdateUsername}
        className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-gray-700 text-white rounded hover:bg-gray-600"
      >
        <FaRegSave/>
        Save
      </button>
    </div>

    {/* Sección de Correo */}
    <div className="rounded-lg p-5 shadow-lg bg-[#0d1117] border border-gray-700 text-white">
      <h2 className="text-xl font-bold mb-4">Your Email</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <p className="w-full p-2 text-white">{userEmail}</p>
      </div>
      <div className="flex items-center gap-2 mb-5 text-gray-500">
        <TiWarningOutline/>
        <span>Deleting your account is permanent, and you will lose all your stored data.</span>
      </div>
      
      <button
        onClick={() => setShowDeleteModal(true)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-700 bg-red-700 text-white rounded hover:bg-red-600"
      >
        <TiUserDeleteOutline/>
        Delete Account
      </button>
    </div>
  </div>

  {/* Modal para eliminar cuenta */}
  {showDeleteModal && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#0d1117] border border-gray-700 p-6 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-4">
          Are you sure you want to delete your account?
        </h2>
        <p>Please enter your email to confirm:</p>
        <input
          type="email"
          placeholder="user@mail.com"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          className="w-full p-2 rounded border border-gray-700 hover:border-gray-500 bg-[#0d1117] text-white mt-2 mb-4"
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
  );
}
