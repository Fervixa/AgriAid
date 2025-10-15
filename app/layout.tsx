import "./globals.css";
import { AuthProvider } from "@/context/Authcontext";

import Navbar from "@/components/navbar";

export const metadata = {
  title: "AgriAid 🌾",
  description: "Your AI-powered crop doctor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
      <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
