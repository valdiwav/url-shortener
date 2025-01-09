import React from 'react';
import  Link  from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-2xl font-bold">
                <Link href="/" className="text-white no-underline">URL Shortener</Link>
            </div>
            <div className="text-lg">
                <Link href="/auth/login" className="text-white no-underline ml-5">Iniciar Sesión</Link>
            </div>
        </nav>
    );
};

export default Navbar;
