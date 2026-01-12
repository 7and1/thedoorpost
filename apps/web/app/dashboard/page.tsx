import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard - TheDoorpost",
  description: "View your analysis history and usage statistics.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
