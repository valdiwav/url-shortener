import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import SessionWrapper from "./components/SessionWrapper";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata = {
  title: { default: "LnKut — Acortador de enlaces", template: "%s · LnKut" },
  description: "Crea enlaces cortos, comparte códigos QR y consulta los clics desde tu panel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={geistSans.variable + " " + geistMono.variable}>
        <SessionWrapper>
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
