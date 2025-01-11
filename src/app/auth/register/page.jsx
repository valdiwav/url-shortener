"use client"; // Indica que este archivo es un Client Component
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter();
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        // Deshabilitar el scroll en la página
        document.body.style.overflow = 'hidden';
    
        // Restaurar el scroll cuando el componente se desmonte o cambie
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);

    const onSubmit = handleSubmit(async (data) => {
        setServerError(""); // Limpia errores previos
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            router.push("/auth/login");
        } else {
            const errorData = await res.json();
            setServerError(errorData.message); // Muestra error del servidor
        }
    });

    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-100 p-8 sm:p-20 font-sans flex items-center justify-center">
            <title>LnKut | Shorten Your URLs</title>

            <div className="w-full max-w-lg">

                <div className="bg-gray-800 p-8 rounded-md shadow-lg">
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                        
                        {/* Error del servidor */}
                        {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

                        <input 
                            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            type="text" 
                            placeholder="Username" 
                            {...register("username", { 
                                required: { value: true, message: "Username is required" },
                                minLength: { value: 3, message: "Username must be at least 3 characters" }
                            })}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                        <input 
                            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            type="email" 
                            placeholder="Email" 
                            {...register("email", { 
                                required: { value: true, message: "Email is required" },
                                pattern: { 
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                                    message: "Invalid email format" 
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <input 
                            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            type="password" 
                            placeholder="Password" 
                            {...register("password", { 
                                required: { value: true, message: "Password is required" },
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                                pattern: { 
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                                    message: "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <input 
                            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            type="password" 
                            placeholder="Confirm Password" 
                            {...register("confirmPassword", { 
                                required: { value: true, message: "Confirm Password is required" },
                                validate: value => value === watch("password") || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                        <button className="p-2  bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors">
                            Register
                        </button>
                        <div className="flex justify-between mt-4">
                            <p className="text-sm text-gray-400">
                                Already have an account? <Link href="/auth/login" className="text-[#238636] hover:underline">Login</Link>
                            </p>
                            <p className="text-sm text-gray-400">
                                <Link href="/" className="text-[#238636] hover:underline">Go to Home</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
