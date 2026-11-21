import AuthForm from "../../components/AuthForm";

export const metadata = { title: "Crear cuenta" };

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;
  return <AuthForm register returnToShortener={params.next === "shorten"} />;
}
