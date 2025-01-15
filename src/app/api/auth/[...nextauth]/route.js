import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions"; // Ajusta la ruta según la ubicación de authOptions

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
