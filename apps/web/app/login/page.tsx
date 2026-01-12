import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login - TheDoorpost",
  description: "Sign in with GitHub to access your TheDoorpost dashboard.",
};

export default function LoginPage() {
  return <LoginClient />;
}
