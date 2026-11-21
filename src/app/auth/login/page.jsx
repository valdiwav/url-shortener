import AuthForm from "../../components/AuthForm";

export const metadata = { title: "Iniciar sesión" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  return <AuthForm returnToShortener={params.next === "shorten"} registered={params.registered === "1"} />;
}
