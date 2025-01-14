"use client"; // Indica que este archivo es un Client Component
import { set, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const router = useRouter();
    const [error, setError] = useState(null); // Corregido

    useEffect(() => {
      // Deshabilitar el scroll en la página
      document.body.style.overflow = 'hidden';
  
      // Restaurar el scroll cuando el componente se desmonte o cambie
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);

    const onSubmit = handleSubmit (async (data) => {
      console.log(data);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
    });


    if(res.error) {
      setError(res.error);
    }else{
      router.push("/dashboard");
    }

    console.log(res);
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 p-8 sm:p-20 font-sans flex items-center justify-center">
      <title>LnKut | Shorten Your URLs</title>

      <div className="w-full max-w-lg">

        <div className="bg-gray-800 p-8 rounded-md shadow-lg">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <div className="mb-4">
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}
              <input
              
                type="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="user@mail.com"
                className="p-2 w-full mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                placeholder="********"
                className="p-2 w-full mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors"
            >
              Login
            </button>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-400 mt-4">
                Dont have an account?{" "}
                <Link href="/auth/register" className="text-[#238636] hover:underline">
                  Register
                </Link>
              </p>
              <p className="text-sm text-gray-400 mt-4">
                <Link href="/" className="text-[#238636] hover:underline">
                  Go to Home
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;